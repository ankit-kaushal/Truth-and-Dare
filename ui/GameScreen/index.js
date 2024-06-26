import styles from './styles.module.css'
import { useState } from 'react';

const GameScreen = ({players=[]}) => {
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [previousPlayer, setPreviousPlayer] = useState('');
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    const spinBottle = () => {
        setSpinning(true);
        setRotation(rotation + 1620);
        let currPlayers = players
        setTimeout(() => {
            if (previousPlayer !== null) {
                currPlayers = players.filter( item => item.name !== previousPlayer)
                console.log('prev', previousPlayer);
                console.log('curr1', currPlayers)
            }
            const randomIndex = Math.floor(Math.random() * currPlayers.length);
            setSelectedPlayer(currPlayers[randomIndex].name);
            setPreviousPlayer(currPlayers[randomIndex].name);
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
        </div>
    )
}

export default GameScreen;