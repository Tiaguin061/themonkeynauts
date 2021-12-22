import axios from 'axios';

import {
  user,
  UserType
} from './app_api';

export const monkeynautsApiToken = '@monkeynauts:token@';

export const baseApi = axios.create({
  baseURL: 'http://54.197.157.79:5000/api',
});

export const api = {
  user,
};

export {
  UserType
}