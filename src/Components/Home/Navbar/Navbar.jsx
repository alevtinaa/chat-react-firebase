import React, { Component } from 'react';
import firebase from '../../../firebase.js';
import styles from './Navbar.module.css';
import {
  NavLink,
  } from 'react-router-dom';
import Logout from './logout.png';
import Search from './search.png';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    };
  }

  changeHandler = e => {
    this.setState(
      {
        searchString: e.target.value,
      }
    );
  }

  keyDownHandler = e => {
    if (e.key === 'Enter') {
      const usersDatabase = firebase.database().ref('users')
        .orderByChild('username')
        .startAt(this.state.searchString)
        .limitToLast(25);
      this.props.setSearchResults(usersDatabase);
    }
  }

  render() {
    return (
      <nav
        className={styles.navbar}
        >

          <span
            >
              {
                `Hi, ${this.props.currentUser.username}`
              }
          </span>

          <input
            placeholder='...'
            value={this.state.searchString}
            onChange={e => this.changeHandler(e)}
            onKeyDown={e => this.keyDownHandler(e)}
            />

          <img
            alt=''
            src={Logout}
            onClick={
              () => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => this.props.history.push('/signup'));
                }
              }
            />

      </nav>
    )
  }
};

export default Nav;
