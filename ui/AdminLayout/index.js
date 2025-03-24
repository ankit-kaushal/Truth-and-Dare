'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './styles.module.css';

const AdminLayout = ({ children, activePage }) => {
    const router = useRouter();
    const { logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navigationItems = [
        { id: 'users', label: 'Users', icon: '👥', path: '/admin/users' },
        { id: 'truths', label: 'Truths', icon: '💭', path: '/admin/truths' },
        { id: 'dares', label: 'Dares', icon: '🎯', path: '/admin/dares' }
    ];

    return (
        <div className={styles.admin_layout}>
            <nav className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.sidebar_header}>
                    <h2>{isCollapsed ? 'A' : 'Admin Panel'}</h2>
                    <button 
                        className={styles.collapse_btn}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? '→' : '←'}
                    </button>
                </div>

                <div className={styles.nav_items}>
                    {navigationItems.map(item => (
                        <button
                            key={item.id}
                            className={`${styles.nav_item} ${activePage === item.id ? styles.active : ''}`}
                            onClick={() => router.push(item.path)}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            {!isCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}
                </div>

                <button 
                    className={styles.logout_button}
                    onClick={logout}
                >
                   <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.logout_icon}
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </nav>

            <main className={styles.main_content}>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;