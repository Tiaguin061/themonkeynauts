import ensureAdministrator from '@modules/players/infra/http/middlewares/ensure-administrator';
import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { consumeFuelController } from '../controllers/consume-fuel';
import { createShipController } from '../controllers/create-ship';
import { listShipsController } from '../controllers/list-ships';
import { refuelShipController } from '../controllers/refuel-ship';

const shipsRouter = Router();

shipsRouter.get(
  '/list',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      player_id: Joi.string().uuid(),
    },
  }),
  (request, response) => listShipsController.handle(request, response),
);

shipsRouter.put(
  '/consume-fuel',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      ship_id: Joi.string().uuid(),
      action: Joi.string().valid('TRAVEL', 'BOUNTY_HUNT'),
    },
  }),
  (request, response) => consumeFuelController.handle(request, response),
);

shipsRouter.put(
  '/refuel-ship',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      ship_id: Joi.string().uuid(),
    },
  }),
  (request, response) => refuelShipController.handle(request, response),
);

shipsRouter.post(
  '/create-ship',
  ensureAuthenticated,
  ensureAdministrator,
  celebrate({
    [Segments.BODY]: {
      player_id: Joi.string().uuid().required(),
      name: Joi.string(),
      class: Joi.string().valid('FIGHTER', 'MINER', 'EXPLORER'),
      rank: Joi.string().valid('B', 'A', 'S'),
      bonus_value: Joi.number(),
      bonus_description: Joi.string(),
      tank_capacity: Joi.number(),
      crew_capacity: Joi.number(),
      crew: Joi.number(),
      fuel: Joi.number(),
      avatar: Joi.string(),
      breed_count: Joi.number(),
      on_sale: Joi.boolean(),
    },
  }),
  (request, response) => createShipController.handle(request, response),
);

export { shipsRouter };
