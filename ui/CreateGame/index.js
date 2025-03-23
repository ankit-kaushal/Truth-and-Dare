'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './styles.module.css';

const CreateGame = () => {
  const [players, setPlayers] = useState(['', '']);
  const [truths, setTruths] = useState(['']);
  const [dares, setDares] = useState(['']);
  const [mode, setMode] = useState('basic');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const filteredPlayers = players.filter(player => player.trim() !== '');
      const filteredTruths = truths.filter(truth => truth.trim() !== '');
      const filteredDares = dares.filter(dare => dare.trim() !== '');

      if (filteredPlayers.length < 2) {
        throw new Error('At least 2 players are required');
      }

      const { data } = await axios.post('/api/games', {
        players: filteredPlayers,
        truths: filteredTruths,
        dares: filteredDares,
        mode
      });

      router.push(`/game/${data.game._id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create game');
    } finally {
      setLoading(false);
    }
  };

  const addField = (type) => {
    switch(type) {
      case 'player':
        setPlayers([...players, '']);
        break;
      case 'truth':
        setTruths([...truths, '']);
        break;
      case 'dare':
        setDares([...dares, '']);
        break;
    }
  };

  const handleFieldChange = (index, value, type) => {
    switch(type) {
      case 'player':
        const newPlayers = [...players];
        newPlayers[index] = value;
        setPlayers(newPlayers);
        break;
      case 'truth':
        const newTruths = [...truths];
        newTruths[index] = value;
        setTruths(newTruths);
        break;
      case 'dare':
        const newDares = [...dares];
        newDares[index] = value;
        setDares(newDares);
        break;
    }
  };

  const deleteField = (index, type) => {
    switch(type) {
      case 'player':
        if (players.length > 2) { // Prevent deletion if only 2 players remain
          setPlayers(players.filter((_, i) => i !== index));
        }
        break;
      case 'truth':
        setTruths(truths.filter((_, i) => i !== index));
        break;
      case 'dare':
        setDares(dares.filter((_, i) => i !== index));
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header_panel}>
          <h2 className={styles.title}>Create New Game</h2>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className={styles.mode_select}
          >
            <option value="basic">Basic Mode</option>
            <option value="adult">Adult Mode</option>
            <option value="violent">Violent Mode</option>
          </select>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <div className={styles.section_header}>
              <h2 className={styles.section_title}>Players (minimum 2)</h2>
              <button
                type="button"
                onClick={() => addField('player')}
                className={styles.add_button}
              >
                + Add Player
              </button>
            </div>
            <div className={styles.input_grid}>
              {players.map((player, index) => (
                <div key={`player-${index}`} className={styles.input_wrapper}>
                  <input
                    type="text"
                    value={player}
                    onChange={(e) => handleFieldChange(index, e.target.value, 'player')}
                    placeholder={`Player ${index + 1} name`}
                    className={styles.input_field}
                    required
                  />
                  {players.length > 2 && (
                    <button
                      type="button"
                      onClick={() => deleteField(index, 'player')}
                      className={styles.delete_button}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.section_header}>
              <h2 className={styles.section_title}>Truth Questions</h2>
              <button
                type="button"
                onClick={() => addField('truth')}
                className={styles.add_button}
              >
                + Add Truth
              </button>
            </div>
            <div className={styles.input_grid}>
              {truths.map((truth, index) => (
                <div key={`truth-${index}`} className={styles.input_wrapper}>
                  <input
                    type="text"
                    value={truth}
                    onChange={(e) => handleFieldChange(index, e.target.value, 'truth')}
                    placeholder="Enter truth question"
                    className={styles.input_field}
                  />
                  <button
                    type="button"
                    onClick={() => deleteField(index, 'truth')}
                    className={styles.delete_button}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.section_header}>
              <h2 className={styles.section_title}>Dare Challenges</h2>
              <button
                type="button"
                onClick={() => addField('dare')}
                className={styles.add_button}
              >
                + Add Dare
              </button>
            </div>
            <div className={styles.input_grid}>
              {dares.map((dare, index) => (
                <div key={`dare-${index}`} className={styles.input_wrapper}>
                  <input
                    type="text"
                    value={dare}
                    onChange={(e) => handleFieldChange(index, e.target.value, 'dare')}
                    placeholder="Enter dare challenge"
                    className={styles.input_field}
                  />
                  <button
                    type="button"
                    onClick={() => deleteField(index, 'dare')}
                    className={styles.delete_button}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submit_button}
            disabled={loading}
          >
            {loading ? 'Creating Game...' : 'Create Game'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;