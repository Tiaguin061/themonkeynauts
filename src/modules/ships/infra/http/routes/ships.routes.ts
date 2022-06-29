import { ensureAuthenticated } from '@modules/players/infra/http/middlewares/ensure-authenticated';

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { changeActivePlayerShipController } from '../controllers/change-active-player-ship';
import { consumeFuelController } from '../controllers/consume-fuel';
import { createShipController } from '../controllers/create-ship';
import { listShipsController } from '../controllers/list-ships';
import { listUniqueShipController } from '../controllers/list-unique-ship';
import { refuelShipController } from '../controllers/refuel-ship';
import { updateShipController } from '../controllers/update-ship';

const shipsRouter = Router();

shipsRouter.get(
  '/list',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        playerId: Joi.string().uuid(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => listShipsController.handle(request, response),
);

shipsRouter.get(
  '/list-unique',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.QUERY]: {
        playerId: Joi.string().uuid(),
        shipId: Joi.string().uuid().required(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => listUniqueShipController.handle(request, response),
);

shipsRouter.put(
  '/consume-fuel',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        shipId: Joi.string().uuid(),
        action: Joi.string().valid('Travel', 'BountyHunt'),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => consumeFuelController.handle(request, response),
);

shipsRouter.put(
  '/refuel-ship',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        shipId: Joi.string().uuid(),
      },
    },
    {
      abortEarly: false,
    },
  ),
  (request, response) => refuelShipController.handle(request, response),
);

shipsRouter.patch(
  '/change-active-ship',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      shipId: Joi.string().uuid().required(),
    },
  }),
  (request, response) =>
    changeActivePlayerShipController.handle(request, response),
);

export { shipsRouter };
