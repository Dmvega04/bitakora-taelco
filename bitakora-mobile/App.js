import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import EquiposScreen from './src/screens/EquiposScreen';
import ClientesScreen from './src/screens/ClientesScreen';
import TecnicosScreen from './src/screens/TecnicosScreen';
import MantenimientoScreen from './src/screens/MantenimientoScreen';
import RegistroClienteScreen from './src/screens/RegistroClienteScreen';
import RegistroEquipoScreen from './src/screens/RegistroEquipoScreen';
import GestionUsuariosScreen from './src/screens/GestionUsuariosScreen';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      setUserRole(role);
    };
    getUserRole();
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        drawerActiveBackgroundColor: '#007AFF',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          drawerLabel: 'Dashboard',
        }}
      />
      
      {/* Opciones para ADMIN */}
      {userRole === 'ADMIN' && (
        <>
          <Drawer.Screen 
            name="GestionUsuarios" 
            component={GestionUsuariosScreen}
            options={{
              title: 'Gestión de Usuarios',
              drawerLabel: 'Gestión de Usuarios',
            }}
          />
          <Drawer.Screen 
            name="RegistroCliente" 
            component={RegistroClienteScreen}
            options={{
              title: 'Registrar Cliente',
              drawerLabel: 'Registrar Cliente',
            }}
          />
          <Drawer.Screen 
            name="RegistroEquipo" 
            component={RegistroEquipoScreen}
            options={{
              title: 'Registrar Equipo',
              drawerLabel: 'Registrar Equipo',
            }}
          />
        </>
      )}

      {/* Opciones para ADMIN y TECNICO */}
      {(userRole === 'ADMIN' || userRole === 'TECNICO') && (
        <>
          <Drawer.Screen 
            name="MantenimientoPreventivo" 
            component={MantenimientoScreen}
            options={{
              title: 'Mantenimiento Preventivo',
              drawerLabel: 'Preventivo',
            }}
          />
          <Drawer.Screen 
            name="MantenimientoCorrectivo" 
            component={MantenimientoScreen}
            options={{
              title: 'Mantenimiento Correctivo',
              drawerLabel: 'Correctivo',
            }}
          />
        </>
      )}

      {/* Opciones para todos los roles */}
      <Drawer.Screen 
        name="Equipos" 
        component={EquiposScreen}
        options={{
          title: 'Equipos',
          drawerLabel: 'Equipos',
        }}
      />
      <Drawer.Screen 
        name="Bitacoras" 
        component={MantenimientoScreen}
        options={{
          title: 'Bitácoras',
          drawerLabel: 'Bitácoras',
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 