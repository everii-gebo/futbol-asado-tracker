import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

import NewMatchScreen from './screens/NewMatchScreen';
import HistoryScreen from './screens/HistoryScreen';
import StatsScreen from './screens/StatsScreen';
import PlayersScreen from './screens/PlayersScreen';
import { initializePlayers } from './utils/storage';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    initializePlayers();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#2E7D32',
            tabBarInactiveTintColor: '#666',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Tab.Screen 
            name="NewMatch" 
            component={NewMatchScreen}
            options={{
              title: 'Nuevo Partido',
              tabBarLabel: 'Partido',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>⚽</Text>,
            }}
          />
          <Tab.Screen 
            name="History" 
            component={HistoryScreen}
            options={{
              title: 'Historial',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📋</Text>,
            }}
          />
          <Tab.Screen 
            name="Stats" 
            component={StatsScreen}
            options={{
              title: 'Estadísticas',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📊</Text>,
            }}
          />
          <Tab.Screen 
            name="Players" 
            component={PlayersScreen}
            options={{
              title: 'Jugadores',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>👥</Text>,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
