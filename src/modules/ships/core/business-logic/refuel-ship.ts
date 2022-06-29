import { RefuelShipRequestDTO } from '@modules/ships/dtos/refuel-ship-request';
import { IShip, Ship } from '@modules/ships/domain/entities/ship';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IPlayersRepository } from '@modules/players/domain/repositories/players-repository';
import { IResourcesRepository } from '@modules/players/domain/repositories/resources-repository';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class RefuelShipBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,

    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,

    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,
  ) {}

  async execute({ shipId, playerId }: RefuelShipRequestDTO): Promise<IShip> {
    const player = await this.playersRepository.findById(playerId);

    if (!player) {
      throw new AppError('Player does not exist', 401);
    }

    const resource = await this.resourcesRepository.findByPlayerId(playerId);

    if (!resource) {
      throw new AppError('Resource does not exist', 409);
    }

    const ship = await this.shipsRepository.findById(shipId);

    if (!ship) {
      throw new AppError(
        'Could not refuel the ship because the ship you entered does not exist',
        400,
      );
    }

    if (!ship.canRefuelAtStation) {
      throw new AppError('You cannot refuel this ship at the station', 400);
    }

    const usedFuel = ship.tankCapacity - ship.fuel;
    const amountPayableInSpc = usedFuel * 0.08;
    const replenished = ship.tankCapacity;

    if (amountPayableInSpc > resource.spc) {
      throw new AppError(`You don't have enough spc amount`);
    }

    resource.spc -= amountPayableInSpc;

    await this.resourcesRepository.save(resource);

    const { ship: updatedShip } = new Ship(
      {
        ...ship,
        canRefuelAtStation: false,
        fuel: replenished,
      },
      {
        id: ship.id,
        createdAt: ship.createdAt,
      },
    );

    await this.shipsRepository.save(updatedShip);

    return updatedShip;
  }
}

export { RefuelShipBusinessLogic };
