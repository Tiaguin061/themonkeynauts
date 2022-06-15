import {
  IShipSale,
  ShipSale,
  ShipSalePropsOmittedCommons,
} from '@modules/sales/domain/entities/ship-sale';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { ShipSale as PrismaShipSale } from '@prisma/client';
import { prisma } from '@shared/infra/database/prisma/client';
import { AsyncMaybe } from '@shared/types/maybe';

const parseShipSale = (shipSale: PrismaShipSale): IShipSale => {
  return new ShipSale(shipSale as ShipSalePropsOmittedCommons, {
    id: shipSale.id,
    createdAt: shipSale.createdAt,
    updatedAt: shipSale.updatedAt,
  }).shipSale;
};

class PrismaShipSalesRepository implements IShipSalesRepository {
  async findById(shipId: string): AsyncMaybe<IShipSale> {
    const shipSale = await prisma.shipSale.findUnique({
      where: { id: shipId },
    });

    if (!shipSale) {
      return null;
    }

    return parseShipSale(shipSale);
  }

  async create({ id: shipId, ...props }: IShipSale): Promise<void> {
    await prisma.shipSale.create({
      data: {
        id: shipId,
        ...props,
      },
    });
  }

  async listManyShips(): Promise<IShipSale[]> {
    const shipSales = await prisma.shipSale.findMany();

    return shipSales.map(parseShipSale);
  }
}

export { PrismaShipSalesRepository };
