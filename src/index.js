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
      currentUser: null,
      authStateChanged: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userDatabase = firebase.database().ref('users').child(user.uid);

        userDatabase.on('value', snapshot => {

          const snap = snapshot.val();

          this.setState(prevState => (
            {
              ...prevState,
              currentUser: snap,
              authStateChanged: true,
            }
          ));
        });
      } else {
          this.setState(prevState => (
            {
              ...prevState,
              currentUser: null,
              authStateChanged: true,
            }
          ));
        }
    });
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path='/'
            exact
            render={
              () => <Home
                history={history}
                currentUser={this.state.currentUser}
                authStateChanged={this.state.authStateChanged}
                />
              }
            />
          <Route
            path='/signup'
            exact
            render={
              () => <Welcome
                history={history}
                currentUser={this.state.currentUser}
                />
              }
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
