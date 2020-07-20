import React, { Component } from 'react';
import firebase from '../../firebase.js';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';
import Login from './Login';

class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
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
      username,
      password
    } = this.state;

    firebase
      .auth()
	    .createUserWithEmailAndPassword(email, password)
	    .then(
        () => {
	       const user = firebase.auth().currentUser;
	       user.updateProfile({displayName: username})
      		  .then(() => this.props.history.push('/'))
      		  .catch(err => this.setState({err}))
          }
        )
      .catch(err => this.setState({err}))
  };

	render() {
		const {email, username, password, error} = this.state;
		const props = this.props;

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
							type='text'
							id='username'
							name='username'
							autoComplete='off'
							placeholder='username'
							value={username}
							onChange={this.changeHandler}
						/>

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

					<button className={styles.submitButton} children='create an account' />

					<p>
            Already have an account?
            <span
							className={styles.link}
							onClick={
								() => props.clickHandler('Login')
							}
							>
							Login.
						</span>
          </p>

      	</form>
			</div>
		);
	}
}

export default Register;
