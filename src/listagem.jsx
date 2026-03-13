import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Box, Paper, CircularProgress, Grid, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Colunas da nossa tabela
const colunas = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'descricao', headerName: 'Descrição da Antiguidade', flex: 1, minWidth: 250 },
  { field: 'epoca', headerName: 'Época / Período', width: 200 },
  { 
    field: 'valorAvaliado', 
    headerName: 'Valor Avaliado', 
    width: 180,
    valueFormatter: (params) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(params.value);
    }
  },
];

export default function Listagem() {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  // Busca os dados assim que a tela abre
  useEffect(() => {
    axios.get('http://localhost:8080/api/itens')
      .then(resposta => {
        setItens(resposta.data);
        setCarregando(false); // Desliga a rodinha girando
      })
      .catch(erro => {
        console.error("Erro ao buscar itens", erro);
        setCarregando(false);
      });
  }, []);

  // Filtro de Busca
  const itensFiltrados = itens.filter(item => 
    item.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  // Cálculos para o Dashboard
  const totalItens = itens.length;
  const valorTotal = itens.reduce((acc, item) => acc + item.valorAvaliado, 0);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      
      {/* Desafio Adicional: Cards do Dashboard */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Card elevation={3} sx={{ borderLeft: '5px solid #5d4037' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <InventoryIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography color="textSecondary" variant="h6">Total em Acervo</Typography>
               <Typography variant="h4" sx={{ color: '#8b3a3a' }}>
  {totalItens} Peças
</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={3} sx={{ borderLeft: '5px solid #d4af37' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoneyIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
              <Box>
                <Typography color="textSecondary" variant="h6">Valor Total Avaliado</Typography>
                <Typography variant="h4" sx={{ color: '#8b3a3a' }}>
  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)}
                
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Área da Tabela e Busca */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
        <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold' }}>
          Catálogo de Antiguidades
        </Typography>
        <TextField
          placeholder="Buscar peça..."
          variant="outlined"
          size="small"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          sx={{ width: 300, bgcolor: 'white' }}
        />
      </Box>

      {/* Tabela com Efeito de Loading */}
      <Paper elevation={3} sx={{ height: 400, width: '100%', position: 'relative' }}>
        {carregando ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress color="primary" /> {/* Desafio: Loading */}
          </Box>
        ) : (
          <DataGrid
            rows={itensFiltrados}
            columns={colunas}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } }, // Desafio: 5 por página
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' }
            }}
          />
        )}
      </Paper>
    </Container>
  );
}