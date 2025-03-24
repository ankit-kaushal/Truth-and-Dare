import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import TruthOrDare from '../TruthOrDare';

const GameScreen = () => {
    const [gameState, setGameState] = useState({
        game: null,
        error: '',
        loading: true,
        selectedPlayer: '',
        previousPlayer: '',
        spinning: false,
        rotation: 0,
        lastResults: []
    });

    const params = useParams();

    const spinBottle = () => {
        setGameState(prev => ({
            ...prev,
            spinning: true,
            rotation: prev.rotation + 1620
        }));

        let currPlayers = gameState.game?.players;
        if (gameState.previousPlayer !== null) {
            currPlayers = gameState.game?.players.filter(item => item !== gameState.previousPlayer);
        }

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * currPlayers.length);
            setGameState(prev => ({
                ...prev,
                selectedPlayer: currPlayers[randomIndex],
                previousPlayer: currPlayers[randomIndex],
                spinning: false
            }));
        }, 2000);
    };

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const { data } = await axios.get(`/api/games/${params.id}`);
                setGameState(prev => ({
                    ...prev,
                    game: data.game,
                    loading: false,
                    error: ''
                }));
            } catch (err) {
                setGameState(prev => ({
                    ...prev,
                    error: err.response?.data?.message || 'Failed to load game',
                    loading: false
                }));
            }
        };

        if (params.id) {
            fetchGame();
        }
    }, [params.id]);

    if (gameState.loading) {
        return (
            <div className={styles.loader_container}>
                <div className={styles.spinner}></div>
                <p>Loading game...</p>
            </div>
        );
    }

    if (gameState.error) {
        return (
            <div className={styles.error_container}>
                <div className={styles.error_message}>
                    <h3>Oops! Something went wrong</h3>
                    <p>{gameState.error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className={styles.retry_button}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.game_container}>
            <div className={styles.title}>Spin the Bottle</div>
            <div className={styles.bottle_container}>
                <img 
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/356608/bottle.png" 
                    alt="Bottle" 
                    onClick={spinBottle}
                    style={{ transform: `rotate(${gameState.rotation}deg)` }}
                    className={styles.bottle_image}
                /> 
            </div>
            {gameState.rotation !== 0 && (
                <div className={styles.spin_result}>
                    <span>Now the turn is for: </span>
                    <span className={styles.player_name}>
                        {gameState.spinning ? (
                            <div className={styles.mini_loader} />
                        ) : (
                            gameState.selectedPlayer
                        )}
                    </span>
                </div>
            )}

            {gameState.rotation !== 0 && !gameState.spinning && (
                <TruthOrDare 
                    lastResults={gameState.lastResults} 
                    setLastResults={(results) => 
                        setGameState(prev => ({ ...prev, lastResults: results }))
                    } 
                    level={gameState.game?.mode}
                    dares={gameState.game?.dares}
                    truths={gameState.game?.truths}
                />
            )}
        </div>
    );
};

export default GameScreen;