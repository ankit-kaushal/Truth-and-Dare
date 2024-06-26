"use client";

import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import MainScreen from './MainScreen';
import GameScreen from './GameScreen';
import axios from 'axios';

const TruthAndDare = () => {
    const [game, setGame] = useState(false);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
          const response = await axios.get('/api/players');
          setPlayers(response.data.data);
        };
        fetchPlayers();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {game ? <GameScreen players={players} />
            :      <MainScreen
                        setGame={setGame}
                        players={players}
                    /> 
            }
        </div>
    )
}

export default TruthAndDare;