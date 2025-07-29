import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Picker,
} from 'react-native';
import { registerEquipment, getClients } from '../services/api';

const RegistroEquipoScreen = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    modelo: '',
    marca: '',
    numeroSerie: '',
    clienteId: '',
    ubicacion: '',
    descripcion: '',
  });

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const response = await getClients();
      setClientes(response.data || []);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los clientes');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await registerEquipment(formData);
      if (response.success) {
        Alert.alert('Éxito', 'Equipo registrado correctamente');
        setFormData({
          nombre: '',
          modelo: '',
          marca: '',
          numeroSerie: '',
          clienteId: '',
          ubicacion: '',
          descripcion: '',
        });
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el equipo');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registro de Equipo</Text>
      
      <View style={styles.form}>
        <Picker
          selectedValue={formData.clienteId}
          style={styles.picker}
          onValueChange={(itemValue) =>
            setFormData({...formData, clienteId: itemValue})
          }>
          <Picker.Item label="Seleccione un cliente" value="" />
          {clientes.map((cliente) => (
            <Picker.Item 
              key={cliente.id} 
              label={cliente.nombre} 
              value={cliente.id} 
            />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Nombre del equipo"
          value={formData.nombre}
          onChangeText={(text) => setFormData({...formData, nombre: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={formData.modelo}
          onChangeText={(text) => setFormData({...formData, modelo: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Marca"
          value={formData.marca}
          onChangeText={(text) => setFormData({...formData, marca: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Número de Serie"
          value={formData.numeroSerie}
          onChangeText={(text) => setFormData({...formData, numeroSerie: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChangeText={(text) => setFormData({...formData, ubicacion: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={formData.descripcion}
          onChangeText={(text) => setFormData({...formData, descripcion: text})}
          multiline
          numberOfLines={4}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar Equipo</Text>
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
  picker: {
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
    borderRadius: 10,
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

export default RegistroEquipoScreen; 