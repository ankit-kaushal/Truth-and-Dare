"use client";
import styles from './styles.module.css'
import Toast from '../Toast';
import EnterTruthAndDare from '@/ui/EnterTruthAndDare' 
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SaheliControls2 = () => {
    const [truth, setTruth] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const toastRef = useRef(null);

    const fetchPlayers = async () => {
        try {
            const response = await axios.get('/api/dares');
            console.log('res', response.data.data);
            setTruth(response.data.data);
        } catch (error) {
            console.error('Error fetching dares:', error);
        } finally {
            setLoading(false);
        }
        
    };

    const deleteTruths = async (itemId = '') => {
        try {
            await axios.delete('/api/dares', {data: { id: itemId }});
            toastRef.current.showToast('Dares deleted successfully!');
            fetchPlayers();
        } catch (error) {
            console.error('Failed to delete dare:', error);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return <div className={styles.main_container}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className={styles.title}>This is all you got in dares!!</div>
        <EnterTruthAndDare 
            showTruth={false} 
            style={{height: '25vh', padding: '0', background: 'white'}}
            inner_style = {{height: '0'}}
        />
        <div className={styles.truth_list}>
        {truth.map((item)=>{
        return (
            <div key={item._id} className={styles.truth}>
                {item.text}
                <button className={styles.button} onClick={() => deleteTruths(item._id)}><i class="fa fa-trash"></i></button>
                {/* <button className={styles.button} onClick={() => deleteTruths(item._id)}>Remove Truth</button> */}
            </div>
            
        )
    })}</div>
    <Toast ref={toastRef} />
    {showConfirmationModal && (
        <div className={styles.modal_container}>
        <p className={styles.modal_content}>Are you sure you want to delete this dare?</p>
        <button onClick={deleteTruths} className={styles.modal_body}>Confirm Delete</button>
        <button onClick={() => setShowConfirmationModal(false)} className={styles.modal_body}>Cancel</button>
        </div>
    )}
    </div>
}

export default SaheliControls2