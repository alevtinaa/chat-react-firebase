import React, { Component } from 'react';
import styles from './Auth.module.css';

class AuthMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;

    return <>
      <div
        >
        To start chating,
          <span
            className={styles.link}
            onClick={
              () => props.clickHandler('Login')
            }
            >
            login
          </span>
        to your profile.
        </div>

      <div
        >
        If you don't have one,
          <span
            className={styles.link}
            onClick={
              () => props.clickHandler('Register')
            }
            >
            create it
            </span>
          right now.
        </div>
    </>
  }
};

export default AuthMessage;
