'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { withAuth } from '@/components/withAuth';

function CreateGame() {
  const [players, setPlayers] = useState(['']);
  const [truths, setTruths] = useState(['']);
  const [dares, setDares] = useState(['']);
  const [mode, setMode] = useState('basic');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const filteredPlayers = players.filter(player => player.trim() !== '');
      const filteredTruths = truths.filter(truth => truth.trim() !== '');
      const filteredDares = dares.filter(dare => dare.trim() !== '');

      const { data } = await axios.post('/api/games', {
        players: filteredPlayers,
        truths: filteredTruths,
        dares: filteredDares,
        mode
      });
      
      router.push(`/game/${data.game._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-center">Create New Game</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-lg font-medium">Game Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="basic">Basic</option>
                <option value="adult">Adult</option>
                <option value="violent">Violent</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-medium">Players</label>
              {players.map((player, index) => (
                <input
                  key={`player-${index}`}
                  type="text"
                  value={player}
                  onChange={(e) => handleFieldChange(index, e.target.value, 'player')}
                  placeholder="Enter player name"
                  className="w-full px-3 py-2 border rounded-md"
                />
              ))}
              <button
                type="button"
                onClick={() => addField('player')}
                className="text-blue-600 hover:text-blue-800"
              >
                + Add Player
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-medium">Truths</label>
              {truths.map((truth, index) => (
                <input
                  key={`truth-${index}`}
                  type="text"
                  value={truth}
                  onChange={(e) => handleFieldChange(index, e.target.value, 'truth')}
                  placeholder="Enter truth question"
                  className="w-full px-3 py-2 border rounded-md"
                />
              ))}
              <button
                type="button"
                onClick={() => addField('truth')}
                className="text-blue-600 hover:text-blue-800"
              >
                + Add Truth
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-lg font-medium">Dares</label>
              {dares.map((dare, index) => (
                <input
                  key={`dare-${index}`}
                  type="text"
                  value={dare}
                  onChange={(e) => handleFieldChange(index, e.target.value, 'dare')}
                  placeholder="Enter dare challenge"
                  className="w-full px-3 py-2 border rounded-md"
                />
              ))}
              <button
                type="button"
                onClick={() => addField('dare')}
                className="text-blue-600 hover:text-blue-800"
              >
                + Add Dare
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Game
            </button>
          </form>
        </div>
      </div>
  );
}

export default withAuth(CreateGame);