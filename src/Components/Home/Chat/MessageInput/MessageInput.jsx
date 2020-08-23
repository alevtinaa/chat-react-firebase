import React, { Component } from 'react';
import styles from './MessageInput.module.css';
import firebase from '../../../../firebase.js';
import SendButton from './send-button.png';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
    };
  }

  changeHandler = e => {
    this.setState(
      {
        messageText: e.target.value,
      }
    );
  }

  submitHandler = e => {
    const {
      currentChatId,
      senderId,
      receiverId,
    } = this.props;

    e.preventDefault();
    if (this.state.messageText.trim()) {

      const chatsDatabase = firebase.database().ref('chats').child(currentChatId);

      const message = {
          senderId,
          receiverId,
          timestamp: new Date().getTime(),
          messageText: this.state.messageText,
          readAt: null,
          editedAt: null,
        };

      chatsDatabase.push(message);

      this.setState(
          {
            messageText: '',
          }
        );
      }
    }

  render() {
    return (
      <form
        className={styles.inputarea}
        onSubmit={this.submitHandler}
        >

          <div
            className={styles.input}
            >
              <textarea
                name='inputarea'
                placeholder='enter your message...'
                value={this.state.messageText}
                onChange={this.changeHandler}
                autoFocus
                />
          </div>

          <div
            className={styles.send}
            >
              <button
                className={styles.sendMessageButton}
                >
                  <img
                    alt=''
                    src={SendButton}
                    />
              </button>
          </div>

        </form>
    )
  }
};

export default MessageInput;
