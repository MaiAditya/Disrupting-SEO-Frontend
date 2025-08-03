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
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Geography, GeographyFormData, GeographyStats } from '@/types';

export const GeographyScreen: React.FC = () => {
  const [geographyData, setGeographyData] = useState<Geography[]>([
    {
      id: 1,
      scale: 'Country',
      hierarchy: [
        { level: 'Region', value: 'North America' },
        { level: 'Country', value: 'United States' }
      ]
    },
    {
      id: 2,
      scale: 'State',
      hierarchy: [
        { level: 'Region', value: 'Europe' },
        { level: 'Country', value: 'Germany' },
        { level: 'State', value: 'Bavaria' }
      ]
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Geography | null>(null);
  const [formData, setFormData] = useState<GeographyFormData>({
    region: '',
    country: '',
    state: '',
    city: '',
    scale: 'Country'
  });

  const handleInputChange = (field: keyof GeographyFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddGeography = () => {
    setEditingItem(null);
    setFormData({
      region: '',
      country: '',
      state: '',
      city: '',
      scale: 'Country'
    });
    setShowAddDialog(true);
  };

  const handleEditGeography = (item: Geography) => {
    setEditingItem(item);

    // Extract values from hierarchy
    const hierarchyData: GeographyFormData = {
      region: '',
      country: '',
      state: '',
      city: '',
      scale: item.scale
    };

    item.hierarchy.forEach(h => {
      if (h.level === 'Region') hierarchyData.region = h.value;
      if (h.level === 'Country') hierarchyData.country = h.value;
      if (h.level === 'State') hierarchyData.state = h.value;
      if (h.level === 'City') hierarchyData.city = h.value;
    });

    setFormData(hierarchyData);
    setShowAddDialog(true);
  };

  const handleDeleteGeography = (id: number) => {
    setGeographyData(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveGeography = () => {
    // Build hierarchy based on form data
    const hierarchy = [];
    if (formData.region) hierarchy.push({ level: 'Region' as const, value: formData.region });
    if (formData.country) hierarchy.push({ level: 'Country' as const, value: formData.country });
    if (formData.state) hierarchy.push({ level: 'State' as const, value: formData.state });
    if (formData.city) hierarchy.push({ level: 'City' as const, value: formData.city });

    if (editingItem) {
      // Update existing item
      setGeographyData(prev => prev.map(item =>
        item.id === editingItem.id
          ? { ...item, scale: formData.scale, hierarchy }
          : item
      ));
    } else {
      // Add new item
      const newItem: Geography = {
        id: Math.max(...geographyData.map(item => item.id), 0) + 1,
        scale: formData.scale,
        hierarchy
      };
      setGeographyData(prev => [...prev, newItem]);
    }

    setShowAddDialog(false);
    setEditingItem(null);
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setEditingItem(null);
  };

  // Calculate stats
  const stats: GeographyStats = {
    regions: new Set(geographyData.flatMap(item =>
      item.hierarchy.filter(h => h.level === 'Region').map(h => h.value)
    )).size,
    countries: new Set(geographyData.flatMap(item =>
      item.hierarchy.filter(h => h.level === 'Country').map(h => h.value)
    )).size,
    states: new Set(geographyData.flatMap(item =>
      item.hierarchy.filter(h => h.level === 'State').map(h => h.value)
    )).size,
    cities: new Set(geographyData.flatMap(item =>
      item.hierarchy.filter(h => h.level === 'City').map(h => h.value)
    )).size
  };

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
              Geographic Targeting
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Configure regions and markets for brand tracking
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddGeography}>
            Add Geography
          </Button>
        </Box>
      </Box>

      <Box sx={{ width: '100%' }}>
        {/* Summary Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box sx={{ textAlign: 'center', flex: 1, minWidth: 100 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{stats.regions}</Typography>
                <Typography variant="body2" color="text.secondary">Regions</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', flex: 1, minWidth: 100 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{stats.countries}</Typography>
                <Typography variant="body2" color="text.secondary">Countries</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', flex: 1, minWidth: 100 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{stats.states}</Typography>
                <Typography variant="body2" color="text.secondary">States/Provinces</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', flex: 1, minWidth: 100 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{stats.cities}</Typography>
                <Typography variant="body2" color="text.secondary">Cities</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Geography Table */}
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Scale</TableCell>
                  <TableCell>Geographical Hierarchy</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {geographyData.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{row.scale}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        {row.hierarchy.map((item, index) => (
                          <React.Fragment key={item.level}>
                            <Typography variant="body2">{item.value}</Typography>
                            {index < row.hierarchy.length - 1 && (
                              <Typography variant="body2" color="text.secondary">→</Typography>
                            )}
                          </React.Fragment>
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditGeography(row)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteGeography(row.id)}
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
      </Box>

      {/* Add Geography Dialog */}
      <Dialog open={showAddDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? 'Edit Geography' : 'Add Geography'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Scale</InputLabel>
              <Select
                value={formData.scale}
                label="Scale"
                onChange={(e) => handleInputChange('scale', e.target.value as GeographyFormData['scale'])}
              >
                <MenuItem value="Global">Global</MenuItem>
                <MenuItem value="Region">Region</MenuItem>
                <MenuItem value="Country">Country</MenuItem>
                <MenuItem value="State">State</MenuItem>
                <MenuItem value="City">City</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Region"
              value={formData.region}
              onChange={(e) => handleInputChange('region', e.target.value)}
              placeholder="e.g., North America"
              disabled={formData.scale === 'Global'}
              fullWidth
            />

            <TextField
              label="Country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="e.g., United States"
              disabled={['Global', 'Region'].includes(formData.scale)}
              fullWidth
            />

            <TextField
              label="State/Province"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="e.g., California"
              disabled={['Global', 'Region', 'Country'].includes(formData.scale)}
              fullWidth
            />

            <TextField
              label="City"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="e.g., San Francisco"
              disabled={formData.scale !== 'City'}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveGeography}>
            {editingItem ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};