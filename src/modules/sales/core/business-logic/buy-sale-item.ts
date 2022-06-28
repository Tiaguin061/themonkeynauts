import { inject, injectable } from 'tsyringe';

import { CreateMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/create-monkeynaut';
import { MonkeynautRank } from '@modules/monkeynauts/domain/enums';
import { PackType } from '@modules/sales/domain/enums/pack-type';
import { IMonkeynautSalesRepository } from '@modules/sales/domain/repositories/monkeynaut-sales-repositories';
import { IPackSalesRepository } from '@modules/sales/domain/repositories/pack-sales-repositories';
import { IShipSalesRepository } from '@modules/sales/domain/repositories/ship-sales-repositories';
import { BuySaleItemRequestDTO } from '@modules/sales/dtos/buy-sale-item-request';
import { CreateShipBusinessLogic } from '@modules/ships/core/business-logic/create-ship';
import { ShipRank } from '@modules/ships/domain/enums/ship-rank';
import { IBlockchainProvider } from '@shared/domain/providers/blockchain-provider';
import { AppError } from '@shared/errors/app-error';
import { rarity } from '@shared/helpers';
import { ILogsRepository } from '@modules/logs/domain/repositories/logs-repositories';
import { Log } from '@modules/logs/domain/entities/log';

type PackMonkeynaut = {
  rank: MonkeynautRank;
};

type PackShip = {
  rank: ShipRank;
};

type Pack = {
  monkeynauts: PackMonkeynaut[];
  ships: PackShip[];
};

@injectable()
class BuySaleItemBusinessLogic {
  constructor(
    @inject('MonkeynautSalesRepository')
    private monkeynautSalesRepository: IMonkeynautSalesRepository,

    @inject('PackSalesRepository')
    private packSalesRepository: IPackSalesRepository,

    @inject('ShipSalesRepository')
    private shipSalesRepository: IShipSalesRepository,

    @inject('BlockchainProvider')
    private blockchainProvider: IBlockchainProvider,

    @inject('CreateMonkeynautBusinessLogic')
    private createMonkeynautBusinessLogic: CreateMonkeynautBusinessLogic,

    @inject('CreateShipBusinessLogic')
    private createShipBusinessLogic: CreateShipBusinessLogic,

    @inject('LogsRepository')
    private logsRepository: ILogsRepository,
  ) {}

  async execute({
    playerId,
    monkeynautSaleId,
    packSaleId,
    shipSaleId,
    wallet,
    txHash,
  }: BuySaleItemRequestDTO): Promise<void> {
    if (monkeynautSaleId) {
      const monkeynautSale = await this.monkeynautSalesRepository.findById(
        monkeynautSaleId,
      );

      if (!monkeynautSale) {
        throw new AppError('Monkeynaut sale not found');
      }

      if (monkeynautSale.currentQuantityAvailable === 0) {
        throw new AppError('Monkeynaut sale is empty');
      }

      const monkeynautRank = await rarity({
        private: monkeynautSale.private,
        sergeant: monkeynautSale.sergeant,
        captain: monkeynautSale.captain,
        major: monkeynautSale.major,
      });

      await this.blockchainProvider.confirmTransaction({
        amount: monkeynautSale.price,
        txHash,
        playerId,
        from: wallet,
      });

      monkeynautSale.currentQuantityAvailable -= 1;
      monkeynautSale.totalUnitsSold += 1;

      await this.monkeynautSalesRepository.update(monkeynautSale);

      await this.createMonkeynautBusinessLogic.execute({
        ownerId: playerId,
        playerId,
        rank: monkeynautRank as MonkeynautRank,
      });

      const { log } = new Log({
        action: `The player bought a monkeynaut. MONKEYNAUT_SALE_ID:${monkeynautSaleId}`,
        playerId,
        txHash,
      });

      await this.logsRepository.create(log);

      return;
    }

    if (shipSaleId) {
      const shipSale = await this.shipSalesRepository.findById(shipSaleId);

      if (!shipSale) {
        throw new AppError('Ship sale not found');
      }

      if (shipSale.currentQuantityAvailable === 0) {
        throw new AppError('Ship sale is empty');
      }

      const shipRank = await rarity({
        a: shipSale.rankA,
        b: shipSale.rankB,
        s: shipSale.rankS,
      });

      await this.blockchainProvider.confirmTransaction({
        amount: shipSale.price,
        txHash,
        playerId,
        from: wallet,
      });

      await this.createShipBusinessLogic.execute({
        ownerId: playerId,
        playerId,
        rank: shipRank as ShipRank,
      });

      shipSale.currentQuantityAvailable -= 1;
      shipSale.totalUnitsSold += 1;

      await this.shipSalesRepository.update(shipSale);

      const { log } = new Log({
        action: `The player bought a ship. SHIP_SALE_ID:${shipSaleId}`,
        playerId,
        txHash,
      });

      await this.logsRepository.create(log);

      return;
    }

    if (packSaleId) {
      const packSale = await this.packSalesRepository.findById(packSaleId);

      if (!packSale) {
        throw new AppError('Pack sale not found');
      }

      if (packSale.currentQuantityAvailable === 0) {
        throw new AppError('Pack sale is empty');
      }

      await this.blockchainProvider.confirmTransaction({
        amount: packSale.price,
        txHash,
        playerId,
        from: wallet,
      });

      const packs: Record<PackType, Pack> = {
        BASIC: {
          monkeynauts: [
            {
              rank: MonkeynautRank.SERGEANT,
            },
            {
              rank: MonkeynautRank.SERGEANT,
            },
          ],
          ships: [
            {
              rank: ShipRank.B,
            },
          ],
        },
        ADVANCED: {
          monkeynauts: [
            {
              rank: MonkeynautRank.CAPTAIN,
            },
            {
              rank: MonkeynautRank.CAPTAIN,
            },
            {
              rank: MonkeynautRank.CAPTAIN,
            },
          ],
          ships: [
            {
              rank: ShipRank.A,
            },
          ],
        },
        EXPERT: {
          monkeynauts: [
            {
              rank: MonkeynautRank.MAJOR,
            },
            {
              rank: MonkeynautRank.MAJOR,
            },
            {
              rank: MonkeynautRank.MAJOR,
            },
            {
              rank: MonkeynautRank.MAJOR,
            },
          ],
          ships: [
            {
              rank: ShipRank.S,
            },
          ],
        },
        RANDOM: {
          monkeynauts: [
            {
              rank: await (async () => {
                const monkeynautRank = await rarity({
                  private: 50,
                  sergeant: 30,
                  captain: 18,
                  major: 2,
                });

                return monkeynautRank as MonkeynautRank;
              })(),
            },
            {
              rank: await (async () => {
                const monkeynautRank = await rarity({
                  private: 50,
                  sergeant: 30,
                  captain: 18,
                  major: 2,
                });

                return monkeynautRank as MonkeynautRank;
              })(),
            },
          ],
          ships: [
            {
              rank: await (async () => {
                const shipRank = await rarity({
                  b: 55,
                  a: 33,
                  s: 12,
                });

                return shipRank as ShipRank;
              })(),
            },
          ],
        },
      };

      const pack = packs[packSale.type];

      const monkeynauts = pack.monkeynauts.map(monkeynaut => {
        return this.createMonkeynautBusinessLogic.execute({
          ownerId: playerId,
          playerId,
          rank: monkeynaut.rank,
        });
      });

      const ships = pack.ships.map(ship => {
        return this.createShipBusinessLogic.execute({
          ownerId: playerId,
          playerId,
          rank: ship.rank,
        });
      });

      await Promise.all([...monkeynauts, ...ships]);

      packSale.currentQuantityAvailable -= 1;
      packSale.totalUnitsSold += 1;

      await this.packSalesRepository.update(packSale);

      const { log } = new Log({
        action: `The player bought a pack. PACK_SALE_ID:${packSaleId}`,
        playerId,
        txHash,
      });

      await this.logsRepository.create(log);
    }
  }
}

export { BuySaleItemBusinessLogic };