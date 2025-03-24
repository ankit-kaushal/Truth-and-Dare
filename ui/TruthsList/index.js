'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Modal from '../Modal';

const TruthsList = () => {
    const [truths, setTruths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newTruth, setNewTruth] = useState({ text: '', level: 'basic' });

    const fetchTruths = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/truths');
            setTruths(response.data.data);
        } catch (err) {
            setError('Failed to fetch truths');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTruths();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/truths', newTruth);
            setShowModal(false);
            setNewTruth({ text: '', level: 'basic' });
            fetchTruths();
        } catch (err) {
            setError('Failed to add truth');
        }
    };

    const filteredTruths = truths.filter(truth => 
        truth.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className={styles.loader}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    

    const handleDelete = async (id) => {
        try {
            await axios.delete('/api/truths', { data: { id } });
            fetchTruths();
        } catch (err) {
            setError('Failed to delete truth');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Truths Management</h1>
            </div>
            <div className={styles.filter_section}>
                <input
                    type="text"
                    placeholder="Search truths..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.search_input}
                />

                <button 
                    className={styles.add_button}
                    onClick={() => setShowModal(true)}
                >
                    Add New Truth
                </button>
                </div>
            <div className={styles.truths_list}>
                {filteredTruths.map(truth => (
                    <div key={truth._id} className={styles.truth_item}>
                        <p>{truth.text}</p>
                        <div className={styles.actions}>
                            {truth.level && <span className={styles.level_badge}>{truth.level}</span> }
                            <button 
                                onClick={() => handleDelete(truth._id)}
                                className={styles.delete_button}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Add New Truth"
            >
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.form_group}>
                        <label htmlFor="truth-text">Truth Text:</label>
                        <textarea
                            id="truth-text"
                            value={newTruth.text}
                            onChange={(e) => setNewTruth({...newTruth, text: e.target.value})}
                            required
                            className={styles.textarea}
                            rows="4"
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="truth-level">Level:</label>
                        <select
                            id="truth-level"
                            value={newTruth.level}
                            onChange={(e) => setNewTruth({...newTruth, level: e.target.value})}
                            className={styles.select}
                        >
                            <option value="basic">Basic</option>
                            <option value="adult">Adult</option>
                            <option value="violent">Violent</option>
                        </select>
                    </div>
                    <div className={styles.form_buttons}>
                        <button type="button" onClick={() => setShowModal(false)} className={styles.cancel_button}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submit_button}>
                            Add Truth
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default TruthsList;