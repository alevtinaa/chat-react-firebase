import React, { Component } from 'react';
import styles from './Home.module.css';
import firebase from '../../firebase';
import Loader from '../Loader/Loader'
import Navbar from './Navbar/Navbar';
import Chatlist from './Chat/Chatlist';
import ChatPage from './Chat/ChatPage';

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

  setSearchResults = searchResults => {
    this.setState(
      {
        searchResults,
      }
    )
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
              setSearchResults={this.setSearchResults}
              />
            <Chatlist
              currentReceiverId={this.state.receiverUser && this.state.receiverUser.uid}
              setReceiverById={this.setReceiverById}
              searchResults={this.state.searchResults}
              />
        {
          this.state.currentChatId &&
            <ChatPage
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
