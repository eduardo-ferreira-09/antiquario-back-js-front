import { useState } from 'react';
import { Paper, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

// 1. Importamos a imagem que você colocou na pasta assets
import fundoImg from './assets/fundo.jpg'; 

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post('http://localhost:8080/api/login', { usuario, senha });
      if (resposta.data === true) {
        onLogin(); 
      } else {
        setErro(true); 
      }
    } catch (error) {
      console.error("Erro ao conectar", error);
      setErro(true);
    }
  };

  return (
    // 2. Trocamos o Container por uma Box que ocupa a tela inteira com a imagem
    <Box 
      sx={{ 
        display: 'flex', 
        height: '100vh', 
        width: '100vw',
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: `url(${fundoImg})`, // A mágica acontece aqui!
        backgroundSize: 'cover', // Faz a imagem cobrir a tela toda sem achatar
        backgroundPosition: 'center',
      }}
    >
      <Paper 
        elevation={10} 
        sx={{ 
          p: 4, 
          width: '100%', 
          maxWidth: 400, 
          borderRadius: 2, 
          borderTop: '6px solid #8b3a3a',
          backgroundColor: 'rgba(250, 240, 230, 0.95)' // Deixei o fundo do cartão levemente transparente!
        }}
      >
        <Typography variant="h5" align="center" gutterBottom color="primary" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold' }}>
          Antiquário Imperial
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 3, color: '#4e342e' }}>
          Acesso restrito a avaliadores
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            label="Usuário" 
            variant="outlined" 
            fullWidth 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <TextField 
            label="Senha" 
            type="password" 
            variant="outlined" 
            fullWidth 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
            Entrar
          </Button>
        </Box>
      </Paper>

      <Snackbar open={erro} autoHideDuration={4000} onClose={() => setErro(false)}>
        <Alert severity="error" variant="filled" onClose={() => setErro(false)}>
          Usuário ou senha incorretos!
        </Alert>
      </Snackbar>
    </Box>
  );
}