'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import styles from './styles.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formattedData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password
    }

    try {
      const { data } = await axios.post('/api/auth/signup', formattedData);
      
      await login(data.user);
      window.location.href = '/game';
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${styles.responsive_wrapper}`}>
        <div className={styles.welcome_panel}>
          <h2 className={styles.welcome_title}>Welcome Back!</h2>
          <p className={styles.welcome_text}>
            Already have an account? Sign in here!
          </p>
          <Link href="/login">
            <button className={styles.switch_button}>Sign In</button>
          </Link>
        </div>
        <div className={styles.form_panel}>
          <h2 className={styles.title}>Create Your Account</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
            <div className={styles.submit_button_wrapper}>
              <button type="submit" className={styles.submit_button} loading={loading}>
                Sign Up
              </button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;