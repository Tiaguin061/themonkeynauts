import { createContext, useState } from 'react';

import {
  UserType,
  api,
  monkeynautsApiToken
} from '../services/api';

export type AuthContextData = {
  signIn: (credentials: UserType.AppLoginParams) => Promise<UserType.AppLoginResponse | undefined>;
  register: (credentials: UserType.AppRegisterParams) => Promise<UserType.AppRegisterResponse | undefined>;

  user: UserType.User | null;
  token: string | null;
  tokenIsValid: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

export type AuthProviderProps = {
  children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<UserType.User | null>(null);
  const [token, setToken] = useState<string | null>('');
  const [tokenIsValid, setTokenIsValid] = useState(true);

  async function signIn(credentials: UserType.AppLoginParams): Promise<UserType.AppLoginResponse | undefined> {
    const response = await api.user.geral.authenticate.app_login(credentials);

    const { token } = response.data;

    localStorage.setItem(monkeynautsApiToken, token);
    setTokenIsValid(true);
    setToken(token);

    return response.data || undefined;
  }

  async function register(credentials: UserType.AppRegisterParams): Promise<UserType.AppRegisterResponse | undefined> {
    const response = await api.user.geral.register(credentials);

    const { player, token } = response.data;

    localStorage.setItem(monkeynautsApiToken, token);
    setUser(player);
    setTokenIsValid(true);
    setToken(token);

    return response.data || undefined;
  }

  return (
    <AuthContext.Provider 
      value={{
        signIn, 
        register,
        token,
        tokenIsValid,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}