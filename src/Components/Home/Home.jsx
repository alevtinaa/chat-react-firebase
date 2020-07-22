import React, { Component } from 'react';
import styles from './Home.module.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.currentUser) this.props.history.push('/')
  }

  render() {
    return (
      <div
        className={styles.container}
        >
        CHAT
      </div>
    )
  }
};

export default Home;
