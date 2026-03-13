import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Navbar({ onLogout }) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: '"Playfair Display", serif' }}>
          Antiquário Imperial
        </Typography>
        <Button color="inherit" onClick={onLogout} sx={{ border: '1px solid rgba(255,255,255,0.5)' }}>
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}