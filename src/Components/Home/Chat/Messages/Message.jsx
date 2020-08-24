import React, { Component } from 'react';
import styles from './Messages.module.css';
import Selected from './selected.png';
import DateString from './DateString';

class Message extends Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.timestamp);
  }

  clickHandler = () => {
    const {
      messageKey,
      isSelected,
      actions,
    } = this.props;

    !isSelected ?
      actions.select([messageKey])
      :
      actions.unselect([messageKey]);
  }

  render() {
    const {...message} = this.props;

    return (
      <>
        {
          message.isNewDate && <DateString
            date={this.date}
            />
        }
      <div
        className={`${styles.message} ${styles[message.type]}`}
        ref={message.messageRef}
        tabIndex={message.tabIndex}
        >

          {
            message.isSelected
              && <img
                alt=''
                src={Selected}
                style={
                  {
                    height: '6px',
                    margin: '0 0 0 4px',
                  }
                }
                />
          }

          <div
            className={`${styles.messageCloud} ${message.isSelected ? styles.selected : ''}`}
            onClick={this.clickHandler}
            >

              <span
                >
                  {
                    message.messageText
                  }
              </span>

              <span
                className={styles.info}
                >
                  {
                    message.editedAt && ` edited `
                  }
                  {
                    `${this.date.getHours()}:${this.date.getMinutes()}`
                  }
              </span>

          </div>

      </div>

      </>
    )
  }
};

export default Message;
