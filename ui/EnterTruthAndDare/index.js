import { useState, useRef } from "react";
import styles from "./styles.module.css";
import Toast from "../Toast";
import axios from "axios";

const EnterTruthAndDare = ({
  showTruth = true,
  showDare = true,
  style = {},
  inner_style = {},
}) => {
  const [truth, setTruth] = useState("");
  const [dare, setDare] = useState("");
  const toastRef = useRef(null);

  const addTruths = async () => {
    try {
      await axios.post("/api/truths", { text: truth });
      setTruth("");
      toastRef.current.showToast("Truth added successfully!");
    } catch (error) {
      console.error("Failed to add truth:", error.response.data);
    }
  };

  const addDare = async () => {
    try {
      await axios.post("/api/dares", { text: dare });
      setDare("");
      toastRef.current.showToast("Dare added successfully!");
    } catch (error) {
      console.error("Failed to add dare:", error.response.data);
    }
  };

  return (
    <div className={styles.container} style={{ ...style }}>
      <div className={styles.inner_container} style={{ ...inner_style }}>
        {showTruth && (
          <div style={{ marginTop: 40 }}>
            <label className={styles.label}>Enter Truth</label>
            <input
              type="text"
              value={truth}
              onChange={(e) => setTruth(e.target.value)}
              className={styles.input}
              placeholder="Enter Truth"
            />
            <button
              className={`${styles.button} ${styles.submit}`}
              onClick={addTruths}
            >
              Submit
            </button>
          </div>
        )}
        {showDare && (
          <div style={{ marginTop: 80 }}>
            <label className={styles.label}>Enter Dare</label>
            <input
              type="text"
              value={dare}
              onChange={(e) => setDare(e.target.value)}
              className={styles.input}
              placeholder="Enter Dare"
            />
            <button
              className={`${styles.button} ${styles.submit}`}
              onClick={addDare}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      <Toast ref={toastRef} />
    </div>
  );
};

export default EnterTruthAndDare;
