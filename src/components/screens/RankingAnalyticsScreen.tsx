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
import { AnalyticsFilter } from '@/types';

export const RankingAnalyticsScreen: React.FC = () => {
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

  // Sample ranking data - lower numbers are better rankings
  const getTimeFilteredData = () => {
    const baseData = {
      '7days': {
        categories: ['Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30'],
        modelData: [2.1, 2.2, 2.0, 1.9, 1.8, 1.7, 1.6],
        personaData: [2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6]
      },
      '30days': {
        categories: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 30'],
        modelData: [2.8, 2.6, 2.4, 2.2, 2.1],
        personaData: [2.6, 2.4, 2.2, 2.0, 1.9]
      },
      '90days': {
        categories: ['Oct', 'Nov', 'Dec', 'Jan'],
        modelData: [3.2, 2.8, 2.4, 2.1],
        personaData: [3.0, 2.6, 2.2, 1.9]
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
      min: 1,
      max: 5,
      reversed: true, // Lower rank numbers are better
      labels: { 
        style: { fontSize: '10px', colors: '#94a3b8' },
        formatter: (val: number) => `Rank ${val.toFixed(1)}`
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
      theme: 'light',
      y: {
        formatter: (val: number) => `Rank ${val.toFixed(1)}`
      }
    }
  };

  const modelChartSeries = [
    {
      name: 'Average Ranking Position',
      data: timeData.modelData
    }
  ];

  const personaChartOptions = {
    ...modelChartOptions,
    colors: ['#10b981']
  };

  const personaChartSeries = [
    {
      name: 'Persona-Based Rankings',
      data: timeData.personaData
    }
  ];

  // Sample ranking data for tables
  const rankingData = [
    { query: 'Best project management software', currentRank: 2, previousRank: 3, trend: '+1', category: 'Product Comparison' },
    { query: 'Enterprise collaboration tools', currentRank: 1, previousRank: 1, trend: '0', category: 'Feature Inquiry' },
    { query: 'Team productivity platforms', currentRank: 3, previousRank: 2, trend: '-1', category: 'Product Comparison' },
    { query: 'Business workflow automation', currentRank: 2, previousRank: 4, trend: '+2', category: 'Technical Support' },
    { query: 'Cloud-based project tracking', currentRank: 1, previousRank: 2, trend: '+1', category: 'Integration Help' }
  ];

  const competitorRankings = [
    { competitor: 'TechCorp', averageRank: 2.1, change: '-0.3', queries: 45 },
    { competitor: 'InnovateX', averageRank: 2.8, change: '+0.1', queries: 38 },
    { competitor: 'NextGen Solutions', averageRank: 3.2, change: '-0.2', queries: 32 },
    { competitor: 'Innovation Labs', averageRank: 3.8, change: '+0.4', queries: 28 }
  ];

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all' && value !== '30days').length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const getTrendIcon = (trend: string) => {
    const num = parseInt(trend);
    if (num > 0) return <TrendingUpIcon fontSize="small" color="success" />;
    if (num < 0) return <TrendingDownIcon fontSize="small" color="error" />;
    return <Box sx={{ width: 20, height: 20 }} />;
  };

  const getTrendColor = (trend: string) => {
    const num = parseInt(trend);
    if (num > 0) return 'success.main';
    if (num < 0) return 'error.main';
    return 'text.secondary';
  };

  const getRankColor = (rank: number) => {
    if (rank <= 1.5) return 'success.main';
    if (rank <= 2.5) return 'warning.main';
    return 'error.main';
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
              Ranking Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor brand ranking positions across search queries and AI model responses
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
                Average Ranking Trends
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                Lower numbers indicate better rankings
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
                Ranking by Persona
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                Persona-specific ranking performance
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

        {/* Query Rankings Table */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Top Query Rankings
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Query</TableCell>
                      <TableCell align="center">Current Rank</TableCell>
                      <TableCell align="center">Change</TableCell>
                      <TableCell>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rankingData.map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ fontWeight: 500, maxWidth: 200 }}>{item.query}</TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={item.currentRank}
                            size="small"
                            sx={{ 
                              bgcolor: getRankColor(item.currentRank),
                              color: 'white',
                              fontWeight: 600
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            {getTrendIcon(item.trend)}
                            <Typography 
                              variant="body2" 
                              sx={{ color: getTrendColor(item.trend), fontWeight: 500 }}
                            >
                              {item.trend !== '0' ? item.trend : 'No change'}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={item.category} size="small" variant="outlined" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Competitor Rankings */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Competitor Rankings
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Competitor</TableCell>
                      <TableCell align="center">Avg Rank</TableCell>
                      <TableCell align="center">Change</TableCell>
                      <TableCell align="center">Queries</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {competitorRankings.map((item, index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ fontWeight: 500 }}>{item.competitor}</TableCell>
                        <TableCell align="center">
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: getRankColor(item.averageRank),
                              fontWeight: 600
                            }}
                          >
                            {item.averageRank}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: item.change.startsWith('+') ? 'error.main' : 'success.main',
                              fontWeight: 500
                            }}
                          >
                            {item.change}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{item.queries}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};