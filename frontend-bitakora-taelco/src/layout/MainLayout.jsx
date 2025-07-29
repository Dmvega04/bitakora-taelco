// src/layout/MainLayout.jsx
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  ClipboardList,
  Users,
  HardDrive,
  UserCog,
  Wrench,
  FileBarChart2,
  LogOut,
} from 'lucide-react';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rol, setRol] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRol = localStorage.getItem('rol');
    setRol(userRol);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const linkClasses = "flex items-center gap-3 hover:bg-gray-700 p-2 rounded transition";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src="/logo-taelco-blanco.png" alt="Logo TAELCO" className="h-12 w-auto" />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">TAELCO Bitácoras</h2>

        {/* Menú de navegación */}
        <nav className="flex flex-col gap-1">
          <NavLink to="/" className={linkClasses} onClick={() => setSidebarOpen(false)}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </NavLink>

          <hr className="my-2 border-gray-700" />
          <p className="text-xs uppercase text-gray-400 px-2 mb-1">Gestión</p>

          <NavLink to="/bitacoras" className={linkClasses} onClick={() => setSidebarOpen(false)}>
            <ClipboardList className="w-5 h-5" /> Bitácoras
          </NavLink>
          <NavLink to="/clientes" className={linkClasses} onClick={() => setSidebarOpen(false)}>
            <Users className="w-5 h-5" /> Clientes
          </NavLink>
          <NavLink to="/equipos" className={linkClasses} onClick={() => setSidebarOpen(false)}>
            <HardDrive className="w-5 h-5" /> Equipos
          </NavLink>
          <NavLink to="/tecnicos" className={linkClasses} onClick={() => setSidebarOpen(false)}>
            <UserCog className="w-5 h-5" /> Técnicos
          </NavLink>

          <hr className="my-2 border-gray-700" />
          <p className="text-xs uppercase text-gray-400 px-2 mb-1">Mantenimientos</p>

          <NavLink to="/preventivo" className={linkClasses} onClick={() => setSidebarOpen(false)}>
            <Wrench className="w-5 h-5" /> Preventivo
          </NavLink>
          <NavLink to="/correctivo" className={linkClasses} onClick={() => setSidebarOpen(false)}>
            <Wrench className="w-5 h-5" /> Correctivo
          </NavLink>

          {rol === 'ADMIN' && (
            <>
              <hr className="my-2 border-gray-700" />
              <p className="text-xs uppercase text-gray-400 px-2 mb-1">Administración</p>

              <NavLink to="/reportes" className={linkClasses} onClick={() => setSidebarOpen(false)}>
                <FileBarChart2 className="w-5 h-5" /> Reportes
              </NavLink>
            </>
          )}

          <hr className="my-2 border-gray-700" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 p-2 rounded transition mt-2"
          >
            <LogOut className="w-5 h-5" /> Cerrar sesión
          </button>
        </nav>
      </aside>

      {/* Overlay oscuro móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header móvil */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between md:hidden">
          <button onClick={toggleSidebar}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <img src="/logo-taelco.png" alt="Logo TAELCO" className="h-10 w-auto" />
        </header>

        {/* Contenido dinámico */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
