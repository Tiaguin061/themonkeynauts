import { inject, injectable } from 'tsyringe';

import { Either, left, right } from '@shared/core/logic/either';

import { IPlayer } from '@modules/players/domain/entities/player';
import { Log } from '@modules/logs/domain/entities/log';
import { IShip } from '@modules/ships/domain/entities/ship';
import { IMonkeynaut } from '@modules/monkeynauts/domain/entities/monkeynaut';

import { ShipRank, TypeShipRank } from '@modules/ships/domain/enums/ship-rank';
import { TypeShipClass } from '@modules/ships/domain/enums/ship-class';
import {
  MonkeynautClass,
  TypeMonkeynautRank,
} from '@modules/monkeynauts/domain/enums';

import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IMonkeynautsRepository } from '@modules/monkeynauts/domain/repositories/monkeynauts-repositories';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IShipsRepository } from '@modules/ships/domain/repositories/ships-repositories';

import {
  getClassByRarity,
  getRankByRarity,
} from '@modules/monkeynauts/config/create-monkeynaut';
import {
  getShipClassByRarity,
  getShipRankByRarity,
} from '@modules/ships/config/create-ship';

import { CreateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/create-monkeynaut';
import { CreateShipBusinessLogic } from '@modules/ships/core/business-logic/create-ship';

import { UserNotFoundError } from '@shared/errors/user-not-fount-error';
import { AirDropNftTypeNotAllowed } from '../errors/air-drop-nft-type-not-allowed';

type CreateAirDropNftResponse = Either<
  UserNotFoundError,
  {
    monkeynauts: IMonkeynaut[] | null;
    ships: IShip[] | null;
  }
>;

export type CreateAirDropNftRequestDTO = {
  email: string;
  type: 'MONKEYNAUT' | 'SHIP' | 'PACK';
  monkeynaut?: {
    rank?: TypeMonkeynautRank | 'RANDOM';
    class?: 'RANDOM';
  };
  ship?: {
    rank?: ShipRank | 'RANDOM';
    class?: 'RANDOM';
  };
};

@injectable()
export class CreateAirDropNftBusinessLogic {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('MonkeynautsRepository')
    private monkeynautsRepository: IMonkeynautsRepository,

    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    email,
    monkeynaut = {
      class: 'RANDOM',
      rank: 'RANDOM',
    },
    ship = {
      class: 'RANDOM',
      rank: 'RANDOM',
    },
    type,
  }: CreateAirDropNftRequestDTO): Promise<CreateAirDropNftResponse> {
    const repository = {
      monkeynauts: this.monkeynautsRepository,
      ships: this.shipsRepository,
      players: this.playersRepository,
      logs: this.logsRepository,
    };

    const player = await this.playersRepository.findByEmail(email);

    if (!player) {
      return left(new UserNotFoundError());
    }

    async function generateLogAfterCreate(message: string) {
      if (!player) {
        return left(new UserNotFoundError());
      }

      const { log } = new Log({
        action: message,
        playerId: player.id,
        txHash: null,
      });

      await repository.logs.create(log);
    }

    if (type === 'MONKEYNAUT') {
      const createMonkeynautLogic = new CreateMonkeynautBusinessLogic(
        repository.monkeynauts,
        repository.players,
        repository.logs,
      );

      let classRarity = monkeynaut?.class as MonkeynautClass;
      let rankRarity = monkeynaut?.rank as TypeMonkeynautRank;

      if (monkeynaut?.class === 'RANDOM') {
        classRarity = await getClassByRarity();
      }

      if (monkeynaut?.rank === 'RANDOM') {
        rankRarity = await getRankByRarity();
      }
      const monkeynautCreated = await createMonkeynautLogic.execute({
        ownerId: player.id,
        rank: rankRarity,
        class: classRarity,
      });

      generateLogAfterCreate(`Sent 1 monkeynaut by air drop nft`);

      return right({
        monkeynauts: [monkeynautCreated],
        ships: null,
      });
    }

    if (type === 'SHIP') {
      const createShipLogic = new CreateShipBusinessLogic(
        repository.ships,
        repository.players,
        repository.logs,
      );

      let classRarity = ship?.class as TypeShipClass;
      let rankRarity = ship?.rank as TypeShipRank;

      if (ship?.class === 'RANDOM') {
        classRarity = await getShipClassByRarity();
      }

      if (ship?.rank === 'RANDOM') {
        rankRarity = await getShipRankByRarity();
      }
      const shipCreated = await createShipLogic.execute({
        ownerId: player.id,
        rank: rankRarity,
        class: classRarity,
      });

      generateLogAfterCreate(`Sent 1 ship by air drop nft`);

      return right({
        monkeynauts: null,
        ships: [shipCreated],
      });
    }

    async function createMonkeynautFromPack(
      _player: IPlayer,
      createMonkeynautLogic: CreateMonkeynautBusinessLogic,
    ) {
      const _monkeynaut = await createMonkeynautLogic.execute({
        ownerId: _player.id,
      });

      return _monkeynaut;
    }

    async function createShipFromPack(
      _player: IPlayer,
      createShipLogic: CreateShipBusinessLogic,
    ) {
      const _ship = await createShipLogic.execute({
        ownerId: _player.id,
      });

      return _ship;
    }

    if (type === 'PACK') {
      const createMonkeynautLogic = new CreateMonkeynautBusinessLogic(
        repository.monkeynauts,
        repository.players,
        repository.logs,
      );

      const createShipLogic = new CreateShipBusinessLogic(
        repository.ships,
        repository.players,
        repository.logs,
      );

      const packAmount = {
        monkeynauts: 2,
        ships: 1,
      };

      const _monkeynauts: Promise<IMonkeynaut>[] = [];
      const _ships: Promise<IShip>[] = [];

      for (let index = 0; index < packAmount.monkeynauts; index++) {
        const result = createMonkeynautFromPack(player, createMonkeynautLogic);

        _monkeynauts.push(result);
      }

      for (let index = 0; index < packAmount.ships; index++) {
        const result = createShipFromPack(player, createShipLogic);

        _ships.push(result);
      }

      const monkeynautsCreated = await Promise.all(_monkeynauts);
      const shipsCreated = await Promise.all(_ships);

      generateLogAfterCreate(
        `Sent ${packAmount.monkeynauts} monkeynaut and ${packAmount.ships} ships from air drop nft`,
      );

      return right({
        monkeynauts: monkeynautsCreated,
        ships: shipsCreated,
      });
    }

    return left(new AirDropNftTypeNotAllowed());
  }
}