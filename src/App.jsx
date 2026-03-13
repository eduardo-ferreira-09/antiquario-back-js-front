import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Login from './login';
import Navbar from './navbar';
import Listagem from './listagem';

export default function App() {
  const [isAutenticado, setIsAutenticado] = useState(false);

  // DESAFIO ADICIONAL: Mantém logado ao dar F5 na página
  useEffect(() => {
    const logado = localStorage.getItem('auth_antiquario');
    if (logado === 'true') {
      setIsAutenticado(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAutenticado(true);
    localStorage.setItem('auth_antiquario', 'true'); // Salva a sessão no navegador
  };

  const handleLogout = () => {
    setIsAutenticado(false);
    localStorage.removeItem('auth_antiquario'); // Apaga a sessão ao sair
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      
      {/* Controle de Fluxo: Se não estiver autenticado, mostra Login. Senão, mostra o Sistema. */}
      {!isAutenticado ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Navbar onLogout={handleLogout} />
          <Listagem />
        </>
      )}
    </ThemeProvider>
  );
}