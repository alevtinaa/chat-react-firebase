import React, { Component } from 'react';
import styles from '../Home.module.css';
import firebase from '../../../firebase.js';
import Messages from './Messages/Messages';
import MessageInput from './MessageInput/MessageInput';
import SelectedBar from './SelectedBar/SelectedBar';
import Loader from '../../Loader/Loader';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.chatId = this.props.currentChatId;

    this.ref = this.props.chatBoxRef;

    this._firstMessageKey = null;
    this._endpointMessageKey = null;

    this.messageListeners = [];

    this.previousScrollY = 0;
    this.previousScrollHeight = 0;
    this.previousScrollTop = 0;

    this.state = {
      messages: [],
      selectedMessages: [],
      editedMessageKey: null,
      _initMessagesAreLoading: false,
      _scrollbarWidth: 0,
    };
  }

  componentDidMount() {
    this._isMounted = true;

    this.set_firstMessageKey()
      .then(
      () => this.loadMessages()
    );

  }

  componentDidUpdate(prevProps, prevState) {
    const _prevMessagesCount = prevState.messages.length;
    const _currentMessagesCount = this.state.messages.length;

    const INIT_MESSAGES_LOADED = prevState._initMessagesAreLoading
      && !this.state._initMessagesAreLoading
      && this.props.lastMessageRef.current;

    const MORE_MESSAGES_LOADED = _prevMessagesCount
      && _currentMessagesCount
      && prevState.messages[0].messageKey !== this.state.messages[0].messageKey;

    const NEW_MESSAGE_LOADED = _prevMessagesCount
      && _currentMessagesCount
      && prevState.messages[_prevMessagesCount-1].messageKey !== this.state.messages[_currentMessagesCount-1].messageKey;

    if (INIT_MESSAGES_LOADED) {
      this.ref.current.scrollTop = this.ref.current.scrollHeight;
      this.setState(
        {
          _scrollbarWidth: this.ref.current.offsetWidth - this.ref.current.clientWidth,
        }
      );
    }

    if (MORE_MESSAGES_LOADED) {
      const newScrollHeight = this.ref.current.scrollHeight;
      this.ref.current.scrollTop = newScrollHeight - this.previousScrollHeight;
    }

    if (NEW_MESSAGE_LOADED) {
      this.props.lastMessageRef.current && this.props.lastMessageRef.current.focus();
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

  set_firstMessageKey = async () => {
    this._firstMessageKey = await this.getChatQuery('init')
      .limitToFirst(1)
      .once('child_added')
      .then(
        async snapshot => Promise.resolve(snapshot.key)
      )
    }

  set_endpointMessageKey = key => this._endpointMessageKey = key

  getChatQuery = init => {
    const chatDatabase = firebase.database().ref('chats').child(this.chatId);

    switch (init) {
      case true: return chatDatabase
        .orderByKey()
        .limitToLast(this.props.initLoadingCount);
      case false: return chatDatabase
        .orderByKey()
        .endAt(this._endpointMessageKey)
        .limitToLast(this.props.initLoadingCount);
      default: return chatDatabase;
    };

  }

  loadMessages = () => {
    const init = !this._endpointMessageKey;

    if (init) {
      this.setState(
        {
          _initMessagesAreLoading: true,
        }
      );
    };

    const chatDatabaseLimited = this.getChatQuery(!!init);

    const listener = chatDatabaseLimited.on('value', snapshot => {

      if (snapshot.val()) {
        const snap = Object.entries(snapshot.val());
        const messages = [];

        snap.forEach(
          ([messageKey, message], i) => {
            i === 0 && messageKey != this._firstMessageKey ?
              this.set_endpointMessageKey(messageKey)
              :
              messages.push(
                {
                  messageKey,
                  ...message,
                }
              )
            }
          );

        if (this._isMounted) {
          !init && this.setState(prevState =>
              (
                {
                  messages: [...messages, ...prevState.messages],
                }
              )
            );

          init && this.setState(
              (
                {
                  messages,
                  _initMessagesAreLoading: false,
                }
              ),
            );
          };

        };

      });

    this.messageListeners.push(listener);

    return Promise.resolve();

  }

  selectMessages = messageKeys => {
    this.setState(
      prevState => (
        {
          selectedMessages: [...prevState.selectedMessages, ...messageKeys],
        }
      )
    )
  }

  unselectMessages = messageKeys => {
    this.setState(
      prevState => (
        {
          selectedMessages: this.state.selectedMessages.filter(key => !messageKeys.includes(key)),
          editedMessageKey: null,
        }
      )
    )
  }

  editMessage = messageKey => {
    this.setState(
      {
        editedMessageKey: messageKey,
      }
    )
  }

  scrollMessageIntoView = (message, block, behavior) => {
    message && message.scrollIntoView(
      {
        block,
        inline: 'nearest',
        behavior,
      }
    );
  }

  scrollHandler = () => {
    const currentScrollY = this.ref.current.scrollTop;
    const FULL_CHAT_LOADED = this.state.messages[0].messageKey === this._firstMessageKey;
    const SCROLLED_TO_TOP = !FULL_CHAT_LOADED && currentScrollY < this.previousScrollY && currentScrollY == 0;

    if (SCROLLED_TO_TOP) {
      this.previousScrollHeight = this.ref.current.scrollHeight;
      this.loadMessages();
    };

    this.previousScrollY = currentScrollY;
    this.previousScrollTop = this.ref.current.scrollTop;

  }

  render() {
    const {
      currentUserId,
      receiverId,
      currentChatId,
      lastMessageRef,
      chatBoxRef,
    } = this.props;

    const {
      messages,
      selectedMessages,
      editedMessageKey,
      _initMessagesAreLoading,
      _scrollbarWidth,
    } = this.state;

    const actions = {
      select: this.selectMessages,
      unselect: this.unselectMessages,
      edit: this.editMessage,
    };

    const editedMessage = messages.find(m => editedMessageKey === m.messageKey);

    return (
      !_initMessagesAreLoading ?

      <>

      <div
        className={styles.chat}
        ref={chatBoxRef}
        onScroll={this.scrollHandler}
        >

          <Messages
            messages={messages}
            selectedMessages={selectedMessages}
            lastMessageRef={lastMessageRef}
            actions={actions}
            currentUserId={currentUserId}
            />

          <SelectedBar
            chatQuery={this.getChatQuery()}
            scrollbarWidth={_scrollbarWidth}
            selectedMessages={selectedMessages}
            actions={actions}
            />

      </div>

      <MessageInput
        currentChatId={currentChatId}
        senderId={currentUserId}
        receiverId={receiverId}
        editMessage={this.editMessage}
        editedMessage={editedMessage}
        />

      </>

      :

      <Loader
        />

    )
  }
};

export default ChatBox;
