import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ChartWithErrorBoundary } from '@/components/charts/ChartWrapper';
import { InfoIcon } from '@/components/common/InfoIcon';

export const OverviewScreen: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [isClient, setIsClient] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // Ensure component only renders charts on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get MUI theme colors and fonts
  const primaryColor = muiTheme.palette.primary.main;
  const secondaryColor = muiTheme.palette.secondary.main;
  const successColor = muiTheme.palette.success.main;
  const warningColor = muiTheme.palette.warning.main;
  const errorColor = muiTheme.palette.error.main;
  const textPrimary = muiTheme.palette.text.primary;
  const textSecondary = muiTheme.palette.text.secondary;
  const fontFamily = muiTheme.typography.fontFamily;

  // Chart descriptions for info tooltips
  const chartDescriptions = {
    shareOfVoice: "Percentage of total brand mentions compared to competitors in AI model responses",
    mentionFrequency: "Comparison of how often your brand is mentioned versus key competitors",
    shareOfVoiceLLMs: "Brand mention percentages across different large language models",
    rankingTrends: "Your brand's ranking position over time (lower is better)",
    topCitations: "Most frequently cited sources when your brand is mentioned",
    perception: "Sentiment analysis of brand mentions over time across AI models"
  };

  // Base chart options with MUI theme
  const baseChartOptions = {
    chart: {
      fontFamily: fontFamily,
      toolbar: { show: false }
    },
    grid: {
      borderColor: muiTheme.palette.divider
    }
  };

  // Chart configurations
  const shareOfVoiceOptions = {
    ...baseChartOptions,
    chart: {
      ...baseChartOptions.chart,
      type: 'radialBar',
      height: 280
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 15,
          size: '70%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            fontSize: '32px',
            fontWeight: 600,
            fontFamily: fontFamily,
            color: textPrimary,
            formatter: (val: number) => `${val}%`
          }
        }
      }
    },
    colors: [primaryColor],
    labels: ['Our Brand'],
    stroke: {
      lineCap: 'round'
    }
  };

  const mentionFrequencyOptions = {
    ...baseChartOptions,
    chart: {
      ...baseChartOptions.chart,
      type: 'bar',
      height: 280
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}`,
      offsetY: -20,
      style: {
        fontSize: '10px',
        fontFamily: fontFamily,
        colors: [textPrimary]
      }
    },
    xaxis: {
      categories: ['Your Brand', 'Comp A', 'Comp B', 'Comp C'],
      labels: {
        style: {
          fontSize: '10px',
          fontFamily: fontFamily,
          colors: textSecondary
        }
      }
    },
    yaxis: {
      title: {
        text: 'Mentions',
        style: {
          fontSize: '12px',
          fontFamily: fontFamily,
          color: textSecondary
        }
      },
      labels: {
        style: {
          fontSize: '10px',
          fontFamily: fontFamily,
          colors: textSecondary
        }
      }
    },
    colors: [primaryColor, secondaryColor, warningColor, errorColor]
  };

  const rankingTrendsOptions = {
    ...baseChartOptions,
    chart: {
      ...baseChartOptions.chart,
      type: 'line',
      height: 280
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 6,
      hover: {
        size: 8
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          fontSize: '10px',
          fontFamily: fontFamily,
          colors: textSecondary
        }
      }
    },
    yaxis: {
      reversed: false,
      title: {
        text: 'Ranking Position',
        style: {
          fontSize: '12px',
          fontFamily: fontFamily,
          color: textSecondary
        }
      },
      labels: {
        style: {
          fontSize: '10px',
          fontFamily: fontFamily,
          colors: textSecondary
        }
      },
      min: 1,
      max: 10
    },
    colors: [primaryColor],
    tooltip: {
      style: {
        fontSize: '11px',
        fontFamily: fontFamily
      },
      custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
        const month = w.globals.labels[dataPointIndex];
        const rank = series[seriesIndex][dataPointIndex];
        return `<div style="padding: 8px; background: #374151; color: white; border-radius: 4px; font-size: 11px; font-family: ${fontFamily};">
          ${month}: Rank #${rank}
        </div>`;
      }
    }
  };

  const perceptionOptions = {
    ...baseChartOptions,
    chart: {
      ...baseChartOptions.chart,
      type: 'bar',
      height: 280,
      stacked: true,
      stackType: '100%'
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          fontSize: '10px',
          fontFamily: fontFamily,
          colors: textSecondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${val}%`,
        style: {
          fontSize: '10px',
          fontFamily: fontFamily,
          colors: textSecondary
        }
      }
    },
    colors: [successColor, warningColor, errorColor],
    legend: {
      position: 'bottom',
      fontSize: '10px',
      fontFamily: fontFamily,
      markers: {
        width: 8,
        height: 8,
        radius: 4
      }
    },
    tooltip: {
      style: {
        fontSize: '11px',
        fontFamily: fontFamily
      },
      y: {
        formatter: (val: number) => `${val}%`
      }
    }
  };

  // Chart data
  const shareOfVoiceSeries = [70];
  const mentionFrequencySeries = [{
    name: 'Mentions',
    data: [100, 60, 40, 25]
  }];
  const rankingTrendsSeries = [{
    name: 'Ranking',
    data: [8, 6, 7, 4, 5, 3]
  }];
  const perceptionSeries = [
    {
      name: 'Positive',
      data: [60, 65, 55, 70, 75, 68]
    },
    {
      name: 'Neutral',
      data: [25, 20, 30, 15, 15, 20]
    },
    {
      name: 'Negative',
      data: [15, 15, 15, 15, 10, 12]
    }
  ];

  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      bgcolor: '#f8fafc'
    }}>
      {/* Header */}
      <Box sx={{
        px: 2,
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'white'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: 1.5
        }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.25, fontSize: '1.5rem' }}>
              Brand's GEO Overview
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
              Monitor your brand's performance across AI models and search engines
            </Typography>
          </Box>

          <Tabs
            value={timeFilter}
            onChange={(e, value) => setTimeFilter(value)}
            sx={{
              bgcolor: 'grey.50',
              borderRadius: 1.5,
              minHeight: 28,
              '& .MuiTab-root': {
                minHeight: 28,
                fontSize: 11,
                textTransform: 'none',
                py: 0.5
              }
            }}
          >
            <Tab label="7 days" value="7days" />
            <Tab label="30 days" value="30days" />
            <Tab label="90 days" value="90days" />
          </Tabs>
        </Box>
      </Box>

      {/* Charts Grid */}
      <Box sx={{
        flex: 1,
        p: 1.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        overflow: 'hidden'
      }}>
        {/* First Row - 3 Charts */}
        <Box sx={{
          display: 'flex',
          gap: 1.5,
          flex: 1,
          minHeight: 0,
          flexDirection: { xs: 'column', lg: 'row' }
        }}>
          {/* Share of Voice */}
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1.5
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontSize: 13, fontWeight: 600 }}>
                    Share of Voice
                  </Typography>
                  <InfoIcon description={chartDescriptions.shareOfVoice} />
                </Box>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    fontSize: 10,
                    textTransform: 'none',
                    color: 'primary.main',
                    minWidth: 'auto',
                    p: 0.5
                  }}
                >
                  Detailed Analytics
                </Button>
              </Box>
              <Box sx={{ flex: 1 }}>
                {isClient && (
                  <ChartWithErrorBoundary
                    options={shareOfVoiceOptions}
                    series={shareOfVoiceSeries}
                    type="radialBar"
                    height="100%"
                  />
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Mention Frequency */}
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1.5
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontSize: 13, fontWeight: 600 }}>
                    Mention Frequency vs Competitors
                  </Typography>
                  <InfoIcon description={chartDescriptions.mentionFrequency} />
                </Box>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    fontSize: 10,
                    textTransform: 'none',
                    color: 'primary.main',
                    minWidth: 'auto',
                    p: 0.5
                  }}
                >
                  Detailed Analytics
                </Button>
              </Box>
              <Box sx={{ flex: 1 }}>
                {isClient && (
                  <ChartWithErrorBoundary
                    options={mentionFrequencyOptions}
                    series={mentionFrequencySeries}
                    type="bar"
                    height="100%"
                  />
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Share of Voice Across LLMs */}
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1.5
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontSize: 13, fontWeight: 600 }}>
                    Share of Voice Across LLMs
                  </Typography>
                  <InfoIcon description={chartDescriptions.shareOfVoiceLLMs} />
                </Box>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    fontSize: 10,
                    textTransform: 'none',
                    color: 'primary.main',
                    minWidth: 'auto',
                    p: 0.5
                  }}
                >
                  Detailed Analytics
                </Button>
              </Box>
              <Box sx={{ flex: 1, pt: 1 }}>
                {[
                  { model: 'GPT-4', value: '38%' },
                  { model: 'Claude', value: '45%' },
                  { model: 'Gemini', value: '42%' },
                  { model: 'Llama', value: '35%' }
                ].map((item) => (
                  <Box key={item.model} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.5
                  }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
                      {item.model}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12 }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Second Row - 3 Charts */}
        <Box sx={{
          display: 'flex',
          gap: 1.5,
          flex: 1,
          minHeight: 0,
          flexDirection: { xs: 'column', lg: 'row' }
        }}>
          {/* Ranking Trends */}
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1.5
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontSize: 13, fontWeight: 600 }}>
                    Ranking Trends
                  </Typography>
                  <InfoIcon description={chartDescriptions.rankingTrends} />
                </Box>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    fontSize: 10,
                    textTransform: 'none',
                    color: 'primary.main',
                    minWidth: 'auto',
                    p: 0.5
                  }}
                >
                  Detailed Analytics
                </Button>
              </Box>
              <Box sx={{ flex: 1 }}>
                {isClient && (
                  <ChartWithErrorBoundary
                    options={rankingTrendsOptions}
                    series={rankingTrendsSeries}
                    type="line"
                    height="100%"
                  />
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Top Citations */}
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1.5
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontSize: 13, fontWeight: 600 }}>
                    Top Citations
                  </Typography>
                  <InfoIcon description={chartDescriptions.topCitations} />
                </Box>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    fontSize: 10,
                    textTransform: 'none',
                    color: 'primary.main',
                    minWidth: 'auto',
                    p: 0.5
                  }}
                >
                  Detailed Analytics
                </Button>
              </Box>
              <Box sx={{ flex: 1, pt: 1 }}>
                {[
                  { source: 'Wikipedia', count: '156' },
                  { source: 'Company Website', count: '142' },
                  { source: 'TechCrunch', count: '89' },
                  { source: 'Forbes', count: '67' }
                ].map((item) => (
                  <Box key={item.source} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1.5
                  }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
                      {item.source}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12 }}>
                      {item.count}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* AI Models Perception Over Time */}
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1.5
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontSize: 13, fontWeight: 600 }}>
                    AI Models Perception Over Time
                  </Typography>
                  <InfoIcon description={chartDescriptions.perception} />
                </Box>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    fontSize: 10,
                    textTransform: 'none',
                    color: 'primary.main',
                    minWidth: 'auto',
                    p: 0.5
                  }}
                >
                  Detailed Analytics
                </Button>
              </Box>
              <Box sx={{ flex: 1 }}>
                {isClient && (
                  <ChartWithErrorBoundary
                    options={perceptionOptions}
                    series={perceptionSeries}
                    type="bar"
                    height="100%"
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};