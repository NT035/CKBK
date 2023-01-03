import React from 'react';
import styles from "./Button.module.css";

export default function Button(props) {
  return (
    <a className={styles.loginLink} href={props.href}>
      <div className={styles.loginButton}>{props.text}</div>
    </a>
  );
}