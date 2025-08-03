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
  LinearProgress,
  Avatar,
  Link
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Link as LinkIcon,
  OpenInNew as OpenInNewIcon,
  Article as ArticleIcon,
  Business as BusinessIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { ChartWithErrorBoundary } from '@/components/charts/ChartWrapper';
import { AnalyticsFilter } from '@/types';

export const CitationAnalyticsScreen: React.FC = () => {
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

  // Sample citation data
  const getTimeFilteredData = () => {
    const baseData = {
      '7days': {
        categories: ['Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30'],
        citationData: [23, 25, 28, 24, 30, 32, 35],
        sourceQuality: [85, 87, 89, 86, 90, 92, 94]
      },
      '30days': {
        categories: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 30'],
        citationData: [18, 22, 26, 30, 35],
        sourceQuality: [80, 84, 87, 90, 94]
      },
      '90days': {
        categories: ['Oct', 'Nov', 'Dec', 'Jan'],
        citationData: [12, 18, 26, 35],
        sourceQuality: [75, 82, 87, 94]
      }
    };
    return baseData[filters.timeRange as keyof typeof baseData];
  };

  const timeData = getTimeFilteredData();

  // Chart configurations
  const citationChartOptions = {
    chart: {
      type: 'area',
      height: 250,
      toolbar: { show: false }
    },
    colors: ['#6366f1', '#10b981'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
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
          text: 'Citations Count',
          style: { fontSize: '12px', colors: '#94a3b8' }
        },
        labels: { 
          style: { fontSize: '10px', colors: '#94a3b8' }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Quality Score',
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

  const citationChartSeries = [
    {
      name: 'Citations Count',
      data: timeData.citationData,
      yAxisIndex: 0
    },
    {
      name: 'Source Quality Score',
      data: timeData.sourceQuality,
      yAxisIndex: 1
    }
  ];

  // Sample top sources data
  const topSources = [
    {
      name: 'Wikipedia',
      url: 'wikipedia.org',
      citations: 156,
      quality: 95,
      type: 'encyclopedia',
      trend: '+12%'
    },
    {
      name: 'Company Website',
      url: 'acmecorp.com',
      citations: 142,
      quality: 98,
      type: 'official',
      trend: '+8%'
    },
    {
      name: 'TechCrunch',
      url: 'techcrunch.com',
      citations: 89,
      quality: 88,
      type: 'news',
      trend: '+15%'
    },
    {
      name: 'Forbes',
      url: 'forbes.com',
      citations: 67,
      quality: 92,
      type: 'business',
      trend: '+5%'
    },
    {
      name: 'MIT Technology Review',
      url: 'technologyreview.com',
      citations: 54,
      quality: 94,
      type: 'academic',
      trend: '+22%'
    }
  ];

  // Sample citation types data
  const citationTypes = [
    { type: 'Official Sources', count: 298, percentage: 42, color: '#6366f1' },
    { type: 'News & Media', count: 187, percentage: 26, color: '#10b981' },
    { type: 'Academic Papers', count: 134, percentage: 19, color: '#f59e0b' },
    { type: 'Industry Reports', count: 92, percentage: 13, color: '#8b5cf6' }
  ];

  // Sample competitor citations
  const competitorCitations = [
    { competitor: 'Your Brand', citations: 234, share: 34, trend: '+12%' },
    { competitor: 'TechCorp', citations: 178, share: 26, trend: '+8%' },
    { competitor: 'InnovateX', citations: 145, share: 21, trend: '+5%' },
    { competitor: 'NextGen Solutions', citations: 132, share: 19, trend: '+15%' }
  ];

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all' && value !== '30days').length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'official':
        return <BusinessIcon color="primary" />;
      case 'academic':
        return <SchoolIcon color="success" />;
      case 'news':
        return <ArticleIcon color="warning" />;
      default:
        return <LinkIcon color="info" />;
    }
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'success.main';
    if (quality >= 80) return 'warning.main';
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
              Citation Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor brand citations and source quality across AI model responses
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
        {/* Citation Trends Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 350 }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Citation Trends & Quality
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                Citations count and source quality score over time
              </Typography>
              <Box sx={{ flex: 1 }}>
                <ChartWithErrorBoundary
                  options={citationChartOptions}
                  series={citationChartSeries}
                  type="area"
                  height="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Citation Types Breakdown */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 350 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Citation Types
              </Typography>
              
              <Stack spacing={2}>
                {citationTypes.map((type, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {type.type}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {type.count}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={type.percentage}
                      sx={{ 
                        height: 8, 
                        borderRadius: 1,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: type.color
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {type.percentage}% of total citations
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Citation Sources */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Top Citation Sources
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Source</TableCell>
                      <TableCell align="center">Citations</TableCell>
                      <TableCell align="center">Quality Score</TableCell>
                      <TableCell align="center">Trend</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topSources.map((source, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24 }}>
                              {getSourceIcon(source.type)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {source.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {source.url}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {source.citations}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${source.quality}%`}
                            size="small"
                            sx={{
                              bgcolor: source.quality >= 90 ? 'success.light' : 
                                      source.quality >= 80 ? 'warning.light' : 'error.light',
                              color: getQualityColor(source.quality),
                              fontWeight: 600
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                            {source.trend}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton size="small" color="primary">
                            <OpenInNewIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Competitor Citations */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Citation Market Share
              </Typography>
              <Stack spacing={2}>
                {competitorCitations.map((comp, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: index === 0 ? 600 : 500,
                          color: index === 0 ? 'primary.main' : 'text.primary'
                        }}
                      >
                        {comp.competitor}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {comp.citations}
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          {comp.trend}
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={comp.share}
                      sx={{ 
                        height: 6, 
                        borderRadius: 1,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: index === 0 ? 'primary.main' : 'grey.400'
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {comp.share}% market share
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};