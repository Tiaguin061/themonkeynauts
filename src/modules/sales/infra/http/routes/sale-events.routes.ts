import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { adaptRoute } from '@shared/core/infra/adapters/express-route-adapter';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { buySaleItemController } from '../controllers/buy-sale-item';
import { createAirDropNftPlayerController } from '../controllers/create-air-drop-nft';
import { createSaleController } from '../controllers/create-sale';
import { listMonkeynautSalesController } from '../controllers/list-monkeynaut-sales';
import { listPackSalesController } from '../controllers/list-pack-sales';
import { listShipSalesController } from '../controllers/list-ship-sales';
import { updateSaleController } from '../controllers/update/update-sales';

const saleEventsRouter = Router();

saleEventsRouter.post(
  '/create',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate(
    {
      [Segments.BODY]: {
        crypto: Joi.string().valid('BNB', 'BUSD', 'SPC'),
        type: Joi.string().valid('MONKEYNAUT', 'SHIP', 'PACK').required(),
        price: Joi.number().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().optional(),
        quantity: Joi.number().required(),
        totalUnitsSold: Joi.number(),

        saleMonkeynaut: Joi.alternatives().conditional('type', {
          is: 'MONKEYNAUT',
          then: Joi.object({
            private: Joi.number().required(),
            sergeant: Joi.number().required(),
            captain: Joi.number().required(),
            major: Joi.number().required(),
          }).required(),
        }),
        saleShip: Joi.alternatives().conditional('type', {
          is: 'SHIP',
          then: Joi.object({
            rankB: Joi.number().required(),
            rankA: Joi.number().required(),
            rankS: Joi.number().required(),
          }).required(),
        }),
        salePack: Joi.alternatives().conditional('type', {
          is: 'PACK',
          then: Joi.object({
            type: Joi.string()
              .valid('BASIC', 'RANDOM', 'ADVANCED', 'EXPERT')
              .required(),
          }).required(),
        }),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => createSaleController.handle(request, response),
);

saleEventsRouter.post(
  '/buy-sale-item',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        packSaleId: Joi.string().uuid(),
        monkeynautSaleId: Joi.string().uuid(),
        shipSaleId: Joi.string().uuid(),
        wallet: Joi.string().required(),
        txHash: Joi.string().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => buySaleItemController.handle(request, response),
);
saleEventsRouter.get(
  '/list-monkeynauts',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        sales: Joi.string().valid('actived', 'withoutException', 'notActived'),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) =>
    listMonkeynautSalesController.handle(request, response),
);

saleEventsRouter.get(
  '/list-packs',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        sales: Joi.string().valid('actived', 'withoutException', 'notActived'),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => listPackSalesController.handle(request, response),
);

saleEventsRouter.get(
  '/list-ships',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        sales: Joi.string().valid('actived', 'withoutException', 'notActived'),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => listShipSalesController.handle(request, response),
);

// update
saleEventsRouter.put(
  '/update-sale',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate(
    {
      [Segments.BODY]: {
        crypto: Joi.string().valid('BNB', 'BUSD', 'SPC'),
        price: Joi.number(),
        startDate: Joi.date(),
        endDate: Joi.date().optional(),
        quantity: Joi.number(),
        totalUnitsSold: Joi.number(),
        currentQuantityAvailable: Joi.number(),
        active: Joi.boolean(),

        type: Joi.string().valid('MONKEYNAUT', 'SHIP', 'PACK').required(),

        saleMonkeynaut: Joi.alternatives().conditional('type', {
          is: 'MONKEYNAUT',
          then: Joi.object({
            saleMonkeynautId: Joi.string().uuid().required(),
            private: Joi.number(),
            sergeant: Joi.number(),
            captain: Joi.number(),
            major: Joi.number(),
          }),
        }),
        saleShip: Joi.alternatives().conditional('type', {
          is: 'SHIP',
          then: Joi.object({
            saleShipId: Joi.string().uuid().required(),
            rankB: Joi.number(),
            rankA: Joi.number(),
            rankS: Joi.number(),
          }),
        }),
        salePack: Joi.alternatives().conditional('type', {
          is: 'PACK',
          then: Joi.object({
            salePackId: Joi.string().uuid().required(),
            type: Joi.string().valid('BASIC', 'RANDOM', 'ADVANCED', 'EXPERT'),
          }),
        }),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => updateSaleController.handle(request, response),
);

saleEventsRouter.post(
  '/create-air-drop-nft',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        type: Joi.string().valid('MONKEYNAUT', 'SHIP', 'PACK').required(),
        monkeynaut: Joi.alternatives().conditional('type', {
          is: 'MONKEYNAUT',
          then: Joi.object({
            rank: Joi.string().valid(
              'PRIVATE',
              'SERGEANT',
              'CAPTAIN',
              'MAJOR',
              'RANDOM',
            ),
            class: Joi.string().valid('RANDOM'),
          }),
        }),
        ship: Joi.alternatives().conditional('type', {
          is: 'SHIP',
          then: Joi.object({
            rank: Joi.string().valid('A', 'B', 'S', 'RANDOM'),
            class: Joi.string().valid('RANDOM'),
          }),
        }),
        pack: Joi.alternatives().conditional('type', {
          is: 'PACK',
          then: Joi.optional(),
        }),
      },
    },
    {
      abortEarly: false,
    },
  ),
  adaptRoute(createAirDropNftPlayerController),
);
export { saleEventsRouter };