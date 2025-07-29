// frontend-bitakora-taelco/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { toast } from 'react-toastify';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(form);  // Capturamos el token devuelto
      if (token) {
        toast.success("Inicio de sesión exitoso");
        navigate("/"); // Redirige al dashboard o home
      } else {
        toast.error("No se recibió token de autenticación");
      }
    } catch (error) {
      toast.error("Credenciales inválidas o error en el servidor");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">

        {/* Logo TAELCO */}
        <img
          src="/logo-taelco.png"
          alt="Logo TAELCO"
          className="mx-auto mb-6 h-24"
        />

        <h1 className="text-2xl mb-6 font-bold">BITAKORA TAELCO</h1>
        <h2 className="text-2xl mb-6 font-bold">Iniciar sesión</h2>

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="w-full mb-4 p-3 border border-gray-300 rounded"
          onChange={handleChange}
          value={form.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-3 border border-gray-300 rounded"
          onChange={handleChange}
          value={form.password}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
