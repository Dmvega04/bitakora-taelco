import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getClients } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClientesScreen = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    checkUserRole();
    loadClientes();
  }, []);

  const checkUserRole = async () => {
    const role = await AsyncStorage.getItem('userRole');
    setUserRole(role);
  };

  const loadClientes = async () => {
    try {
      const response = await getClients();
      setClientes(response.data || []);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const renderClienteItem = ({ item }) => (
    <View style={styles.clienteItem}>
      <Text style={styles.clienteName}>{item.nombre}</Text>
      <Text style={styles.clienteEmail}>{item.email}</Text>
      <Text style={styles.clienteDetails}>Tel: {item.telefono}</Text>
      <Text style={styles.clienteDetails}>RFC: {item.rfc}</Text>
      <Text style={styles.clienteDetails}>{item.direccion}</Text>
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
        data={clientes}
        renderItem={renderClienteItem}
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
  clienteItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  clienteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  clienteEmail: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 4,
  },
  clienteDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});

export default ClientesScreen; 