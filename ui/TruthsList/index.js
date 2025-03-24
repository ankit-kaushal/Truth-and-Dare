'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const TruthsList = () => {
    const [truths, setTruths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newTruth, setNewTruth] = useState('');

    useEffect(() => {
        fetchTruths();
    }, []);

    const fetchTruths = async () => {
        try {
            const response = await axios.get('/api/truths');
            setTruths(response.data.data);
        } catch (err) {
            setError('Failed to fetch truths');
        } finally {
            setLoading(false);
        }
    };

    const addTruth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/truths', { text: newTruth });
            setNewTruth('');
            fetchTruths();
        } catch (err) {
            setError('Failed to add truth');
        }
    };

    const deleteTruth = async (id) => {
        try {
            await axios.delete('/api/truths', { data: { id } });
            fetchTruths();
        } catch (err) {
            setError('Failed to delete truth');
        }
    };

    if (loading) return <div className={styles.loader}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Truths Management</h1>
            
            <form onSubmit={addTruth} className={styles.add_form}>
                <input
                    type="text"
                    value={newTruth}
                    onChange={(e) => setNewTruth(e.target.value)}
                    placeholder="Enter new truth question"
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.add_button}>
                    Add Truth
                </button>
            </form>

            <div className={styles.truths_list}>
                {truths.map(truth => (
                    <div key={truth._id} className={styles.truth_item}>
                        <p>{truth.text}</p>
                        <button 
                            onClick={() => deleteTruth(truth._id)}
                            className={styles.delete_button}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TruthsList;