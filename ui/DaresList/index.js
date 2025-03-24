'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Modal from '../Modal';

const DaresList = () => {
    const [dares, setDares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newDare, setNewDare] = useState({ text: '', level: 'basic' });    

    const fetchDares = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/dares');
            setDares(response.data.data);
        } catch (err) {
            setError('Failed to fetch dares');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDares();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/dares', newDare);
            setShowModal(false);
            setNewDare({ text: '', level: 'basic' });
            fetchDares();
        } catch (err) {
            setError('Failed to add dare');
        }
    };

    const filteredDares = dares.filter(dare => 
        dare.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className={styles.loader}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    

    const handleDelete = async (id) => {
        try {
            await axios.delete('/api/dares', { data: { id } });
            fetchDares();
        } catch (err) {
            setError('Failed to delete dare');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Dares Management</h1>
            </div>
            <div className={styles.filter_section}>
                <input
                    type="text"
                    placeholder="Search dares..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.search_input}
                />

                <button 
                    className={styles.add_button}
                    onClick={() => setShowModal(true)}
                >
                    Add New Dare
                </button>
                </div>
            <div className={styles.dares_list}>
                {filteredDares.map(dare => (
                    <div key={dare._id} className={styles.dare_item}>
                        <p>{dare.text}</p>
                        <div className={styles.actions}>
                            {dare.level && <span className={styles.level_badge}>{dare.level}</span> }
                            <button 
                                onClick={() => handleDelete(dare._id)}
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
                title="Add New Dare"
            >
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.form_group}>
                        <label htmlFor="dare-text">Dare Text:</label>
                        <textarea
                            id="dare-text"
                            value={newDare.text}
                            onChange={(e) => setNewDare({...newDare, text: e.target.value})}
                            required
                            className={styles.textarea}
                            rows="4"
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="dare-level">Level:</label>
                        <select
                            id="dare-level"
                            value={newDare.level}
                            onChange={(e) => setNewDare({...newDare, level: e.target.value})}
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
                            Add Dare
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DaresList;