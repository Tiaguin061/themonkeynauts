import { IShip } from '@modules/ships/domain/entities/ship';
import { inject, injectable } from 'tsyringe';
import { IShipsRepository } from '../../domain/repositories/ships-repositories';

@injectable()
class ListShipsBusinessLogic {
  constructor(
    @inject('ShipsRepository')
    private shipsRepository: IShipsRepository,
  ) {}

  async execute(playerId?: string): Promise<IShip[]> {
    if (playerId) {
      return this.shipsRepository.listAllShipsFromPlayer(playerId);
    }

    const ships = await this.shipsRepository.listAllShips();

    return ships;
  }
}

export { ListShipsBusinessLogic };