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
  LinearProgress,
  Popper,
  Fade,
  IconButton
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  SentimentVeryDissatisfied,
  SentimentNeutral,
  SentimentVerySatisfied
} from '@mui/icons-material';
import { ChartWithErrorBoundary } from '@/components/charts/ChartWrapper';
import { AnalyticsFilter } from '@/types';

export const PerceptionAnalyticsScreen: React.FC = () => {
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

  // Sample perception data
  const getTimeFilteredData = () => {
    const baseData = {
      '7days': {
        categories: ['Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30'],
        positive: [65, 67, 70, 68, 72, 74, 75],
        neutral: [25, 23, 20, 22, 18, 16, 15],
        negative: [10, 10, 10, 10, 10, 10, 10]
      },
      '30days': {
        categories: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 30'],
        positive: [60, 65, 68, 72, 75],
        neutral: [30, 25, 22, 18, 15],
        negative: [10, 10, 10, 10, 10]
      },
      '90days': {
        categories: ['Oct', 'Nov', 'Dec', 'Jan'],
        positive: [55, 60, 68, 75],
        neutral: [35, 30, 22, 15],
        negative: [10, 10, 10, 10]
      }
    };
    return baseData[filters.timeRange as keyof typeof baseData];
  };

  const timeData = getTimeFilteredData();

  // Chart configurations
  const perceptionChartOptions = {
    chart: {
      type: 'bar',
      height: 300,
      stacked: true,
      stackType: '100%',
      toolbar: { show: false }
    },
    colors: ['#10b981', '#f59e0b', '#ef4444'],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2
      }
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
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
      theme: 'light',
      y: {
        formatter: (val: number) => `${val}%`
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  const perceptionChartSeries = [
    {
      name: 'Positive',
      data: timeData.positive
    },
    {
      name: 'Neutral',
      data: timeData.neutral
    },
    {
      name: 'Negative',
      data: timeData.negative
    }
  ];

  // Sample sentiment breakdown data
  const sentimentData = [
    { model: 'GPT-4', positive: 78, neutral: 15, negative: 7 },
    { model: 'Claude', positive: 72, neutral: 20, negative: 8 },
    { model: 'Gemini', positive: 69, neutral: 22, negative: 9 },
    { model: 'Llama', positive: 65, neutral: 25, negative: 10 }
  ];

  const topMentions = [
    { text: 'Excellent project management features and user experience', sentiment: 'positive', source: 'GPT-4' },
    { text: 'Great collaboration tools for remote teams', sentiment: 'positive', source: 'Claude' },
    { text: 'Good software but pricing could be better', sentiment: 'neutral', source: 'Gemini' },
    { text: 'Interface needs improvement for better usability', sentiment: 'negative', source: 'Llama' },
    { text: 'Solid platform with reliable performance', sentiment: 'positive', source: 'GPT-4' }
  ];

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all' && value !== '30days').length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <SentimentVerySatisfied color="success" />;
      case 'neutral':
        return <SentimentNeutral color="warning" />;
      case 'negative':
        return <SentimentVeryDissatisfied color="error" />;
      default:
        return <SentimentNeutral />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'success.main';
      case 'neutral':
        return 'warning.main';
      case 'negative':
        return 'error.main';
      default:
        return 'text.secondary';
    }
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
              Perception Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Analyze brand sentiment and perception across AI model responses
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
        {/* Sentiment Trends Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 400 }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Sentiment Trends Over Time
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                Brand perception breakdown by sentiment type
              </Typography>
              <Box sx={{ flex: 1 }}>
                <ChartWithErrorBoundary
                  options={perceptionChartOptions}
                  series={perceptionChartSeries}
                  type="bar"
                  height="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sentiment Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 400 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Current Sentiment Score
              </Typography>
              
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h2" sx={{ color: 'success.main', fontWeight: 600 }}>
                  75%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Overall Positive Sentiment
                </Typography>
              </Box>

              <Stack spacing={2}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SentimentVerySatisfied color="success" fontSize="small" />
                      Positive
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>75%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 1 }} color="success" />
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SentimentNeutral color="warning" fontSize="small" />
                      Neutral
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>15%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={15} sx={{ height: 8, borderRadius: 1 }} color="warning" />
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SentimentVeryDissatisfied color="error" fontSize="small" />
                      Negative
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>10%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={10} sx={{ height: 8, borderRadius: 1 }} color="error" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Sentiment by Model */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Sentiment by AI Model
              </Typography>
              <Stack spacing={2}>
                {sentimentData.map((model, index) => (
                  <Box key={index}>
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                      {model.model}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <LinearProgress
                        variant="determinate"
                        value={model.positive}
                        sx={{ flex: 1, height: 6, borderRadius: 1, bgcolor: 'grey.200' }}
                        color="success"
                      />
                      <Typography variant="caption" sx={{ minWidth: 40 }}>
                        {model.positive}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Sample Mentions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
                Recent Mentions
              </Typography>
              <Stack spacing={2}>
                {topMentions.map((mention, index) => (
                  <Box key={index} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      {getSentimentIcon(mention.sentiment)}
                      <Typography variant="caption" color="text.secondary">
                        {mention.source}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: 12 }}>
                      "{mention.text}"
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