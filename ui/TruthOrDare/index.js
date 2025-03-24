import { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const TruthOrDare = ({ lastResults = [], setLastResults = () => {} }) => {
    const [state, setState] = useState({
        result: '',
        aiResult: '',
        choice: '',
        loading: false,
        error: ''
    });

    const chooseTruthOrDare = async (choice) => {
        try {
            setState(prev => ({ ...prev, loading: true, choice, error: '' }));
            
            const response = await axios.get(`/api/${choice === 'truth' ? 'truths' : 'dares'}`);
            const data = response.data.data;
            
            // Ensure lastResults is an array and check for text property
            const filteredData = data.filter(item => 
                !Array.isArray(lastResults) || 
                !lastResults.some(result => result?.text === item.text)
            );
            
            if (filteredData.length === 0) {
                setState(prev => ({
                    ...prev,
                    result: "No more questions available. Please start a new game!",
                    loading: false
                }));
                return;
            }

            const randomIndex = Math.floor(Math.random() * filteredData.length);
            const newResult = filteredData[randomIndex];

            setState(prev => ({
                ...prev,
                result: newResult.text,
                loading: false
            }));

            // Ensure we're working with an array when updating lastResults
            setLastResults(prevResults => {
                const updatedResults = Array.isArray(prevResults) ? [...prevResults, newResult] : [newResult];
                return updatedResults.length > 8 ? updatedResults.slice(1) : updatedResults;
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: 'Failed to fetch question. Please try again.',
                loading: false
            }));
        }
    };

    const getAiResponse = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: '' }));
            
            if (!state.choice) {
                throw new Error('Please select Truth or Dare first');
            }

            const response = await axios.get(`https://api.truthordarebot.xyz/api/${state.choice}`);
            setState(prev => ({
                ...prev,
                aiResult: response.data.question,
                loading: false
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error.message || 'Failed to get AI response',
                loading: false
            }));
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Choose your move...</h3>
            
            <div className={styles.button_container}>
                <button 
                    className={`${styles.choice_button} ${state.choice === 'truth' ? styles.active : ''}`}
                    onClick={() => chooseTruthOrDare('truth')}
                    disabled={state.loading}
                >
                    TRUTH
                </button>

                <button 
                    className={`${styles.choice_button} ${state.choice === 'dare' ? styles.active : ''}`}
                    onClick={() => chooseTruthOrDare('dare')}
                    disabled={state.loading}
                >
                    DARE
                </button>
            </div>

            {state.error && (
                <div className={styles.error_message}>
                    {state.error}
                </div>
            )}

            {state.loading && (
                <div className={styles.loader_container}>
                    <div className={styles.loader} />
                </div>
            )}

            {state.result && !state.loading && (
                <div className={styles.result_container}>
                    <div className={styles.result_text}>{state.result}</div>
                    <button 
                        className={styles.ai_button}
                        onClick={getAiResponse}
                        disabled={state.loading}
                    >
                        Get AI Alternative
                    </button>
                </div>
            )}

            {state.aiResult && !state.loading && (
                <div className={styles.ai_result}>
                    <h4>{state.aiResult}</h4>
                </div>
            )}
        </div>
    );
};

export default TruthOrDare;
