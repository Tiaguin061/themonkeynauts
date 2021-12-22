import { useAuth } from '@/hooks';
import { Route, RouteProps, Redirect } from 'react-router-dom';

export type CustomRouterProps = RouteProps & {
  isPrivate?: {
    redirect?: string;
    is: boolean;
  };
  ifAuthenticateNotAccess?: {
    redirect?: string;
    is: boolean;
  };
}

export function CustomRouter({isPrivate, ifAuthenticateNotAccess, ...rest}: CustomRouterProps) {
  const tokenIsValid = true;
  const { token } = useAuth();

  if(isPrivate && tokenIsValid && token) {
    return <Redirect to={isPrivate.redirect || '/login'} />
  }

  if(ifAuthenticateNotAccess && tokenIsValid && token) {
    return <Redirect to={ifAuthenticateNotAccess.redirect || '/dashboard'} />
  }

  return (
    <Route {...rest} />
  )
}