import styles from './styles.module.css'
import { useState } from 'react';
import TruthOrDare from '../TruthOrDare';

const GameScreen = ({players=[]}) => {
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [lastResults, setLastResults] = useState([]);

    const spinBottle = () => {
        setSpinning(true);
        setRotation(rotation + 1620);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * players.length);
            setSelectedPlayer(players[randomIndex].name);
            setSpinning(false)
        }, 2000);
    };

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
                <TruthOrDare lastResults={lastResults} setLastResults={setLastResults} /> 
            : null}
        </div>
    )
}

export default GameScreen;