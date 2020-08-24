import React, { Component } from 'react';
import styles from './SelectedBar.module.css';
import ArrowUp from './arrow-up.png';
import ArrowDown from './arrow-down.png';

class SelectedBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShownFull: false,
    }
  }

  componentDidUpdate(prevProps) {
    this.props.selectedMessages.length
      && !prevProps.selectedMessages.length
      && this.setState(
        {
          isShownFull: true,
        }
      )
  }

  deleteMessages = selectedMessages => {
    const {
      chatQuery,
      actions,
    } = this.props;

    const updates = Object.fromEntries(
      selectedMessages.map(key => [key, null])
    );

    chatQuery.update(
      updates,
      error => {
        if (error) return;
        if (!error) actions.unselect(selectedMessages);
      }
    );
  }

  render() {
    const {
      scrollbarWidth,
      selectedMessages,
      actions,
    } = this.props;

    const {
      isShownFull,
    } = this.state;

    return (
      <div
        className={styles.selectedBar}
        style={
          {
            width: `calc(75% - ${scrollbarWidth}px)`,
            visibility: `${!selectedMessages.length ? 'hidden' : ''}`,
            padding: `${!isShownFull ? '2px 15px' : '13px'}`,
          }
        }
        >
          {

            isShownFull &&

            <>

            <span
              >
                {
                  `Selected: ${selectedMessages.length}`
                }
            </span>

            <span
              onClick={() => this.deleteMessages(selectedMessages)}
              className={styles.link}
              >
                {
                  `delete`
                }
            </span>

            <span
              onClick={() => actions.edit(selectedMessages[0])}
              className={`${styles.link} ${selectedMessages.length === 1 ? '' : styles.disabled}`}
              >
                {
                  `edit`
                }
              </span>

            <span
              onClick={() => false}
              className={styles.link}
              >
                {
                  ` forward`
                }
            </span>

            </>

          }

          <img
            alt=''
            src={isShownFull ? ArrowUp : ArrowDown}
            style={
              {
                marginRight: '0',
                marginLeft: 'auto'
              }
            }
            onClick={
              () => this.setState(prevState =>
                (
                  {
                    isShownFull: !prevState.isShownFull,
                  }
                )
              )
            }
            />

      </div>
    )
  }
};

export default SelectedBar;
