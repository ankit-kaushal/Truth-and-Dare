import styles from './styles.module.css'
import { useState } from 'react';

const GameScreen = ({players=[]}) => {
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    const spinBottle = () => {
        setSpinning(true);
        setRotation(rotation + 1620);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * players.length);
            setSelectedPlayer(players[randomIndex].name);
            setSpinning(false)
        }, 2000);
    };

    console.log("rotation",rotation);
    return (
        <div>
            <div className={styles.title}>Spin the Bottle</div>
            <div className={styles.bottle_container}>
                <img 
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/356608/bottle.png" 
                    alt="Bottle" 
                    onClick={spinBottle}
                    style={{ transform: `rotate(${rotation}deg)` }} 
                />
            </div>
            {rotation !==0 ? 
                <div className={styles.spin_result}>
                    <span>Now the turn is for: </span>
                    <span>
                        {spinning ? <div className={styles.loader} /> : selectedPlayer}
                    </span>
                </div> 
            : null}

            {rotation !==0 && !spinning ? 
                <div className={styles.choose_button}>
                    <span>Choose</span>
                    <div>
                        <button className={`${styles.button} ${styles.play}`}><span>TRUTH</span></button>
                        <button className={`${styles.button} ${styles.play}`}><span>DARE</span></button>
                    </div>
                </div> 
            : null}
        </div>
    )
}

export default GameScreen;