"use client";
import styles from './styles.module.css'
import Toast from '../Toast';
import EnterTruthAndDare from '@/ui/EnterTruthAndDare' 
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SaheliControls = () => {
    const [truth, setTruth] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const toastRef = useRef(null);

    const fetchPlayers = async () => {
        try {
            const response = await axios.get('/api/truths');
            console.log('res', response.data.data);
            setTruth(response.data.data);
        } catch (error) {
            console.error('Error fetching players:', error);
        } finally {
            setLoading(false);
        }
        
    };

    const deleteTruths = async (itemId = '') => {
        try {
            await axios.delete('/api/truths', {data: { id: itemId }});
            toastRef.current.showToast('Truth deleted successfully!');
            fetchPlayers();
        } catch (error) {
            console.error('Failed to delete truth:', error);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return <div className={styles.main_container}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className={styles.title}>This is all you got in truths!!</div>
        <EnterTruthAndDare 
            showDare={false} 
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
        <p className={styles.modal_content}>Are you sure you want to delete this truth?</p>
        <button onClick={deleteTruths} className={styles.modal_body}>Confirm Delete</button>
        <button onClick={() => setShowConfirmationModal(false)} className={styles.modal_body}>Cancel</button>
        </div>
    )}
    </div>
}

export default SaheliControls