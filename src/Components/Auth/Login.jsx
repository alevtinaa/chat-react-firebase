import React, { Component } from 'react';
import firebase from '../../firebase.js';
import styles from './Auth.module.css';

class Login extends Component {
  constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: null,
		}
	}

	changeHandler = e => {
		this.setState(
      {
        [e.target.name]: e.target.value
      }
    );
	}

	submitHandler = e => {
    e.preventDefault();
    const {
      email,
      password
    } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => this.props.history.push('/'))
      .catch(error => this.setState({error}));
  };

	render() {
		const {email, password, error} = this.state;

		return (
			<div
        className={styles.container}
        >

				{
          error && <p
            className={styles.error}
            >
              {
                error.message
              }
            </p>
        }

				<form
          className={styles.form}
          onSubmit={this.submitHandler}
          >

            <input
              type='email'
              id='email'
              name='email'
              autoComplete='off'
              placeholder='email'
              value={email}
              onChange={this.changeHandler}
            />

            <input
              type='password'
              id='password'
              name='password'
              placeholder='password'
              value={password}
              onChange={this.changeHandler}
            />

					<button className={styles.submitButton} children='log in' />

          <p>
            Not a user yet?
            <span
              className={styles.link}
              onClick={
                () => this.props.clickHandler('Register')
              }
              >
              Create an account.
            </span>
          </p>

      	</form>
			</div>
		);
	}
}

export default Login;
