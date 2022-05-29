import { ILog, Log } from '@modules/logs/domain/entities/log';
import { inject, injectable } from 'tsyringe';
import { ILogsRepository } from '../../domain/repositories/logs-repositories';

@injectable()
class ListLogsBusinessLogic {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute(player_id?: string): Promise<ILog[]> {
    let logs: ILog[] = [];

    const log = new Log({
      content: 'jhssadddfagasd',
      createdAt: new Date(),
      playerId: player_id || '*',
      updatedAt: new Date(),
    });

    await this.logsRepository.create(log);

    if (player_id) {
      logs = await this.logsRepository.listAllLogsFromPlayer(player_id);
    } else {
      logs = await this.logsRepository.listAllLogs();
    }

    return logs;
  }
}

export { ListLogsBusinessLogic };