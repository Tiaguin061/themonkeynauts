import { inject, injectable } from 'tsyringe';

import { IShipSale, ShipSale } from '@modules/sales/domain/entities/ship-sale';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { AppError } from '@shared/errors/app-error';
import { UpdateShipSaleRequestDTO } from '@modules/sales/dtos/update-ship-sale-request';

@injectable()
class UpdateShipSaleBusinessLogic {
  constructor(
    @inject('ShipSalesRepository')
    private shipSalesRepository: IShipSalesRepository,
  ) {}

  async execute({
    endDate,
    crypto,
    price,
    quantity,

    saleShip,

    currentQuantityAvailable,

    startDate,
    totalUnitsSold,
    active,
  }: UpdateShipSaleRequestDTO): Promise<IShipSale> {
    const foundShipSale = await this.shipSalesRepository.findById(
      saleShip?.saleShipId as string,
    );

    if (!foundShipSale) {
      throw new AppError('Ship Sale does not exist', 404);
    }

    const percentageValues = {
      rank_a: saleShip?.rank_a ?? foundShipSale.rank_a,
      rank_b: saleShip?.rank_b ?? foundShipSale.rank_b,
      rank_s: saleShip?.rank_s ?? foundShipSale.rank_s,
    };

    const percentages = [
      percentageValues.rank_a,
      percentageValues.rank_b,
      percentageValues.rank_s,
    ];

    const totalPercentage = percentages.reduce(
      (previousPercentage, percentage) => previousPercentage + percentage,
      0,
    );

    if (totalPercentage !== 100) {
      throw new AppError('Ship sale percentage must be 100%');
    }

    const { shipSale } = new ShipSale(
      {
        crypto: crypto || foundShipSale.crypto,
        price: price ?? foundShipSale.price,
        quantity: quantity ?? foundShipSale.quantity,

        totalUnitsSold: totalUnitsSold ?? foundShipSale.totalUnitsSold,
        currentQuantityAvailable:
          currentQuantityAvailable ?? foundShipSale.currentQuantityAvailable,

        ...percentageValues,

        startDate: startDate || foundShipSale.startDate,
        endDate: endDate || foundShipSale.endDate,

        active: active || foundShipSale.active,
      },
      {
        updatedAt: new Date(),
        createdAt: foundShipSale.createdAt,
        id: foundShipSale.id,
      },
    );

    await this.shipSalesRepository.update(shipSale);

    return shipSale;
  }
}

export { UpdateShipSaleBusinessLogic };
