import styles from "./styles.module.css";
import { useState } from "react";
import TruthOrDare from "../TruthOrDare";

const SampleGameScreen = () => {
  const [gameState, setGameState] = useState({
    game: {
      players: ["Player 1", "Player 2", "Player 3", "Player 4"],
      mode: "basic",
      truths: [],
      dares: [],
    },
    error: "",
    loading: false,
    selectedPlayer: "",
    previousPlayer: "",
    spinning: false,
    rotation: 0,
    lastResults: [],
  });

  // Remove loading check since we have initial data
  const [activeDrawer, setActiveDrawer] = useState(null);

  const spinBottle = () => {
    setGameState((prev) => ({
      ...prev,
      spinning: true,
      rotation: prev.rotation + 1620,
    }));

    let currPlayers = gameState.game?.players;
    if (gameState.previousPlayer !== null) {
      currPlayers = gameState.game?.players.filter(
        (item) => item !== gameState.previousPlayer,
      );
    }

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * currPlayers.length);
      setGameState((prev) => ({
        ...prev,
        selectedPlayer: currPlayers[randomIndex],
        previousPlayer: currPlayers[randomIndex],
        spinning: false,
      }));
    }, 2000);
  };

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
    <div className={styles.game_screen}>
      <button
        className={`${styles.sidebar_toggle} ${styles.left_toggle}`}
        onClick={() => {
          if (activeDrawer === "players") {
            setActiveDrawer(null);
          } else {
            setActiveDrawer("players");
          }
        }}
      >
        {activeDrawer === "players" ? "✕" : "Players"}
      </button>
      <button
        className={`${styles.sidebar_toggle} ${styles.right_toggle}`}
        onClick={() => {
          if (activeDrawer === "rules") {
            setActiveDrawer(null);
          } else {
            setActiveDrawer("rules");
          }
        }}
      >
        {activeDrawer === "rules" ? "✕" : "Rules"}
      </button>

      <div
        className={`${styles.sidebar} ${styles.left_sidebar} ${activeDrawer === "players" ? styles.show : ""}`}
      >
        <div className={styles.sidebar_content}>
          <h3>Players</h3>
          <ul className={styles.players_list}>
            {gameState.game?.players.map((player, index) => (
              <li
                key={index}
                className={`${styles.player_item} ${player === gameState.selectedPlayer ? styles.active : ""}`}
              >
                {player}
              </li>
            ))}
          </ul>
        </div>
      </div>

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
              setGameState((prev) => ({ ...prev, lastResults: results }))
            }
            level={gameState.game?.mode}
            dares={gameState.game?.dares}
            truths={gameState.game?.truths}
          />
        )}
      </div>

      <div
        className={`${styles.sidebar} ${styles.right_sidebar} ${activeDrawer === "rules" ? styles.show : ""}`}
      >
        <div className={styles.sidebar_content}>
          <h3>How to Play</h3>
          <div className={styles.instructions}>
            <ol>
              <li>Click the bottle to spin</li>
              <li>Wait for it to stop on a player</li>
              <li>Player must choose Truth or Dare</li>
              <li>Complete the challenge or answer truthfully</li>
              <li>Next player&apos;s turn!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleGameScreen;
