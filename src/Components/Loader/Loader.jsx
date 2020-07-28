import React, { Component } from 'react';
import styles from './Loader.module.css';
import LoaderSVG from './loader.svg';

class Loader extends Component {
  render() {
    return (
      <div
        className={styles.loaderContainer}
        >
          <img
            alt=''
            className={styles.loader}
            src={LoaderSVG}
            onDragStart={
              e => e.preventDefault()
            }
            onContextMenu={
              e => e.preventDefault()
            }
          />
      </div>
    )
  }
}

export default Loader;
