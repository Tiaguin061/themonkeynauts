import { PlayerRole } from '@modules/players/domain/enums/player-role';
import { AppError } from '@shared/errors/app-error';
import { prisma } from '@shared/infra/database/prisma/client';
import { NextFunction, Request, Response } from 'express';

export default async function ensureAdministrator(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const player_id = request.player.id;

  const player = await prisma.player.findUnique({
    where: {
      id: player_id,
    },
  });

  if (!player) throw new AppError('Player does not exist', 401);

  if (player.role !== PlayerRole.ADMIN)
    throw new AppError('Only administrator can access here', 401);

  return next();
}