import { BrowserRouter, Switch } from 'react-router-dom';

import { CustomRouter } from './CustomRouter';

import {
  Login,
  Register
} from '../pages';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <CustomRouter component={Register} exact path="/" />
        <CustomRouter component={Login} path="/login" />
        <CustomRouter component={Register} path="/register" />
      </Switch>
    </BrowserRouter>
  )
}