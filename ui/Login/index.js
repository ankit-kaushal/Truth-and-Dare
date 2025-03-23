'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import styles from './styles.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });
      
      await login(data.user);
      window.location.href = '/game';
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.form_panel}>
          <h2 className={styles.title}>Sign in to Your Account</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <div className={styles.form_options}>
              <label className={styles.remember_me}>
                <input type="checkbox" className={styles.input} /> Remember me
              </label>
              <Link href="/forgot-password" className={styles.forgot_password}>
                Forgot Password?
              </Link>
            </div>
            <div className={styles.submit_button_wrapper}>
              <button type="submit" className={styles.submit_button} loading={loading}>
                Sign In
              </button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
        <div className={styles.welcome_panel}>
          <h2 className={styles.welcome_title}>Welcome Back!</h2>
          <p className={styles.welcome_text}>
            Dont have an account yet? Join us now!
          </p>
          <Link href="/signup">
            <button className={styles.switch_button}>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;