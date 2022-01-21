import { User } from '../../user/types';

export type ShipRole = 'fighter' | 'explorer' | 'miner';

export type Ship = {
  id: string;
  name: string;
  class: ShipRole;
  rank: string;

  avatar?: string;
  ownerName?: string;
  id_short?: string;
  
  baseAttributes: {
    fuel: number;
  };
  finalAttributes: {
    fuel: number;
  };
  
  owner: User;
  operator: User;
}

export type GetShip = {
  ships: Ship[];
}
