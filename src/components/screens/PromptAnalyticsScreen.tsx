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
  IconButton,
  LinearProgress
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
  Search as SearchIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';
import { ChartWithErrorBoundary } from '@/components/charts/ChartWrapper';
import { AnalyticsFilter } from '@/types';

export const PromptAnalyticsScreen: React.FC = () => {
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

  // Sample prompt analytics data
  const getTimeFilteredData = () => {
    const baseData = {
      '7days': {
        categories: ['Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30'],
        promptData: [45, 48, 52, 47, 55, 58, 62],
        responseRate: [78, 80, 85, 82, 88, 90, 92]
      },
      '30days': {
        categories: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 30'],
        promptData: [35, 42, 48, 55, 62],
        responseRate: [70, 75, 82, 88, 92]
      },
      '90days': {
        categories: ['Oct', 'Nov', 'Dec', 'Jan'],
        promptData: [25, 35, 48, 62],
        responseRate: [65, 72, 82, 92]
      }
    };
    return baseData[filters.timeRange as keyof typeof baseData];
  };

  const timeData = getTimeFilteredData();

  // Chart configurations
  const promptChartOptions = {
    chart: {
      type: 'line',
      height: 250,
      toolbar: { show: false }
    },
    colors: ['#6366f1', '#10b981'],
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    markers: {
      size: 4,
      strokeColors: '#fff',
      strokeWidth: 2
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: [
      {
        title: {
          text: 'Prompts Mentioning Brand',
          style: { fontSize: '12px', colors: '#94a3b8' }
        },
        labels: { 
          style: { fontSize: '10px', colors: '#94a3b8' }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Response Rate (%)',
          style: { fontSize: '12px', colors: '#94a3b8' }
        },
        labels: { 
          style: { fontSize: '10px', colors: '#94a3b8' },
          formatter: (val: number) => `${val}%`
        }
      }
    ],
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

  const promptChartSeries = [
    {
      name: 'Brand Mentions in Prompts',
      data: timeData.promptData,
      yAxisIndex: 0
    },
    {
      name: 'Response Rate',
      data: timeData.responseRate,
      yAxisIndex: 1
    }
  ];

  // Sample prompt categories data
  const promptCategories = [
    { category: 'Product Recommendations', mentions: 342, percentage: 28, trend: '+12%' },
    { category: 'Feature Comparisons', mentions: 298, percentage: 24, trend: '+8%' },
    { category: 'Technical Questions', mentions: 267, percentage: 22, trend: '+15%' },
    { category: 'Pricing Inquiries', mentions: 178, percentage: 15, trend: '+5%' },
    { category: 'User Reviews', mentions: 134, percentage: 11, trend: '+3%' }
  ];

  // Sample top prompts data
  const topPrompts = [
    { 
      prompt: 'What are the best project management tools for startups?', 
      mentions: 45, 
      responseRate: 92, 
      avgPosition: 2.1,
      category: 'Product Recommendations'
    },
    { 
      prompt: 'Compare enterprise collaboration platforms', 
      mentions: 38, 
      responseRate: 88, 
      avgPosition: 1.8,
      category: 'Feature Comparisons'
    },
    { 
      prompt: 'How to integrate project management with existing workflows?', 
      mentions: 32, 
      responseRate: 85, 
      avgPosition: 2.3,
      category: 'Technical Questions'
    },
    { 
      prompt: 'Cost-effective solutions for team productivity', 
      mentions: 28, 
      responseRate: 90, 
      avgPosition: 2.0,
      category: 'Pricing Inquiries'
    },
    { 
      prompt: 'User feedback on project management software', 
      mentions: 25, 
      responseRate: 87, 
      avgPosition: 2.5,
      category: 'User Reviews'
    }
  ];

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all' && value !== '30days').length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const getPositionColor = (position: number) => {
    if (position <= 2) return 'success.main';
    if (position <= 3) return 'warning.main';
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
              Prompt Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Analyze user prompts and brand mention patterns in AI conversations
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
        {/* Prompt Analytics Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 350 }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Prompt Analytics Trends
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                Brand mentions in user prompts and AI response rates
              </Typography>
              <Box sx={{ flex: 1 }}>
                <ChartWithErrorBoundary
                  options={promptChartOptions}
                  series={promptChartSeries}
                  type="line"
                  height="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Metrics */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 350 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Key Metrics
              </Typography>
              
              <Stack spacing={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                  <SearchIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    1,247
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Prompts This Month
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                  <PsychologyIcon sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main' }}>
                    89%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Response Rate
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 32, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    +23%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Growth vs Last Month
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Prompt Categories */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Prompt Categories
              </Typography>
              <Stack spacing={2}>
                {promptCategories.map((category, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {category.category}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {category.mentions}
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          {category.trend}
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={category.percentage}
                      sx={{ height: 6, borderRadius: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {category.percentage}% of total prompts
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Prompts Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Top Performing Prompts
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Prompt</TableCell>
                      <TableCell align="center">Mentions</TableCell>
                      <TableCell align="center">Response Rate</TableCell>
                      <TableCell align="center">Avg Position</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topPrompts.map((prompt, index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ maxWidth: 200 }}>
                          <Typography variant="body2" sx={{ fontSize: 11, fontWeight: 500 }}>
                            {prompt.prompt}
                          </Typography>
                          <Chip 
                            label={prompt.category} 
                            size="small" 
                            variant="outlined" 
                            sx={{ mt: 0.5, fontSize: 9 }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {prompt.mentions}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                            {prompt.responseRate}%
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 600,
                              color: getPositionColor(prompt.avgPosition)
                            }}
                          >
                            {prompt.avgPosition}
                          </Typography>
                        </TableCell>
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