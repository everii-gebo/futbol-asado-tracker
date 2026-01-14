import AsyncStorage from '@react-native-async-storage/async-storage';

const PLAYERS_KEY = '@players';
const MATCHES_KEY = '@matches';

// Default players from Excel
const DEFAULT_PLAYERS = [
  'Ger', 'Gaucho', 'Peter', 'Turfu', 'Alejo', 'Diego', 'Emi', 
  'Fabri', 'Gabo', 'Hernan', 'Monje', 'Juanfra', 'Pirlo', 
  'Turco', 'Miqueas', 'Nata', 'Yisus'
];

export const initializePlayers = async () => {
  try {
    const existing = await AsyncStorage.getItem(PLAYERS_KEY);
    if (!existing) {
      await AsyncStorage.setItem(PLAYERS_KEY, JSON.stringify(DEFAULT_PLAYERS));
      return DEFAULT_PLAYERS;
    }
    return JSON.parse(existing);
  } catch (error) {
    console.error('Error initializing players:', error);
    return DEFAULT_PLAYERS;
  }
};

export const getPlayers = async () => {
  try {
    const players = await AsyncStorage.getItem(PLAYERS_KEY);
    return players ? JSON.parse(players) : DEFAULT_PLAYERS;
  } catch (error) {
    console.error('Error getting players:', error);
    return DEFAULT_PLAYERS;
  }
};

export const addPlayer = async (playerName) => {
  try {
    const players = await getPlayers();
    if (!players.includes(playerName)) {
      players.push(playerName);
      await AsyncStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    }
    return players;
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
};

export const removePlayer = async (playerName) => {
  try {
    const players = await getPlayers();
    const filtered = players.filter(p => p !== playerName);
    await AsyncStorage.setItem(PLAYERS_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (error) {
    console.error('Error removing player:', error);
    throw error;
  }
};

export const getMatches = async () => {
  try {
    const matches = await AsyncStorage.getItem(MATCHES_KEY);
    return matches ? JSON.parse(matches) : [];
  } catch (error) {
    console.error('Error getting matches:', error);
    return [];
  }
};

export const saveMatch = async (matchData) => {
  try {
    const matches = await getMatches();
    const newMatch = {
      id: Date.now().toString(),
      date: matchData.date,
      whiteTeam: matchData.whiteTeam,
      blackTeam: matchData.blackTeam,
      whiteGoals: matchData.whiteGoals,
      blackGoals: matchData.blackGoals,
      hadAsado: matchData.hadAsado,
      asador: matchData.asador || null,
    };
    matches.unshift(newMatch);
    await AsyncStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
    return newMatch;
  } catch (error) {
    console.error('Error saving match:', error);
    throw error;
  }
};

export const deleteMatch = async (matchId) => {
  try {
    const matches = await getMatches();
    const filtered = matches.filter(m => m.id !== matchId);
    await AsyncStorage.setItem(MATCHES_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (error) {
    console.error('Error deleting match:', error);
    throw error;
  }
};

export const getPlayerStats = async () => {
  try {
    const matches = await getMatches();
    const players = await getPlayers();
    
    const stats = {};
    players.forEach(player => {
      stats[player] = {
        totalMatches: 0,
        whiteMatches: 0,
        whiteWins: 0,
        blackMatches: 0,
        blackWins: 0,
      };
    });

    matches.forEach(match => {
      const whiteWon = match.whiteGoals > match.blackGoals;
      const blackWon = match.blackGoals > match.whiteGoals;

      match.whiteTeam.forEach(player => {
        if (stats[player]) {
          stats[player].totalMatches++;
          stats[player].whiteMatches++;
          if (whiteWon) stats[player].whiteWins++;
        }
      });

      match.blackTeam.forEach(player => {
        if (stats[player]) {
          stats[player].totalMatches++;
          stats[player].blackMatches++;
          if (blackWon) stats[player].blackWins++;
        }
      });
    });

    return stats;
  } catch (error) {
    console.error('Error getting player stats:', error);
    return {};
  }
};
