import React, { Component } from 'react';
import styles from './Home.module.css';
import firebase from '../../firebase';
import Loader from '../Loader/Loader'
import Navbar from './Navbar';
import Chatlist from './Chat/Chatlist';
import Chat from './Chat/Chat';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverUser: null,
      currentChatId: null,
    }
  }

  componentDidUpdate() {
    if (!this.props.currentUser && this.props.authStateChanged) this.props.history.push('/signup');

    if (this.props.currentUser && this.state.receiverUser) {

      const senderId = this.props.currentUser.uid;
      const receiverId = this.state.receiverUser.uid;

      const newChatId = [senderId, receiverId].sort().join('_');

      this.state.currentChatId !== newChatId && (
        this.setState(
          {
            currentChatId: newChatId,
          }
        )
      );
    };

  }

  setReceiverById = id => {
    const userDatabase = firebase.database().ref('users').child(id);

    userDatabase.on('value', snapshot => {
      const snap = snapshot.val();
      this.setState(
        {
          receiverUser: snap,
        }
      );
    });

  }

  render() {
    return (
      this.props.currentUser ? (

        <div
          className={styles.container}
          >

            <Navbar
              history={this.props.history}
              currentUser={this.props.currentUser}
              />
            <Chatlist
              setReceiverById={this.setReceiverById}
              />
        {
          this.state.currentChatId &&
            <Chat
              currentChatId={this.state.currentChatId}
              currentUser={this.props.currentUser}
              receiverUser={this.state.receiverUser}
              />
        }
      </div>

      ) : <Loader />
    )
  }
};

export default Home;
