import { useState } from 'react';
import axios from 'axios';

import styles from './styles.module.css'

const TruthOrDare = () => {
    const [result, setResult] = useState('');
    const [aiResult, setAiResult] = useState('');
    const [choice, setChoice] = useState('')
    const [loading, setLoading] = useState(true)

    const chooseTruthOrDare = async (choice) => {
        setChoice(choice)
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

    const getAiResponse = async () => {
        try {
            console.log('choice', choice);
            if (choice !== null) {
                const response = await axios.get(`https://api.truthordarebot.xyz/api/${choice}`);
                console.log(response.data.question, 'truthAI');
                setAiResult(response.data.question);
            }
        }
        catch (error) {
            console.log('Error in AI:', error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.choose_button}>
            <span>Choose</span>
            <div>
                <button className={`${styles.button} ${styles.play}`} onClick={() => chooseTruthOrDare('truth')}>
                    <span>TRUTH</span>
                </button>

                <button className={`${styles.button} ${styles.play}`} onClick={() => chooseTruthOrDare('dare')}> 
                    <span>DARE</span> 
                </button>
            </div>
            {result && <div>
                <div className={styles.gen_ai}>{result}</div>
                <div className={styles.gen_ai} style={{paddingTop:'10px'}}>
                    <button style={{textAlign:'center', alignItems:'center', padding:'5px'}} onClick={() => getAiResponse()}>Generate from AI</button>
                </div>
                
            </div>}
            {loading ? <div className={styles.loader} style={{background:'white'}}/> : <div className={styles.gen_ai}>{aiResult}</div>}
        </div> 
    )
}

export default TruthOrDare;