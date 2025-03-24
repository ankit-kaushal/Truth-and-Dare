'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const DaresList = () => {
    const [dares, setDares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newDare, setNewDare] = useState('');

    useEffect(() => {
        fetchDares();
    }, []);

    const fetchDares = async () => {
        try {
            const response = await axios.get('/api/dares');
            setDares(response.data.data);
        } catch (err) {
            setError('Failed to fetch dares');
        } finally {
            setLoading(false);
        }
    };

    const addDare = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/dares', { text: newDare });
            setNewDare('');
            fetchDares();
        } catch (err) {
            setError('Failed to add dare');
        }
    };

    const deleteDare = async (id) => {
        try {
            await axios.delete('/api/dares', { data: { id } });
            fetchDares();
        } catch (err) {
            setError('Failed to delete dare');
        }
    };

    if (loading) return <div className={styles.loader}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Dares Management</h1>
            
            <form onSubmit={addDare} className={styles.add_form}>
                <input
                    type="text"
                    value={newDare}
                    onChange={(e) => setNewDare(e.target.value)}
                    placeholder="Enter new dare challenge"
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.add_button}>
                    Add Dare
                </button>
            </form>

            <div className={styles.dares_list}>
                {dares.map(dare => (
                    <div key={dare._id} className={styles.dare_item}>
                        <p>{dare.text}</p>
                        <button 
                            onClick={() => deleteDare(dare._id)}
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

export default DaresList;