import React, { Component } from 'react';
import styles from '../Home.module.css';
import firebase from '../../../firebase.js';

class Chatlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    const usersDatabase = firebase.database().ref('users');
    usersDatabase.on('value', snapshot => {
      const snap = snapshot.val();
      const users = [];
      for (let user in snap) {
        users.push(
          {
            ...snap[user]
          }
        )
      };
      this.setState(
        {
          users
        }
      );
      }
    )
  }

  render() {
    return (
      <div
        className={styles.chatlist}
        >
          {
            this.state.users.map(user => <div
                key={user.uid}
                onClick={
                  () => this.props.setReceiverById(user.uid)
                }
                >
                  {
                    user.username
                  }
              </div>
            )
          }
        </div>
      )
    }
  };

export default Chatlist;
