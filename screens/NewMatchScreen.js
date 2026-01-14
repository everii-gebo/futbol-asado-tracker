import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  Modal,
} from 'react-native';
import { getPlayers, saveMatch, addPlayer } from '../utils/storage';

export default function NewMatchScreen({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [whiteTeam, setWhiteTeam] = useState([]);
  const [blackTeam, setBlackTeam] = useState([]);
  const [whiteGoals, setWhiteGoals] = useState('');
  const [blackGoals, setBlackGoals] = useState('');
  const [hadAsado, setHadAsado] = useState(false);
  const [asador, setAsador] = useState('');
  const [addPlayerModalVisible, setAddPlayerModalVisible] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const playerList = await getPlayers();
    setPlayers(playerList);
  };

  const togglePlayerSelection = (player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter(p => p !== player));
      setWhiteTeam(whiteTeam.filter(p => p !== player));
      setBlackTeam(blackTeam.filter(p => p !== player));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const assignToWhite = (player) => {
    if (blackTeam.includes(player)) {
      setBlackTeam(blackTeam.filter(p => p !== player));
    }
    if (!whiteTeam.includes(player)) {
      setWhiteTeam([...whiteTeam, player]);
    }
  };

  const assignToBlack = (player) => {
    if (whiteTeam.includes(player)) {
      setWhiteTeam(whiteTeam.filter(p => p !== player));
    }
    if (!blackTeam.includes(player)) {
      setBlackTeam([...blackTeam, player]);
    }
  };

  const handleSave = async () => {
    if (whiteTeam.length === 0 || blackTeam.length === 0) {
      Alert.alert('Error', 'Ambos equipos deben tener al menos un jugador');
      return;
    }

    if (whiteGoals === '' || blackGoals === '') {
      Alert.alert('Error', 'Ingresa los goles de ambos equipos');
      return;
    }

    try {
      await saveMatch({
        date: new Date().toISOString(),
        whiteTeam,
        blackTeam,
        whiteGoals: parseInt(whiteGoals),
        blackGoals: parseInt(blackGoals),
        hadAsado,
        asador: hadAsado ? asador : null,
      });

      Alert.alert('Éxito', 'Partido guardado!', [
        { text: 'OK', onPress: () => resetForm() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el partido');
    }
  };

  const resetForm = () => {
    setSelectedPlayers([]);
    setWhiteTeam([]);
    setBlackTeam([]);
    setWhiteGoals('');
    setBlackGoals('');
    setHadAsado(false);
    setAsador('');
  };

  const autoBalance = () => {
    if (selectedPlayers.length < 2) {
      Alert.alert('Error', 'Selecciona al menos 2 jugadores');
      return;
    }

    const shuffled = [...selectedPlayers].sort(() => Math.random() - 0.5);
    const mid = Math.floor(shuffled.length / 2);
    setWhiteTeam(shuffled.slice(0, mid));
    setBlackTeam(shuffled.slice(mid));
  };

  const handleQuickAddPlayer = async () => {
    const trimmedName = newPlayerName.trim();
    
    if (!trimmedName) {
      Alert.alert('Error', 'Ingresa un nombre válido');
      return;
    }

    if (players.includes(trimmedName)) {
      Alert.alert('Error', 'Este jugador ya existe');
      return;
    }

    try {
      await addPlayer(trimmedName);
      await loadPlayers();
      setNewPlayerName('');
      setAddPlayerModalVisible(false);
      Alert.alert('Éxito', `${trimmedName} agregado!`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el jugador');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>1. Seleccionar Jugadores</Text>
          <TouchableOpacity 
            style={styles.addPlayerButton} 
            onPress={() => setAddPlayerModalVisible(true)}
          >
            <Text style={styles.addPlayerButtonText}>+ Jugador</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.playerGrid}>
          {players.map(player => (
            <TouchableOpacity
              key={player}
              style={[
                styles.playerChip,
                selectedPlayers.includes(player) && styles.playerChipSelected
              ]}
              onPress={() => togglePlayerSelection(player)}
            >
              <Text style={[
                styles.playerChipText,
                selectedPlayers.includes(player) && styles.playerChipTextSelected
              ]}>
                {player}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedPlayers.length > 0 && (
        <>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>2. Armar Equipos</Text>
              <TouchableOpacity style={styles.autoButton} onPress={autoBalance}>
                <Text style={styles.autoButtonText}>Auto 🎲</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.teamsContainer}>
              <View style={styles.teamColumn}>
                <Text style={styles.teamTitle}>⚪ Blancos ({whiteTeam.length})</Text>
                {selectedPlayers.map(player => (
                  whiteTeam.includes(player) ? (
                    <View key={player} style={[styles.assignedPlayer, styles.whitePlayer]}>
                      <Text style={styles.assignedPlayerText}>{player}</Text>
                    </View>
                  ) : !blackTeam.includes(player) ? (
                    <TouchableOpacity
                      key={player}
                      style={styles.unassignedPlayer}
                      onPress={() => assignToWhite(player)}
                    >
                      <Text style={styles.unassignedPlayerText}>{player}</Text>
                    </TouchableOpacity>
                  ) : null
                ))}
              </View>

              <View style={styles.teamColumn}>
                <Text style={styles.teamTitle}>⚫ Negros ({blackTeam.length})</Text>
                {selectedPlayers.map(player => (
                  blackTeam.includes(player) ? (
                    <View key={player} style={[styles.assignedPlayer, styles.blackPlayer]}>
                      <Text style={styles.assignedPlayerText}>{player}</Text>
                    </View>
                  ) : !whiteTeam.includes(player) ? (
                    <TouchableOpacity
                      key={player}
                      style={styles.unassignedPlayer}
                      onPress={() => assignToBlack(player)}
                    >
                      <Text style={styles.unassignedPlayerText}>{player}</Text>
                    </TouchableOpacity>
                  ) : null
                ))}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Resultado</Text>
            <View style={styles.scoreContainer}>
              <View style={styles.scoreInput}>
                <Text style={styles.scoreLabel}>⚪ Blancos</Text>
                <TextInput
                  style={styles.scoreField}
                  value={whiteGoals}
                  onChangeText={setWhiteGoals}
                  keyboardType="numeric"
                  placeholder="0"
                />
              </View>
              <Text style={styles.scoreDivider}>-</Text>
              <View style={styles.scoreInput}>
                <Text style={styles.scoreLabel}>⚫ Negros</Text>
                <TextInput
                  style={styles.scoreField}
                  value={blackGoals}
                  onChangeText={setBlackGoals}
                  keyboardType="numeric"
                  placeholder="0"
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Asado</Text>
            <View style={styles.asadoRow}>
              <Text style={styles.asadoLabel}>¿Hubo asado?</Text>
              <Switch
                value={hadAsado}
                onValueChange={setHadAsado}
                trackColor={{ false: '#ccc', true: '#81C784' }}
                thumbColor={hadAsado ? '#4CAF50' : '#f4f3f4'}
              />
            </View>
            {hadAsado && (
              <View style={styles.asadorContainer}>
                <Text style={styles.asadorLabel}>Asador:</Text>
                <View style={styles.asadorPicker}>
                  {selectedPlayers.map(player => (
                    <TouchableOpacity
                      key={player}
                      style={[
                        styles.asadorOption,
                        asador === player && styles.asadorOptionSelected
                      ]}
                      onPress={() => setAsador(player)}
                    >
                      <Text style={[
                        styles.asadorOptionText,
                        asador === player && styles.asadorOptionTextSelected
                      ]}>
                        {player}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar Partido ✓</Text>
          </TouchableOpacity>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={addPlayerModalVisible}
        onRequestClose={() => setAddPlayerModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Nuevo Jugador</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Nombre del jugador"
              value={newPlayerName}
              onChangeText={setNewPlayerName}
              autoFocus
              autoCapitalize="words"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => {
                  setAddPlayerModalVisible(false);
                  setNewPlayerName('');
                }}
              >
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalSaveButton]}
                onPress={handleQuickAddPlayer}
              >
                <Text style={styles.modalSaveButtonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  addPlayerButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  addPlayerButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  playerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  playerChip: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
  },
  playerChipSelected: {
    backgroundColor: '#4CAF50',
  },
  playerChipText: {
    color: '#333',
    fontSize: 14,
  },
  playerChipTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  autoButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  autoButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  teamsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  teamColumn: {
    flex: 1,
  },
  teamTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  assignedPlayer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  whitePlayer: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  blackPlayer: {
    backgroundColor: '#424242',
  },
  assignedPlayerText: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
  },
  unassignedPlayer: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    opacity: 0.5,
  },
  unassignedPlayerText: {
    textAlign: 'center',
    color: '#666',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  scoreInput: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
  },
  scoreField: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 10,
    width: 80,
    height: 60,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreDivider: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#666',
  },
  asadoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  asadoLabel: {
    fontSize: 16,
  },
  asadorContainer: {
    marginTop: 15,
  },
  asadorLabel: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  asadorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  asadorOption: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  asadorOptionSelected: {
    backgroundColor: '#FF5722',
  },
  asadorOptionText: {
    color: '#333',
  },
  asadorOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    margin: 10,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalInput: {
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: '#e0e0e0',
  },
  modalCancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  modalSaveButton: {
    backgroundColor: '#2196F3',
  },
  modalSaveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
