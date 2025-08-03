import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
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
  Container,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Grid,
  Checkbox,
  ListItemText
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { Persona, PersonaFormData, GuidelineCoverage } from '@/types';

export const PersonaScreen: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: 1,
      name: 'Tech Enthusiast',
      description: 'Early adopters who love cutting-edge technology and innovation',
      completeness: 85,
      geography: ['North America', 'Europe']
    },
    {
      id: 2,
      name: 'Business Executive',
      description: 'Decision makers looking for enterprise solutions',
      completeness: 70,
      geography: ['Global']
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const [formData, setFormData] = useState<PersonaFormData>({
    name: '',
    description: '',
    geography: []
  });

  const geographyOptions = [
    'All Geographies',
    'North America',
    'Europe',
    'Asia Pacific',
    'Latin America',
    'Middle East & Africa',
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Japan',
    'China',
    'India',
    'Australia',
    'Brazil'
  ];

  const demographicPoints = ['Age', 'Job Title', 'Gender', 'Married', 'Location', 'Education', 'Career Path'];
  const behavioralPoints = ['Goals', 'Pain Points', 'Personal Interests', 'Online Behavior', 'Preferred Contact Form'];

  const checkGuidelinesCoverage = (description: string): GuidelineCoverage[] => {
    const allPoints = [...demographicPoints, ...behavioralPoints];
    return allPoints.map(point => ({
      point,
      covered: description.toLowerCase().includes(point.toLowerCase()) ||
        description.toLowerCase().includes(point.replace(/\s+/g, '').toLowerCase())
    }));
  };

  const handleOpenDialog = (persona: Persona | null = null) => {
    setEditingPersona(persona);
    setFormData({
      name: persona?.name || '',
      description: persona?.description || '',
      geography: persona?.geography || []
    });
    setShowAddDialog(true);
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setEditingPersona(null);
    setFormData({ name: '', description: '', geography: [] });
  };

  const handleGeographyChange = (event: any) => {
    const value = event.target.value as string[];
    let newGeographies: string[];

    if (value.includes('All Geographies')) {
      // If "All Geographies" is selected, only keep that option
      newGeographies = ['All Geographies'];
    } else {
      // Filter out "All Geographies" if other options are selected
      newGeographies = value.filter(geo => geo !== 'All Geographies');
    }

    setFormData(prev => ({
      ...prev,
      geography: newGeographies
    }));
  };

  const handleSubmit = () => {
    if (editingPersona) {
      setPersonas(prev => prev.map(p =>
        p.id === editingPersona.id
          ? { ...p, ...formData, completeness: calculateCompleteness(formData.description) }
          : p
      ));
    } else {
      const newPersona: Persona = {
        id: Date.now(),
        ...formData,
        completeness: calculateCompleteness(formData.description)
      };
      setPersonas(prev => [...prev, newPersona]);
    }
    handleCloseDialog();
  };

  const calculateCompleteness = (description: string): number => {
    const coverage = checkGuidelinesCoverage(description);
    const coveredCount = coverage.filter(item => item.covered).length;
    return Math.round((coveredCount / coverage.length) * 100);
  };

  const handleDelete = (personaId: number) => {
    setPersonas(prev => prev.filter(p => p.id !== personaId));
  };

  const guidelinesCoverage = checkGuidelinesCoverage(formData.description);

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ mb: 4 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2
        }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              Target Personas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Define and manage your target audience personas
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
            Add Persona
          </Button>
        </Box>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Geography</TableCell>
                <TableCell>Completeness</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personas.map((persona) => (
                <TableRow key={persona.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{persona.name}</TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>{persona.description}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {persona.geography?.map((geo, index) => (
                        <Chip key={index} label={geo} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={persona.completeness}
                        sx={{ flex: 1, height: 6, borderRadius: 1 }}
                      />
                      <Typography variant="caption" sx={{ minWidth: 30 }}>
                        {persona.completeness}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(persona)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(persona.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Persona Dialog */}
      <Dialog open={showAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingPersona ? 'Edit Persona' : 'Add Persona'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              placeholder="e.g., Tech Enthusiast"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
            />

            <Box>
              <TextField
                label="Description"
                placeholder="Detailed description of this persona..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                multiline
                rows={4}
                fullWidth
              />

              {/* Guidelines Box */}
              <Card sx={{ mt: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.300' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Description Guidelines
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                    Ensure your description covers the following aspects:
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Demographic
                      </Typography>
                      {demographicPoints.map((point) => {
                        const coverage = guidelinesCoverage.find(g => g.point === point);
                        return (
                          <Box key={point} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            {coverage?.covered ? (
                              <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                            ) : (
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: 'grey.400' }} />
                            )}
                            <Typography variant="caption" color={coverage?.covered ? 'success.main' : 'text.secondary'}>
                              {point}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Behavioral
                      </Typography>
                      {behavioralPoints.map((point) => {
                        const coverage = guidelinesCoverage.find(g => g.point === point);
                        return (
                          <Box key={point} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            {coverage?.covered ? (
                              <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                            ) : (
                              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: 'grey.400' }} />
                            )}
                            <Typography variant="caption" color={coverage?.covered ? 'success.main' : 'text.secondary'}>
                              {point}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            {/* Geography Section */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Geography
              </Typography>

              <FormControl fullWidth>
                <InputLabel>Select Geographies</InputLabel>
                <Select
                  multiple
                  value={formData.geography}
                  onChange={handleGeographyChange}
                  label="Select Geographies"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {geographyOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox
                        checked={formData.geography.includes(option)}
                        sx={{ p: 0.5 }}
                      />
                      <ListItemText
                        primary={option}
                        sx={{
                          fontWeight: option === 'All Geographies' ? 600 : 400,
                          color: option === 'All Geographies' ? 'primary.main' : 'inherit'
                        }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {formData.geography.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Selected Geographies:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.geography.map((geo, index) => (
                      <Chip
                        key={index}
                        label={geo}
                        color={geo === 'All Geographies' ? 'primary' : 'default'}
                        variant={geo === 'All Geographies' ? 'filled' : 'outlined'}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!formData.name.trim() || !formData.description.trim()}
          >
            {editingPersona ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};