/* eslint-disable react/display-name */
import React, { useState, forwardRef, useImperativeHandle } from "react";
import styles from "./styles.module.css";

const Toast = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => ({
    showToast: (msg) => {
      setMessage(msg);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    },
  }));

  if (!show) return null;

  return (
    <div
      className={`${styles.toast_container} ${show ? styles.show : styles.hide}`}
    >
      <div className={styles.toast}>
        <button className={styles.close_button} onClick={() => setShow(false)}>
          x
        </button>
        <span>{message}</span>
      </div>
    </div>
  );
});

export default Toast;
