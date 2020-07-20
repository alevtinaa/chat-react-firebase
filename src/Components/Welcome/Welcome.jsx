import React, { Component } from 'react';
import styles from './Welcome.module.css';
import AuthMessage from '../Auth/AuthMessage';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: 'AuthMessage',
    };
  }

  clickHandler = type => {
    this.setState(
      {
        isShown: type,
      }
    )
  }

  contentGenerator = () => {
    switch (this.state.isShown) {
      case 'Login': return <Login
        clickHandler={this.clickHandler}
        history={this.props.history}
        />;
      case 'Register': return <Register
        clickHandler={this.clickHandler}
        history={this.props.history}
        />;
      case 'AuthMessage':
      default: return <AuthMessage
        clickHandler={this.clickHandler}
        />;
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
