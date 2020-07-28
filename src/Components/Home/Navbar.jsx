import React, { Component } from 'react';
import firebase from '../../firebase.js';
import styles from './Home.module.css';
import {
  NavLink,
  } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserProfileInfo: {},
    };
  }

  render() {
    return (
      <div
      className={`${styles.bar} ${styles.navbar}`}
        >
        <nav>

        {  `Hi, ${this.props.currentUser.username} `}

          <a
            onClick={
              () => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => this.props.history.push('/signup'));
                }
              }
            >
            Logout
          </a>

        </nav>
      </div>
    )
  }
};

export default Nav;
