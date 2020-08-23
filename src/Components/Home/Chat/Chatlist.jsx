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
    const usersDatabase = firebase.database().ref('users').limitToLast(25);
    this.getChatlist(usersDatabase);
  }

  componentDidUpdate(prevProps) {
    const {
      searchResults,
    } = this.props;

    if (searchResults !== prevProps.searchResults) {
      const usersDatabase = searchResults || firebase.database().ref('users').limitToLast(25);
      this.getChatlist(usersDatabase);
    }
  }

  getChatlist = usersDatabase => {
    usersDatabase.once('value', snapshot => {
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
                className={this.props.currentReceiverId == user.uid ? styles.currentChat : ''}
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
