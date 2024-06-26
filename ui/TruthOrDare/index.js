import { useState } from 'react';
import axios from 'axios';

import styles from './styles.module.css'

const TruthOrDare = ({ lastResults=[], setLastResults=()=>{} }) => {
    const [result, setResult] = useState('');

    const chooseTruthOrDare = async (choice) => {
        const response = await axios.get(`/api/${choice === 'truth' ? 'truths' : 'dares'}`);
        const data = response.data.data;
        const filteredData = data.filter(item => !lastResults.includes(item.text));
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        const newResult = filteredData[randomIndex].text;
        setResult(newResult);
        setLastResults(prevResults => {
            const updatedResults = [...prevResults, newResult];
            if (updatedResults.length > 8) {
                updatedResults.shift();
            }
            return updatedResults;
        });
    };

    console.log("lastResults",lastResults);

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
