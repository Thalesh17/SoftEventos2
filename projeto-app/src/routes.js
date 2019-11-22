import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/login/Login';
import Evento from './components/eventos/Evento';
import AddEvento from './components/eventos/AddEvento';
import EditEvento from './components/eventos/EditEvento';
import Register from './components/register/Register';
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ componEventoent: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Login></Login>} />
      <Route path="/register" component={() => <Register></Register>} />
      <PrivateRoute path="/eventos" component={() => <Evento></Evento>} />
      <PrivateRoute path="/add-evento" component={() => <AddEvento></AddEvento>} />
      <PrivateRoute path="/edit-evento" component={() => <EditEvento></EditEvento>} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;