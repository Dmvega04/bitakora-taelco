import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const DashboardScreen = ({ navigation }) => {
  const stats = [
    { title: 'Equipos', count: '24', color: '#4CAF50' },
    { title: 'Mantenimientos', count: '12', color: '#2196F3' },
    { title: 'Pendientes', count: '5', color: '#FF9800' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado con logo */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo-taelco.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Mensaje de bienvenida */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Bienvenido a BITAKORA TAELCO</Text>
        <Text style={styles.welcomeText}>
          Sistema de gestión de mantenimiento y control de equipos. Aquí podrás:
        </Text>
        <View style={styles.featureList}>
          <Text style={styles.featureItem}>• Gestionar equipos y mantenimientos</Text>
          <Text style={styles.featureItem}>• Realizar seguimiento a las bitácoras</Text>
          <Text style={styles.featureItem}>• Administrar clientes y técnicos</Text>
        </View>
      </View>

      {/* Tarjetas de estadísticas */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <TouchableOpacity 
            key={index}
            style={[styles.statCard, { backgroundColor: stat.color }]}
          >
            <Text style={styles.statCount}>{stat.count}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sección de acciones rápidas */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('NuevoMantenimiento')}
        >
          <Text style={styles.actionButtonText}>Nuevo Mantenimiento</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('NuevoEquipo')}
        >
          <Text style={styles.actionButtonText}>Registrar Equipo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    width: 150,
    height: 50,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  featureList: {
    marginLeft: 10,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    flexWrap: 'wrap',
  },
  statCard: {
    width: '30%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statTitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  quickActions: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DashboardScreen; 