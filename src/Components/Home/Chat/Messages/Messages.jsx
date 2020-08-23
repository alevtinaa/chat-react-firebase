import React, { Component } from 'react';
import styles from './Messages.module.css';
import Message from './Message';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      messages,
      currentUserId,
      lastMessageRef,
      actions,
      selectedMessages,
    } = this.props;

    const messagesCount = messages.length;

    return (
      <>
        {
          messages.map(
            (m, i, a) => (
              <Message
                key={m.timestamp}
                type={m.senderId !== currentUserId ? 'incoming' : 'outgoing'}
                messageRef={i+1 === messagesCount ? lastMessageRef : null}
                actions={actions}
                isSelected={selectedMessages.includes(m.messageKey)}
                tabIndex={i+1 === messagesCount ? 1 : 0}
                {...m}
                />
              )
            )
        }
      </>
    )

  }
};

export default Messages;
