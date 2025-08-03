import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Container,
  Stack,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { BrandData } from '@/types';

export const BrandBookScreen: React.FC = () => {
  const [brandData, setBrandData] = useState<BrandData>({
    brandName: 'Acme Corp',
    website: 'https://acmecorp.com',
    industry: 'Technology',
    description: 'We are a leading technology company focused on innovation and excellence.',
    longDescription: 'Acme Corp has been at the forefront of technological innovation for over two decades.',
    keyFeatures: [
      'Enterprise-grade security and compliance',
      'Scalable cloud infrastructure solutions'
    ]
  });

  const [newFeature, setNewFeature] = useState('');

  const handleInputChange = (field: keyof BrandData, value: string) => {
    setBrandData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addKeyFeature = () => {
    if (newFeature.trim()) {
      setBrandData(prev => ({
        ...prev,
        keyFeatures: [...prev.keyFeatures, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeKeyFeature = (index: number) => {
    setBrandData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
  };

  const handleSaveChanges = () => {
    // TODO: Implement save functionality
    console.log('Brand data saved:', brandData);
    // Here you would typically send the data to your backend
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Brand Book
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Define your brand identity and guidelines for AI representation
        </Typography>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={3}>
              <TextField
                label="Brand Name"
                value={brandData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
                placeholder="Your brand name"
                fullWidth
              />

              <TextField
                label="Website"
                value={brandData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourbrand.com"
                fullWidth
                type="url"
              />

              <TextField
                label="Industry"
                value={brandData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                placeholder="e.g., Technology, Healthcare"
                fullWidth
              />

              <TextField
                label="Description"
                value={brandData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of your brand..."
                multiline
                rows={3}
                fullWidth
              />

              <TextField
                label="Long Description"
                value={brandData.longDescription}
                onChange={(e) => handleInputChange('longDescription', e.target.value)}
                placeholder="Detailed description of your brand, mission, and values..."
                multiline
                rows={5}
                fullWidth
              />

              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                  Key Features
                </Typography>
                {brandData.keyFeatures.map((feature, index) => (
                  <Card key={index} variant="outlined" sx={{ p: 1.5, mb: 1, bgcolor: 'grey.50' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>{feature}</Typography>
                      <IconButton size="small" color="error" onClick={() => removeKeyFeature(index)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Card>
                ))}

                <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                  <TextField
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a key feature..."
                    size="small"
                    sx={{ flex: 1 }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addKeyFeature();
                      }
                    }}
                  />
                  <Button variant="contained" onClick={addKeyFeature} startIcon={<AddIcon />}>
                    Add
                  </Button>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button 
                  variant="contained" 
                  color="success" 
                  size="large"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};