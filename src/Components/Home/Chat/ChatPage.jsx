import React, { Component, createRef } from 'react';
import styles from '../Home.module.css';
import ChatBox from './ChatBox';
import MessageInput from './MessageInput/MessageInput';
import Loader from '../../Loader/Loader';

class ChatPage extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this._initLoadingCount = 25;

    this.chatBoxRef = createRef();
    this.lastMessageRef = createRef();

  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      currentChatId,
      currentUser,
      receiverUser,
    } = this.props;

    return (
      currentUser && receiverUser ?

      <>

      <ChatBox
        key={currentChatId}
        currentChatId={currentChatId}
        currentUserId={currentUser.uid}
        chatBoxRef={this.chatBoxRef}
        lastMessageRef={this.lastMessageRef}
        initLoadingCount={this._initLoadingCount}
        />

      <MessageInput
        currentChatId={currentChatId}
        senderId={currentUser.uid}
        receiverId={receiverUser.uid}
        />

      </>

      :

      <Loader
        />

    )
  }
};

export default ChatPage;
