import React, { useState } from 'react';
import axios from 'axios';

const PlayerInput = () => {
  const [name, setName] = useState('');

  const addPlayer = async () => {
    try {
      await axios.post('/api/players', { name });
      setName('');
    } catch (error) {
      console.error('Failed to add player:', error.response.data);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter player name"
      />
      <button onClick={addPlayer}>Add Player</button>
    </div>
  );
};

export default PlayerInput;
