import React, { Component, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from './firebase.js';
import {
  Router,
  Route,
  Switch,
  } from 'react-router-dom';
import history from './history';
import Welcome from './Components/Welcome/Welcome';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Home from './Components/Home/Home';

class RoutedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path='/'
            exact
            component={Welcome}
            />
          <Route
            path='/home'
            exact
            component={Home}
            />
        </Switch>
      </Router>
    )
  }
};

ReactDOM.render(
  <StrictMode>
    <RoutedApp
      />
  </StrictMode>,
  document.getElementById('root')
);
