import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getUsers } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TecnicosScreen = () => {
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTecnicos();
  }, []);

  const loadTecnicos = async () => {
    try {
      const response = await getUsers();
      // Filtrar solo los usuarios con rol TECNICO
      const tecnicosList = (response.data || []).filter(user => user.role === 'TECNICO');
      setTecnicos(tecnicosList);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los técnicos');
    } finally {
      setLoading(false);
    }
  };

  const renderTecnicoItem = ({ item }) => (
    <View style={styles.tecnicoItem}>
      <Text style={styles.tecnicoName}>{item.nombre}</Text>
      <Text style={styles.tecnicoEmail}>{item.email}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tecnicos}
        renderItem={renderTecnicoItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  tecnicoItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  tecnicoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tecnicoEmail: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default TecnicosScreen; 