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
import { registerMaintenance, getEquipments } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MantenimientoScreen = ({ route }) => {
  const tipoMantenimiento = route.name === 'MantenimientoPreventivo' ? 'preventivo' : 'correctivo';

  const [formData, setFormData] = useState({
    equipoId: '',
    tipo: tipoMantenimiento,
    descripcion: '',
    observaciones: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'pendiente',
  });

  const [equipos, setEquipos] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    loadEquipos();
    getUserRole();
  }, []);

  const getUserRole = async () => {
    const role = await AsyncStorage.getItem('userRole');
    setUserRole(role);
  };

  const loadEquipos = async () => {
    try {
      const response = await getEquipments();
      setEquipos(response.data || []);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los equipos');
    }
  };

  const handleSubmit = async () => {
    if (!formData.equipoId) {
      Alert.alert('Error', 'Por favor seleccione un equipo');
      return;
    }

    try {
      const response = await registerMaintenance(formData);
      if (response.success) {
        Alert.alert('Éxito', 'Mantenimiento registrado correctamente');
        setFormData({
          ...formData,
          equipoId: '',
          descripcion: '',
          observaciones: '',
        });
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el mantenimiento');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Registro de Mantenimiento {tipoMantenimiento === 'preventivo' ? 'Preventivo' : 'Correctivo'}
      </Text>
      
      <View style={styles.form}>
        <Picker
          selectedValue={formData.equipoId}
          style={styles.picker}
          onValueChange={(itemValue) =>
            setFormData({...formData, equipoId: itemValue})
          }>
          <Picker.Item label="Seleccione un equipo" value="" />
          {equipos.map((equipo) => (
            <Picker.Item 
              key={equipo.id} 
              label={`${equipo.nombre} - ${equipo.modelo} (${equipo.cliente?.nombre || 'Sin cliente'})`}
              value={equipo.id} 
            />
          ))}
        </Picker>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descripción del mantenimiento"
          value={formData.descripcion}
          onChangeText={(text) => setFormData({...formData, descripcion: text})}
          multiline
          numberOfLines={4}
        />
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Observaciones"
          value={formData.observaciones}
          onChangeText={(text) => setFormData({...formData, observaciones: text})}
          multiline
          numberOfLines={4}
        />
        
        {(userRole === 'ADMIN' || userRole === 'TECNICO') && (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrar Mantenimiento</Text>
          </TouchableOpacity>
        )}
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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

export default MantenimientoScreen; 