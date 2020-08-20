import React, { Component } from 'react';
import styles from '../Home.module.css';

class Message extends Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.timestamp);
  }

  render() {
    const {...message} = this.props;

    return (
      <div
        className={`${styles.message} ${styles[message.type]}`}
        ref={message.messageRef}
        >
          <div
            className={styles.messageCloud}
            >
              <span
                >
                  {
                    message.messageText
                  }
              </span>
              <span
                className={styles.date}
                >
                  {
                    `${this.date.getHours()}:${this.date.getMinutes()}`
                  }
              </span>
          </div>
      </div>
    )
  }
};

export default Message;
