import { useState } from 'react';
import axios from 'axios';

import styles from './styles.module.css'

const TruthOrDare = () => {
    const [result, setResult] = useState('');

    const chooseTruthOrDare = async (choice) => {
        if (choice === 'truth') {
          const response = await axios.get('/api/truths');
          const randomIndex = Math.floor(Math.random() * response.data.data.length);
          setResult(response.data.data[randomIndex].text);
        } else {
          const response = await axios.get('/api/dares');
          const randomIndex = Math.floor(Math.random() * response.data.data.length);
          setResult(response.data.data[randomIndex].text);
        }
    };

    return (
        <div className={styles.choose_button}>
            <span>Choose</span>
            <div>
                <button className={`${styles.button} ${styles.play}`} onClick={() => chooseTruthOrDare('truth')}><span>TRUTH</span></button>
                <button className={`${styles.button} ${styles.play}`} onClick={() => chooseTruthOrDare('dare')}><span>DARE</span></button>
            </div>
            {result && <p>{result}</p>}
        </div> 
    )
}

export default TruthOrDare;