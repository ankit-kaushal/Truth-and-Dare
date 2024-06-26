import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SpinBottle() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await axios.get('/api/players');
      setPlayers(response.data.data);
    };
    fetchPlayers();
  }, []);

  const spinBottle = () => {
    const randomIndex = Math.floor(Math.random() * players.length);
    setSelectedPlayer(players[randomIndex].name);
  };

  return (
    <div>
      <button onClick={spinBottle}>Spin Bottle</button>
      {selectedPlayer && <p>{selectedPlayer}</p>}
    </div>
  );
}
