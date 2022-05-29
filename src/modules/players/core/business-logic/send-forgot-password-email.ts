import { PlayerToken } from '@modules/players/domain/entities/player-token';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IMailProvider } from '@shared/domain/providers/mail-provider';
import { AppError } from '@shared/errors/app-error';
import path from 'node:path';
import crypto from 'node:crypto';
import { IPlayerTokensRepository } from '@modules/players/domain/repositories/player-tokens-repository';
import { commons } from '@shared/helpers/commons';

class SendForgotPasswordEmailBusinessLogic {
  constructor(
    private playersRepository: IPlayersRepository,
    private mailProvider: IMailProvider,
    private playerTokensRepository: IPlayerTokensRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const player = await this.playersRepository.findByEmail(email);

    if (!player) throw new AppError('Player does not exists.', 409);

    const playerTokenAlreadyExists =
      await this.playerTokensRepository.findByPlayerId(player.id);

    if (playerTokenAlreadyExists) {
      await this.playerTokensRepository.destroy(playerTokenAlreadyExists.id);
    }

    const playerToken = new PlayerToken({
      playerId: player.id,
      token: crypto.randomUUID(),
      ...commons(),
    });

    await this.playerTokensRepository.generate(playerToken);

    const forgotPasswordTemplatePath = path.resolve(
      __dirname,
      '..',
      '..',
      'infra',
      'views',
      'forgotPasswordEmailTemplate.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: player.nickname,
        address: player.email,
      },
      subject: 'Recuperação de senha.',
      templateData: {
        file: forgotPasswordTemplatePath,
        variables: {
          name: player.nickname,
          redirect: `${process.env.APP_WEB_URL}/reset-password?token=${playerToken.token}`,
        },
      },
    });
  }
}

export { SendForgotPasswordEmailBusinessLogic };