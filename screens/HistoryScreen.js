import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { getMatches, deleteMatch } from '../utils/storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HistoryScreen() {
  const [matches, setMatches] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadMatches();
    }, [])
  );

  const loadMatches = async () => {
    const matchList = await getMatches();
    setMatches(matchList);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMatches();
    setRefreshing(false);
  };

  const handleDelete = (matchId) => {
    Alert.alert(
      'Eliminar Partido',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteMatch(matchId);
            loadMatches();
          }
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const renderMatch = ({ item }) => {
    const whiteWon = item.whiteGoals > item.blackGoals;
    const blackWon = item.blackGoals > item.whiteGoals;
    const draw = item.whiteGoals === item.blackGoals;

    return (
      <View style={styles.matchCard}>
        <View style={styles.matchHeader}>
          <Text style={styles.matchDate}>{formatDate(item.date)}</Text>
          {item.hadAsado && (
            <View style={styles.asadoBadge}>
              <Text style={styles.asadoBadgeText}>🔥 Asado</Text>
            </View>
          )}
        </View>

        <View style={styles.scoreSection}>
          <View style={styles.teamScore}>
            <Text style={styles.teamLabel}>⚪ Blancos</Text>
            <Text style={[
              styles.goals,
              whiteWon && styles.winnerGoals
            ]}>
              {item.whiteGoals}
            </Text>
          </View>
          
          <Text style={styles.scoreDivider}>-</Text>
          
          <View style={styles.teamScore}>
            <Text style={styles.teamLabel}>⚫ Negros</Text>
            <Text style={[
              styles.goals,
              blackWon && styles.winnerGoals
            ]}>
              {item.blackGoals}
            </Text>
          </View>
        </View>

        {draw && (
          <View style={styles.resultBadge}>
            <Text style={styles.resultText}>Empate</Text>
          </View>
        )}

        <View style={styles.teamLists}>
          <View style={styles.teamList}>
            <Text style={styles.teamListTitle}>Blancos:</Text>
            {item.whiteTeam.map(player => (
              <Text key={player} style={styles.playerName}>• {player}</Text>
            ))}
          </View>

          <View style={styles.teamList}>
            <Text style={styles.teamListTitle}>Negros:</Text>
            {item.blackTeam.map(player => (
              <Text key={player} style={styles.playerName}>• {player}</Text>
            ))}
          </View>
        </View>

        {item.hadAsado && item.asador && (
          <View style={styles.asadorInfo}>
            <Text style={styles.asadorText}>👨‍🍳 Asador: {item.asador}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {matches.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>⚽</Text>
          <Text style={styles.emptyStateText}>No hay partidos registrados</Text>
          <Text style={styles.emptyStateSubtext}>¡Registra tu primer partido!</Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4CAF50"
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 10,
  },
  matchCard: {
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
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  matchDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  asadoBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  asadoBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  teamScore: {
    alignItems: 'center',
  },
  teamLabel: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
  },
  goals: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#666',
  },
  winnerGoals: {
    color: '#4CAF50',
  },
  scoreDivider: {
    fontSize: 32,
    color: '#ccc',
    fontWeight: 'bold',
  },
  resultBadge: {
    alignSelf: 'center',
    backgroundColor: '#FFC107',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  resultText: {
    color: 'white',
    fontWeight: '600',
  },
  teamLists: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 10,
  },
  teamList: {
    flex: 1,
  },
  teamListTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  playerName: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  asadorInfo: {
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  asadorText: {
    fontSize: 14,
    color: '#E65100',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
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
