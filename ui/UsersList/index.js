'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async (search = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/users?search=${search}`);
            setUsers(response.data.users);
            setError('');
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchUsers(searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleResetClick = (user) => {
        setSelectedUser(user);
        setNewPassword('');
        setShowModal(true);
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/users/${selectedUser._id}/reset-password`, {
                newPassword
            });
            setShowModal(false);
            setSelectedUser(null);
            setNewPassword('');
            alert('Password reset successful');
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to reset password');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Users Management</h1>
            
            <div className={styles.search_container}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users by name or email..."
                    className={styles.search_input}
                />
            </div>

            {loading ? (
                <div className={styles.loader}>Loading...</div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : (
                <div className={styles.users_grid}>
                    {users.length === 0 ? (
                        <div className={styles.no_results}>No users found</div>
                    ) : (
                        users.map(user => (
                            <div key={user._id} className={styles.user_card}>
                                <div className={styles.user_info}>
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                </div>
                                <button 
                                    onClick={() => handleResetClick(user)}
                                    className={styles.reset_button}
                                >
                                    Reset Password
                                </button>
                            </div>
                        ))
                    )}
                </div>
                )}

            {showModal && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal}>
                        <h3>Reset Password</h3>
                        <p>Enter new password for {selectedUser?.name}</p>
                        <form onSubmit={resetPassword}>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className={styles.search_input}
                                required
                                minLength={6}
                            />
                            <div className={styles.modal_buttons}>
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    className={styles.cancel_button}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className={styles.confirm_button}
                                >
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersList;