import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Popper,
  Fade,
  IconButton
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';
import { ChartWithErrorBoundary } from '@/components/charts/ChartWrapper';
import { AnalyticsFilter, MentionData, GeographyMentionData, SourceData } from '@/types';

export const MentionAnalyticsScreen: React.FC = () => {
  const [filters, setFilters] = useState<AnalyticsFilter>({
    timeRange: '30days',
    model: 'all',
    persona: 'all',
    geography: 'all',
    intent: 'all'
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setShowFilters(!showFilters);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      timeRange: '30days',
      model: 'all',
      persona: 'all',
      geography: 'all',
      intent: 'all'
    });
  };

  const updateFilter = (key: keyof AnalyticsFilter, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Sample data - in a real app this would come from API
  const getTimeFilteredData = () => {
    const baseData = {
      '7days': {
        categories: ['Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30'],
        modelData: [70, 72, 74, 73, 75, 74, 75],
        personaData: [68, 70, 72, 71, 72, 71, 72]
      },
      '30days': {
        categories: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 30'],
        modelData: [62, 65, 68, 72, 75],
        personaData: [58, 62, 65, 68, 72]
      },
      '90days': {
        categories: ['Oct', 'Nov', 'Dec', 'Jan'],
        modelData: [55, 60, 68, 75],
        personaData: [50, 55, 65, 72]
      }
    };
    return baseData[filters.timeRange as keyof typeof baseData];
  };

  const timeData = getTimeFilteredData();

  // Chart configurations
  const modelChartOptions = {
    chart: {
      type: 'line',
      height: 250,
      toolbar: { show: false }
    },
    colors: ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'],
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    markers: {
      size: 4,
      colors: ['#6366f1'],
      strokeColors: '#fff',
      strokeWidth: 2
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: { 
        style: { fontSize: '10px', colors: '#94a3b8' },
        formatter: (val: number) => `${val}%`
      }
    },
    legend: {
      position: 'bottom' as const,
      fontSize: '11px'
    },
    grid: {
      borderColor: '#f1f5f9'
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light'
    }
  };

  const modelChartSeries = [
    {
      name: 'Brand Mentions',
      data: timeData.modelData
    }
  ];

  const personaChartOptions = {
    ...modelChartOptions,
    colors: ['#10b981', '#f59e0b', '#6366f1']
  };

  const personaChartSeries = [
    {
      name: 'Overall Persona Performance',
      data: timeData.personaData
    }
  ];

  // Sample data for tables
  const intentData: MentionData[] = [
    { intent: 'Product Comparison', mentions: 45, trend: '+5.2%', id: 'comparison' },
    { intent: 'Feature Inquiry', mentions: 62, trend: '+3.1%', id: 'feature' },
    { intent: 'Pricing Questions', mentions: 28, trend: '-1.2%', id: 'pricing' },
    { intent: 'Technical Support', mentions: 73, trend: '+8.4%', id: 'support' },
    { intent: 'Integration Help', mentions: 38, trend: '+2.6%', id: 'integration' }
  ];

  const geographyData: GeographyMentionData[] = [
    { region: 'North America', mentions: 52, trend: '+2.8%', id: 'na' },
    { region: 'Europe', mentions: 38, trend: '+1.5%', id: 'eu' },
    { region: 'Asia Pacific', mentions: 34, trend: '-0.8%', id: 'apac' },
    { region: 'Latin America', mentions: 28, trend: '+3.2%', id: 'latam' },
    { region: 'Middle East', mentions: 25, trend: '+1.1%', id: 'me' },
    { region: 'Africa', mentions: 22, trend: '+2.4%', id: 'africa' }
  ];

  const sourcesData: SourceData[] = [
    { source: 'AI Model Responses', mentions: 1247, percentage: 34 },
    { source: 'Industry Reports', mentions: 892, percentage: 24 },
    { source: 'Tech Forums', mentions: 567, percentage: 15 },
    { source: 'News Articles', mentions: 445, percentage: 12 }
  ];

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all' && value !== '30days').length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const getTrendIcon = (trend: string) => {
    const isPositive = trend.startsWith('+');
    return isPositive ? 
      <TrendingUpIcon fontSize="small" color="success" /> : 
      <TrendingDownIcon fontSize="small" color="error" />;
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'success.main' : 'error.main';
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ px: 3 }}>
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
              Mention Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track brand mentions across AI models and analyze mention frequency patterns
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={resetFilters}
              disabled={activeFiltersCount === 0}
            >
              Reset {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
              color={activeFiltersCount > 0 ? 'secondary' : 'primary'}
            >
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
            
            <Popper
              open={showFilters}
              anchorEl={anchorEl}
              placement="bottom-end"
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper sx={{ p: 3, mt: 1, minWidth: 320, zIndex: 10000, boxShadow: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Filters
                      </Typography>
                      <IconButton size="small" onClick={handleFilterClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Stack spacing={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Time Period</InputLabel>
                        <Select
                          value={filters.timeRange}
                          label="Time Period"
                          onChange={(e) => updateFilter('timeRange', e.target.value)}
                        >
                          <MenuItem value="7days">Last 7 Days</MenuItem>
                          <MenuItem value="30days">Last 30 Days</MenuItem>
                          <MenuItem value="90days">Last 90 Days</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth size="small">
                        <InputLabel>Model</InputLabel>
                        <Select
                          value={filters.model}
                          label="Model"
                          onChange={(e) => updateFilter('model', e.target.value)}
                        >
                          <MenuItem value="all">All Models</MenuItem>
                          <MenuItem value="gpt4">GPT-4</MenuItem>
                          <MenuItem value="claude">Claude</MenuItem>
                          <MenuItem value="gemini">Gemini</MenuItem>
                          <MenuItem value="llama">Llama</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth size="small">
                        <InputLabel>Persona</InputLabel>
                        <Select
                          value={filters.persona}
                          label="Persona"
                          onChange={(e) => updateFilter('persona', e.target.value)}
                        >
                          <MenuItem value="all">All Personas</MenuItem>
                          <MenuItem value="tech">Tech Enthusiast</MenuItem>
                          <MenuItem value="business">Business Executive</MenuItem>
                          <MenuItem value="developer">Developer</MenuItem>
                        </Select>
                      </FormControl>

                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={resetFilters}
                        disabled={activeFiltersCount === 0}
                      >
                        Clear All Filters
                      </Button>
                    </Stack>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Stack>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Model Performance Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 350 }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Mention % by AI Model
              </Typography>
              <Box sx={{ flex: 1 }}>
                <ChartWithErrorBoundary
                  options={modelChartOptions}
                  series={modelChartSeries}
                  type="line"
                  height="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Persona Performance Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 350 }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Mention % by Persona
              </Typography>
              <Box sx={{ flex: 1 }}>
                <ChartWithErrorBoundary
                  options={personaChartOptions}
                  series={personaChartSeries}
                  type="line"
                  height="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Intent Data Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Mentions by Intent Category
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Intent</TableCell>
                      <TableCell align="center">Mentions</TableCell>
                      <TableCell align="center">Trend</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {intentData.map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell sx={{ fontWeight: 500 }}>{item.intent}</TableCell>
                        <TableCell align="center">{item.mentions}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            {getTrendIcon(item.trend)}
                            <Typography 
                              variant="body2" 
                              sx={{ color: getTrendColor(item.trend), fontWeight: 500 }}
                            >
                              {item.trend}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Geography Data Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Mentions by Geography
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Region</TableCell>
                      <TableCell align="center">Mentions</TableCell>
                      <TableCell align="center">Trend</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {geographyData.map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell sx={{ fontWeight: 500 }}>{item.region}</TableCell>
                        <TableCell align="center">{item.mentions}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            {getTrendIcon(item.trend)}
                            <Typography 
                              variant="body2" 
                              sx={{ color: getTrendColor(item.trend), fontWeight: 500 }}
                            >
                              {item.trend}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Sources Overview */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Mention Sources Overview
              </Typography>
              <Grid container spacing={2}>
                {sourcesData.map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                        {item.source}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {item.mentions.toLocaleString()}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.percentage}
                        sx={{ height: 6, borderRadius: 1, mb: 0.5 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {item.percentage}% of total mentions
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};