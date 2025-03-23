'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function GameDetail() {
  const [game, setGame] = useState(null);
  const [error, setError] = useState('');
  const params = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data } = await axios.get(`/api/games/${params.id}`);
        setGame(data.game);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      }
    };

    if (params.id) {
      fetchGame();
    }
  }, [params.id]);

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!game) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center">Game Details</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-medium">Mode</h2>
            <p className="mt-2 capitalize">{game.mode}</p>
          </div>

          <div>
            <h2 className="text-xl font-medium">Players</h2>
            <ul className="mt-2 list-disc list-inside">
              {game.players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-medium">Truths</h2>
            <ul className="mt-2 list-disc list-inside">
              {game.truths.map((truth, index) => (
                <li key={index}>{truth}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-medium">Dares</h2>
            <ul className="mt-2 list-disc list-inside">
              {game.dares.map((dare, index) => (
                <li key={index}>{dare}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}