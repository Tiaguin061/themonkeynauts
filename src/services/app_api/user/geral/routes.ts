import { baseApi } from '@/services/api';
import { AxiosResponse } from 'axios';

import {
  AppLoginParams, 
  AppRegisterParams,
} from './params';

import {
  AppLoginResponse, 
  AppRegisterResponse,
} from './response';

export const geral = {
  register: (data: AppRegisterParams): Promise<AxiosResponse<AppRegisterResponse>> => {
    return baseApi.post('/players', data);
  },
  authenticate: {
    app_login: (data: AppLoginParams): Promise<AxiosResponse<AppLoginResponse>> => {
      return baseApi.post('/authentication', data);
    },
  }
}