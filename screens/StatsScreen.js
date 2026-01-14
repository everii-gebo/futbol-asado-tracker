import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { getPlayerStats } from '../utils/storage';
import { useFocusEffect } from '@react-navigation/native';

export default function StatsScreen() {
  const [stats, setStats] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('totalMatches'); // totalMatches, winRate

  useFocusEffect(
    React.useCallback(() => {
      loadStats();
    }, [])
  );

  const loadStats = async () => {
    const playerStats = await getPlayerStats();
    setStats(playerStats);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  const calculateWinRate = (player) => {
    const totalWins = player.whiteWins + player.blackWins;
    if (player.totalMatches === 0) return 0;
    return ((totalWins / player.totalMatches) * 100).toFixed(1);
  };

  const calculateTeamWinRate = (wins, matches) => {
    if (matches === 0) return '-';
    return ((wins / matches) * 100).toFixed(0) + '%';
  };

  const getSortedPlayers = () => {
    const players = Object.entries(stats);
    
    if (sortBy === 'totalMatches') {
      return players.sort((a, b) => b[1].totalMatches - a[1].totalMatches);
    } else if (sortBy === 'winRate') {
      return players.sort((a, b) => {
        const rateA = calculateWinRate(a[1]);
        const rateB = calculateWinRate(b[1]);
        return rateB - rateA;
      });
    }
    
    return players;
  };

  const renderPlayerCard = ([playerName, playerStats]) => {
    const winRate = calculateWinRate(playerStats);
    const whiteWinRate = calculateTeamWinRate(playerStats.whiteWins, playerStats.whiteMatches);
    const blackWinRate = calculateTeamWinRate(playerStats.blackWins, playerStats.blackMatches);

    return (
      <View key={playerName} style={styles.playerCard}>
        <View style={styles.playerHeader}>
          <Text style={styles.playerName}>{playerName}</Text>
          <View style={styles.winRateBadge}>
            <Text style={styles.winRateText}>{winRate}% victorias</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{playerStats.totalMatches}</Text>
            <Text style={styles.statLabel}>Partidos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {playerStats.whiteWins + playerStats.blackWins}
            </Text>
            <Text style={styles.statLabel}>Victorias</Text>
          </View>
        </View>

        <View style={styles.teamStats}>
          <View style={styles.teamStatColumn}>
            <Text style={styles.teamStatTitle}>⚪ Blancos</Text>
            <Text style={styles.teamStatDetail}>
              {playerStats.whiteMatches} partidos
            </Text>
            <Text style={styles.teamStatDetail}>
              {playerStats.whiteWins} victorias ({whiteWinRate})
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.teamStatColumn}>
            <Text style={styles.teamStatTitle}>⚫ Negros</Text>
            <Text style={styles.teamStatDetail}>
              {playerStats.blackMatches} partidos
            </Text>
            <Text style={styles.teamStatDetail}>
              {playerStats.blackWins} victorias ({blackWinRate})
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const sortedPlayers = getSortedPlayers();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#4CAF50"
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Estadísticas de Jugadores</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'totalMatches' && styles.sortButtonActive
            ]}
            onPress={() => setSortBy('totalMatches')}
          >
            <Text style={[
              styles.sortButtonText,
              sortBy === 'totalMatches' && styles.sortButtonTextActive
            ]}>
              Partidos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === 'winRate' && styles.sortButtonActive
            ]}
            onPress={() => setSortBy('winRate')}
          >
            <Text style={[
              styles.sortButtonText,
              sortBy === 'winRate' && styles.sortButtonTextActive
            ]}>
              % Victoria
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {sortedPlayers.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>📊</Text>
          <Text style={styles.emptyStateText}>No hay estadísticas todavía</Text>
          <Text style={styles.emptyStateSubtext}>¡Registra partidos para ver stats!</Text>
        </View>
      ) : (
        <View style={styles.cardsContainer}>
          {sortedPlayers.map(renderPlayerCard)}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  sortButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: '#4CAF50',
  },
  sortButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  sortButtonTextActive: {
    color: 'white',
  },
  cardsContainer: {
    padding: 10,
  },
  playerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  winRateBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  winRateText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  teamStats: {
    flexDirection: 'row',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  teamStatColumn: {
    flex: 1,
  },
  teamStatTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  teamStatDetail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  divider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 100,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
  },
});
