import { useRef } from "react";
import axios from "axios";
import styles from '@/ui/SaheliControls/styles.module.css'

const PopupModal = (itemId='') => {
    const toastRef = useRef(null);

    const deleteTruths = async (itemId = '') => {
        try {
            await axios.delete('/api/truths', {data: { id: itemId }});
            toastRef.current.showToast('Truth deleted successfully!');
            fetchPlayers();
        } catch (error) {
            console.error('Failed to delete truth:', error);
        }
    };

    return (
        <div className="popup">
        <p>Are you sure you want to delete this truth?</p>
        <button onClick={deleteTruths(itemId)} className={styles.button}>Confirm Delete</button>
        <button onClick={() => setShowConfirmationModal(false)} className={styles.button}>Cancel</button>
        </div>
    )
}
export default PopupModal