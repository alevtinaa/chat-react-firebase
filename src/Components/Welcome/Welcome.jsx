import React, { Component } from 'react';
import styles from './Welcome.module.css';
import firebase from '../../firebase.js';
import AuthMessage from '../Auth/AuthMessage';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Loader from '../Loader/Loader';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: 'AuthMessage',
    };
  }

  componentDidUpdate() {
    if (this.props.currentUser) this.props.history.push('/');
  }

  linksClickHandler = type => {
    this.setState(
      {
        isShown: type,
      }
    )
  }

  contentGenerator = () => {
    switch (this.state.isShown) {
      case 'Login': return <Login
        clickHandler={this.linksClickHandler}
        history={this.props.history}
        />;
      case 'Register': return <Register
        clickHandler={this.linksClickHandler}
        history={this.props.history}
        />;
      case 'AuthMessage': return <AuthMessage
        clickHandler={this.linksClickHandler}
        />;
      default: return <Loader />;
    }
  }

  render() {
    const content = this.contentGenerator();

		return (
			<div
        className={styles.container}
        >
				<h1>Hello.</h1>
        {
          content
        }
			</div>
		)
	}
}

export default Welcome;
