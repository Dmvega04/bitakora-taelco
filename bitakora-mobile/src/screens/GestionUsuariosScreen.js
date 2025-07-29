import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { getUsers, registerUser, deleteUser } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GestionUsuariosScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    role: 'TECNICO', // Por defecto
  });
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    checkUserRole();
    loadUsers();
  }, []);

  const checkUserRole = async () => {
    const role = await AsyncStorage.getItem('userRole');
    setUserRole(role);
    if (role !== 'ADMIN') {
      Alert.alert('Error', 'No tienes permisos para acceder a esta sección');
      navigation.goBack();
    }
  };

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data || []);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await registerUser(formData);
      if (response.success) {
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        setFormData({
          nombre: '',
          email: '',
          password: '',
          role: 'TECNICO',
        });
        loadUsers(); // Recargar la lista
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  const handleDeleteUser = async (userId) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres eliminar este usuario?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await deleteUser(userId);
              if (response.success) {
                Alert.alert('Éxito', 'Usuario eliminado correctamente');
                loadUsers(); // Recargar la lista
              }
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el usuario');
            }
          },
        },
      ]
    );
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.nombre}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRole}>{item.role}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteUser(item.id)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  if (userRole !== 'ADMIN') {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.title}>Registrar Nuevo Usuario</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={formData.nombre}
          onChangeText={(text) => setFormData({...formData, nombre: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry
        />
        
        <View style={styles.roleButtons}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              formData.role === 'ADMIN' && styles.roleButtonActive,
            ]}
            onPress={() => setFormData({...formData, role: 'ADMIN'})}
          >
            <Text style={[
              styles.roleButtonText,
              formData.role === 'ADMIN' && styles.roleButtonTextActive,
            ]}>Admin</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.roleButton,
              formData.role === 'TECNICO' && styles.roleButtonActive,
            ]}
            onPress={() => setFormData({...formData, role: 'TECNICO'})}
          >
            <Text style={[
              styles.roleButtonText,
              formData.role === 'TECNICO' && styles.roleButtonTextActive,
            ]}>Técnico</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.roleButton,
              formData.role === 'CLIENTE' && styles.roleButtonActive,
            ]}
            onPress={() => setFormData({...formData, role: 'CLIENTE'})}
          >
            <Text style={[
              styles.roleButtonText,
              formData.role === 'CLIENTE' && styles.roleButtonTextActive,
            ]}>Cliente</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar Usuario</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.listContainer}>
        <Text style={styles.subtitle}>Usuarios Registrados</Text>
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#007AFF',
  },
  roleButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  userRole: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default GestionUsuariosScreen; 