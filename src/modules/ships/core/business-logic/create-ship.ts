import { Log } from '@modules/logs/domain/entities/log';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import {
  getShipClassByRarity,
  getShipRankByRarity,
} from '@modules/ships/config/create-ship';
import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { ShipClass } from '@modules/ships/domain/enums/ship-class';
import { ShipRank } from '@modules/ships/domain/enums/ship-rank';
import { CreateShipRequestDTO } from '@modules/ships/dtos/create-ship-request';
import { AppError } from '@shared/errors/app-error';
import { generateSpaceName, rarity } from '@shared/helpers';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class CreateShipBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    ownerId,
    playerId,
    name,
    class: _class,
    rank,
    bonusValue,
    bonusDescription,
    tankCapacity,
    crewCapacity,
    canRefuelAtStation,
    crew,
    fuel,
    breedCount,
    onSale,
  }: CreateShipRequestDTO): Promise<IShip> {
    const player = await this.playersRepository.findById(ownerId);

    if (!player) {
      throw new AppError(
        'Could not create the ship because the player you entered to associate the ship does not exist',
        400,
      );
    }

    const __class = _class || (await getShipClassByRarity());
    const __rank = rank || (await getShipRankByRarity());
    const __name = name || (await generateSpaceName());

    const __tankCapacity =
      tankCapacity ||
      {
        B: 200,
        A: 300,
        S: 400,
      }[__rank];

    const __fuel = fuel || __tankCapacity;
    const __crew = crew ?? 0;

    const crewCapacitySchema: Record<ShipRank, number> = {
      B: 2,
      A: 3,
      S: 4,
    };

    const bonusValueSchema: Record<ShipClass, Record<ShipRank, number>> = {
      FIGHTER: {
        A: 30,
        B: 60,
        S: 100,
      },
      MINER: {
        A: 15,
        B: 30,
        S: 50,
      },
      EXPLORER: {
        A: 15,
        B: 30,
        S: 50,
      },
    };

    const __bonusDescription =
      bonusDescription ??
      {
        FIGHTER: 'Bounty Hunt Damage',
        MINER: 'Mining Success Rate',
        EXPLORER: 'Mission Time',
      }[__class];

    const __crewCapacity = crewCapacity ?? crewCapacitySchema[__rank];
    const __bonusValue = bonusValue ?? bonusValueSchema[__class][__rank];
    const __canRefuelAtStation = canRefuelAtStation ?? false;
    const __breedCount = breedCount ?? 0;
    const __onSale = onSale ?? false;

    const { ship } = new Ship({
      ownerId,
      playerId: playerId ?? ownerId,
      name: __name,
      class: __class,
      rank: __rank,
      fuel: __fuel,
      crew: __crew,
      bonusValue: __bonusValue,
      bonusDescription: __bonusDescription,
      tankCapacity: __tankCapacity,
      crewCapacity: __crewCapacity,
      canRefuelAtStation: __canRefuelAtStation,
      avatar: null,
      breedCount: __breedCount,
      onSale: __onSale,
    });

    await this.shipsRepository.create(ship);

    const { log } = new Log({
      action: `Ship has created on player account. SHIP_ID:${ship.id}`,
      playerId: ownerId,
      txHash: null,
    });

    await this.logsRepository.create(log);

    return ship;
  }
}

export { CreateShipBusinessLogic };
