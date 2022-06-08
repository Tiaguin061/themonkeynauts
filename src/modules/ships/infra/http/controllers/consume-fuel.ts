import { ConsumeFuelRequestDTO } from '@modules/monkeynauts/dtos/consume-fuel-request';
import { ConsumeFuelBusinessLogic } from '@modules/ships/core/business-logic/consume-fuel';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ConsumeFuelController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as ConsumeFuelRequestDTO;

    const consumeFuelBusinessLogic = container.resolve(
      ConsumeFuelBusinessLogic,
    );

    const ship = await consumeFuelBusinessLogic.execute(data);

    return response.status(200).json(ship);
  }
}

const consumeFuelController = new ConsumeFuelController();

export { consumeFuelController };