import styles from "./styles.module.css";

const MainScreen = ({ setGame = () => {}, players = {}, loading = false }) => {
  return (
    <div className={styles.main_container}>
      <div className={styles.title}>Welcome to the Game</div>
      {loading ? (
        <div className={styles.loader} />
      ) : (
        <>
          <div className={styles.players_list}>
            {players.map((item) => {
              return (
                <div key={item.id} className={styles.player_name}>
                  {item.name}
                </div>
              );
            })}
          </div>
          <div className={styles.button_container}>
            <button
              className={`${styles.button} ${styles.play}`}
              type="submit"
              onClick={() => setGame(true)}
            >
              <span>Lets Play</span>
              <span>Start Game</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MainScreen;
