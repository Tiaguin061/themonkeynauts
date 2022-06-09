import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ChangePlayerOperatorMonkeynautBusinessLogic } from '@modules/monkeynauts/core/business-logic/change-player-operator-monkeynaut';
import { ChangePlayerOperatorMonkeynautRequestDTO } from '@modules/monkeynauts/dtos/change-player-operator-monkeynaut-request';

class ChangePlayerOperatorMonkeynautController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_logged_id = request.player.id;

    const data = request.body as ChangePlayerOperatorMonkeynautRequestDTO;

    const { currentOperatorPlayerId } = data;

    const changePlayerOperatorMonkeynautBusinessLogic = container.resolve(
      ChangePlayerOperatorMonkeynautBusinessLogic,
    );

    const monkeynaut =
      await changePlayerOperatorMonkeynautBusinessLogic.execute({
        ...data,
        currentOperatorPlayerId: currentOperatorPlayerId || user_logged_id,
      });

    return response.status(200).json(monkeynaut);
  }
}

const changePlayerOperatorMonkeynautController =
  new ChangePlayerOperatorMonkeynautController();

export { changePlayerOperatorMonkeynautController };