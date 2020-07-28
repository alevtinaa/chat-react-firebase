import React, { Component, createRef } from 'react';
import styles from '../Home.module.css';
import firebase from '../../../firebase.js';
import MessageInput from './MessageInput';
import Loader from '../../Loader/Loader';

class Chat extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.chatRef = createRef();
    this.state = {
      messagesAreLoading: false,
      messages: [],
      error: null,
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadChatMessages(this.props.currentChatId);
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.currentChatId !== this.props.currentChatId) {
      this.loadChatMessages(this.props.currentChatId);
    }

    if (prevState.messages !== this.state.messages) {
      this.setState(
        {
          messagesAreLoading: false,
        }
      );
    }

    if (!this.state.messagesAreLoading && prevState.messagesAreLoading !== this.state.messagesAreLoading) {
      this.scrollChatToBottom();
    }

  }

  componentWillUnmount() {
    this.setState(
      {
        messages: [],
      }
    );
    this._isMounted = false;
  }

  loadChatMessages = chatId => {
    this.setState(
      {
        messagesAreLoading: true,
      }
    );

    const chatDatabase = firebase.database().ref('chats').child(this.props.currentChatId);

    chatDatabase.on('value', snapshot => {

      const snap = snapshot.val();
      const messages = [];

      for (let message in snap) {
        messages.push(
          {
            ...snap[message]
          }
        );
      };

      this._isMounted && this.setState(
          {
            messages
          }
        );
      }
    );
  }

  scrollChatToBottom = () => {
    this.chatRef.current.scrollTo(0, this.chatRef.current.scrollHeight);
  }

  render() {
    const {
      currentChatId,
      currentUser,
      receiverUser,
    } = this.props;

    return (
      (currentUser && receiverUser) ? <>

      <div
        className={styles.chat}
        ref={this.chatRef}
        >
          {
            !this.state.messagesAreLoading ?
            this.state.messages.map(
              message => (
                <div
                  key={message.timestamp}
                  className={`${styles.message} ${message.senderId !== currentUser.uid ? styles.incoming : styles.outgoing}`}
                  >
                    <div
                      className={styles.messageCloud}
                      >
                        {
                          message.messageText
                        }
                    </div>
                  </div>
                )
              )
              : <Loader />
          }
      </div>

      <MessageInput
        currentChatId={currentChatId}
        senderId={currentUser.uid}
        receiverId={receiverUser.uid}
        />

      </>
      : <Loader />
    )
  }
};

export default Chat;
