'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import styles from './styles.module.css';
import Modal from '@/ui/Modal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      <Modal title="Forgot Password?" isOpen={showModal} onClose={() => setShowModal(false)}>
        <p>Please contact admin for password reset</p>
        <a 
          href="https://wa.me/916207994778?text=Help%20me%20I%20forgot%20my%20password"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsapp_link}
        >
          <svg 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            fill="white"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Contact on WhatsApp
        </a>
      </Modal>

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
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <div className={styles.form_options}>
              <label className={styles.remember_me}>
                <input type="checkbox" className={styles.input} /> Remember me
              </label>
              <button 
                type="button"
                onClick={() => setShowModal(true)}
                className={styles.forgot_password}
              >
                Forgot Password?
              </button>
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