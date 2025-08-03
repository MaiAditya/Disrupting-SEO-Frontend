import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Container
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Competitor, CompetitorFormData } from '@/types';

export const CompetitorsScreen: React.FC = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { id: 1, name: 'TechCorp', domain: 'techcorp.com', url: 'https://techcorp.com' },
    { id: 2, name: 'InnovateX', domain: 'innovatex.io', url: 'https://innovatex.io' }
  ]);

  const [suggestions, setSuggestions] = useState<Competitor[]>([
    { id: 3, name: 'TechRival', domain: 'techrival.com', url: 'https://techrival.com' },
    { id: 4, name: 'NextGen Solutions', domain: 'nextgen.com', url: 'https://nextgen.com' },
    { id: 5, name: 'Innovation Labs', domain: 'innovlabs.net', url: 'https://innovlabs.net' }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCompetitor, setEditingCompetitor] = useState<Competitor | null>(null);
  const [formData, setFormData] = useState<CompetitorFormData>({ name: '', domain: '', url: '' });

  const handleAddCompetitor = () => {
    setEditingCompetitor(null);
    setFormData({ name: '', domain: '', url: '' });
    setDialogOpen(true);
  };

  const handleEditCompetitor = (competitor: Competitor) => {
    setEditingCompetitor(competitor);
    setFormData({ name: competitor.name, domain: competitor.domain, url: competitor.url });
    setDialogOpen(true);
  };

  const handleSaveCompetitor = () => {
    if (editingCompetitor) {
      // Editing existing competitor
      setCompetitors(prev => prev.map(comp =>
        comp.id === editingCompetitor.id
          ? { ...comp, ...formData }
          : comp
      ));
    } else {
      // Adding new competitor
      const newId = Math.max(...competitors.map(c => c.id), 0) + 1;
      setCompetitors(prev => [{ id: newId, ...formData }, ...prev]);
    }
    setDialogOpen(false);
    setFormData({ name: '', domain: '', url: '' });
  };

  const handleDeleteCompetitor = (id: number) => {
    setCompetitors(prev => prev.filter(comp => comp.id !== id));
  };

  const handleAddSuggestion = (suggestion: Competitor) => {
    const newId = Math.max(...competitors.map(c => c.id), 0) + 1;
    setCompetitors(prev => [{ ...suggestion, id: newId }, ...prev]);
    setSuggestions(prev => prev.filter(sug => sug.id !== suggestion.id));
  };

  const handleRemoveSuggestion = (id: number) => {
    setSuggestions(prev => prev.filter(sug => sug.id !== id));
  };

  const handleLoadMore = () => {
    // Simulate loading more suggestions
    const newSuggestions: Competitor[] = [
      { id: Date.now() + 1, name: 'CompetitorX', domain: 'competitorx.com', url: 'https://competitorx.com' },
      { id: Date.now() + 2, name: 'RivalTech', domain: 'rivaltech.io', url: 'https://rivaltech.io' }
    ];
    setSuggestions(prev => [...prev, ...newSuggestions]);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ mb: 3 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              Competitors List
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your competitors for GEO tracking and analysis
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddCompetitor}>
            Add Competitor
          </Button>
        </Box>
      </Box>

      <Box sx={{ width: '100%' }}>
        {/* Current Competitors */}
        <Card sx={{ mb: 4 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {competitors.map((competitor) => (
                  <TableRow key={competitor.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{competitor.name}</TableCell>
                    <TableCell>{competitor.domain}</TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        color="primary" 
                        sx={{ cursor: 'pointer' }}
                        component="a"
                        href={competitor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {competitor.url}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditCompetitor(competitor)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteCompetitor(competitor.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Suggested Additions */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Suggested Additions
        </Typography>
        <Card sx={{ mb: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {suggestions.map((suggestion) => (
                  <TableRow key={suggestion.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{suggestion.name}</TableCell>
                    <TableCell>{suggestion.domain}</TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        color="primary" 
                        sx={{ cursor: 'pointer' }}
                        component="a"
                        href={suggestion.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {suggestion.url}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => handleAddSuggestion(suggestion)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveSuggestion(suggestion.id)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Load More Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            sx={{ mb: 2 }}
          >
            Load More Competitors
          </Button>
        </Box>
      </Box>

      {/* Add/Edit Competitor Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCompetitor ? 'Edit Competitor' : 'Add New Competitor'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Domain"
              fullWidth
              value={formData.domain}
              onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
              sx={{ mb: 2 }}
              placeholder="example.com"
            />
            <TextField
              label="URL"
              fullWidth
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSaveCompetitor}
            variant="contained"
            disabled={!formData.name || !formData.domain || !formData.url}
          >
            {editingCompetitor ? 'Save Changes' : 'Add Competitor'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};