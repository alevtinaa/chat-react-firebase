import React, { Component } from 'react';
import styles from './Messages.module.css';

class DateString extends Component {
  constructor(props) {
    super(props);
    this.date = this.props.date;
  }

  render() {
    return (
      <div
        className={styles.dateString}
        >
          {
            this.date.toLocaleDateString()
          }
      </div>
    )
  }
}

export default DateString;
