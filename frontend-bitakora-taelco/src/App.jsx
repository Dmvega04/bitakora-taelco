import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import Dashboard from './pages/Dashboard';
import BitacoraList from './pages/Bitacoras/BitacoraList';
import ClienteList from './pages/Clientes/ClienteList';
import EquipoList from './pages/Equipos/EquipoList';
// ... otros imports
import MantenimientoCorrectivo from './pages/MantenimientoCorrectivo';
import MantenimientosPage from './pages/MantenimientosPage';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <Routes>
      {/* RUTA PÚBLICA */}
      <Route path="/login" element={<LoginPage />} />

      {/* RUTAS PROTEGIDAS + LAYOUT */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bitacoras" element={<BitacoraList />} />
          <Route path="/clientes" element={<ClienteList />} />
          <Route path="/equipos" element={<EquipoList/>}/>
          <Route path="/mantenimientos" element={<MantenimientosPage />} />
          <Route path="/correctivo" element={<MantenimientoCorrectivo />} />
          {/* 🔧 Aquí puedes agregar más rutas protegidas */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;


