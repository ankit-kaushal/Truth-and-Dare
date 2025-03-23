import axios from 'axios';

const api = {
  auth: {
    login: async (credentials) => {
      const { data } = await axios.post('/api/auth/login', credentials);
      return data;
    },
    signup: async (userData) => {
      const { data } = await axios.post('/api/auth/signup', userData);
      return data;
    }
  },
  
  games: {
    create: async (gameData) => {
      const { data } = await axios.post('/api/games', gameData);
      return data;
    },
    getGame: async (gameId) => {
      const { data } = await axios.post(`/api/games/${gameId}`);
      return data;
    }
  }
};

export default api;