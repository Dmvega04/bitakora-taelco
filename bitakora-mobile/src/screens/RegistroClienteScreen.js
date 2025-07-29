import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { registerClient } from '../services/api';

const RegistroClienteScreen = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    rfc: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await registerClient(formData);
      if (response.success) {
        Alert.alert('Éxito', 'Cliente registrado correctamente');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          direccion: '',
          rfc: '',
        });
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el cliente');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registro de Cliente</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del cliente"
          value={formData.nombre}
          onChangeText={(text) => setFormData({...formData, nombre: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={formData.telefono}
          onChangeText={(text) => setFormData({...formData, telefono: text})}
          keyboardType="phone-pad"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={formData.direccion}
          onChangeText={(text) => setFormData({...formData, direccion: text})}
          multiline
        />
        
        <TextInput
          style={styles.input}
          placeholder="RFC"
          value={formData.rfc}
          onChangeText={(text) => setFormData({...formData, rfc: text})}
          autoCapitalize="characters"
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar Cliente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegistroClienteScreen; 