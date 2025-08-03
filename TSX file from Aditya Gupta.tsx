"use client"

import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Tab,
  Tabs,
  Menu,
  MenuList,
  ClickAwayListener,
  Popper,
  Fade,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  CircularProgress
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Public as PublicIcon,
  Description as DescriptionIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Psychology as PsychologyIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  MoreVert as MoreVert,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
  BarChart as BarChartIcon,
  DonutLarge as DonutLargeIcon,
  Timeline as TimelineIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import dynamic from 'next/dynamic';

// Dynamically import Chart with no SSR
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      color: 'text.secondary',
      minHeight: 200
    }}>
      <CircularProgress size={24} sx={{ mr: 1 }} />
      Loading chart...
    </Box>
  )
});

// Optional: Add error handling
const ChartWithErrorBoundary = ({ options, series, type, height }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: height || 280,
        color: 'text.secondary',
        flexDirection: 'column'
      }}>
        <ErrorOutlineIcon sx={{ mb: 1 }} />
        Chart failed to load
      </Box>
    );
  };
};

const getResponsiveChartOptions = (baseOptions) => ({
  ...baseOptions,
  responsive: [{
    breakpoint: 600,
    options: {
      legend: {
        position: 'bottom',
        fontSize: '10px'
      },
      xaxis: {
        labels: {
          style: { fontSize: '8px' }
        }
      }
    }
  }]
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#10b981',
    },
    background: {
      default: '#fcfcfc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderRadius: 8,
        },
      },
    },
  },
});

const DRAWER_WIDTH = 240;

const BrandGEODashboard = () => {
  const [currentScreen, setCurrentScreen] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    dashboard: false,
    analytics: false
  });

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const toggleDropdown = (dropdown: string) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const navigateToScreen = (screen: string) => {
    setCurrentScreen(screen);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Avatar sx={{ bgcolor: 'grey.900', width: 24, height: 24, fontSize: 10 }}>
            BI
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 500, fontSize: 15 }}>
            Brand Intelligence
          </Typography>
        </Box>

        <Card sx={{ p: 1.5, bgcolor: 'grey.50', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 28, height: 28, fontSize: 11 }}>
              A
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Acme Corp
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Technology
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      <Divider />

      <List sx={{ px: 1.5, py: 1 }}>
        <ListItemButton
          selected={currentScreen === 'overview'}
          onClick={() => navigateToScreen('overview')}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Overview" primaryTypographyProps={{ fontSize: 13 }} />
        </ListItemButton>

        <Accordion
          expanded={dropdowns.dashboard}
          onChange={() => toggleDropdown('dashboard')}
          sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              p: 0,
              minHeight: 'auto',
              '& .MuiAccordionSummary-content': { m: 0 }
            }}
          >
            <ListItemButton sx={{ borderRadius: 1, flex: 1 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <DescriptionIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Dashboard Inputs" primaryTypographyProps={{ fontSize: 13 }} />
            </ListItemButton>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, pl: 4 }}>
            {['competitors', 'geography', 'persona', 'brandbook'].map((item) => (
              <ListItemButton
                key={item}
                selected={currentScreen === item}
                onClick={() => navigateToScreen(item)}
                sx={{ borderRadius: 1, mb: 0.5, py: 0.75 }}
              >
                <ListItemText
                  primary={item.charAt(0).toUpperCase() + item.slice(1).replace('book', ' Book')}
                  primaryTypographyProps={{ fontSize: 12 }}
                />
              </ListItemButton>
            ))}
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 1 }} />

        <Accordion
          expanded={dropdowns.analytics}
          onChange={() => toggleDropdown('analytics')}
          sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              p: 0,
              minHeight: 'auto',
              '& .MuiAccordionSummary-content': { m: 0 }
            }}
          >
            <ListItemButton sx={{ borderRadius: 1, flex: 1 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <AnalyticsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Analytics" primaryTypographyProps={{ fontSize: 13 }} />
            </ListItemButton>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, pl: 4 }}>
            {[
              { id: 'mention-analytics', label: 'Mention Analytics' },
              { id: 'ranking-analytics', label: 'Ranking Analytics' },
              { id: 'perception-analytics', label: 'Perception Analytics' },
              { id: 'prompt-analytics', label: 'Prompt-level Analytics' },
              { id: 'citation-analytics', label: 'Citation Analytics' }
            ].map((item) => (
              <ListItemButton
                key={item.id}
                selected={currentScreen === item.id}
                onClick={() => navigateToScreen(item.id)}
                sx={{ borderRadius: 1, mb: 0.5, py: 0.75 }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 12 }}
                />
              </ListItemButton>
            ))}
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ my: 1 }} />

        <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: 13 }} />
        </ListItemButton>

        <ListItemButton sx={{ borderRadius: 1 }}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <NotificationsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Notifications" primaryTypographyProps={{ fontSize: 13 }} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Mobile App Bar */}
        {isMobile && (
          <AppBar
            position="fixed"
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              color: 'text.primary',
              boxShadow: 1
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Avatar sx={{ bgcolor: 'grey.900', width: 24, height: 24, fontSize: 10, mr: 1 }}>
                BI
              </Avatar>
              <Typography variant="h6" noWrap component="div" sx={{ fontSize: 15, fontWeight: 500 }}>
                Brand Intelligence
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        {/* Drawer */}
        <Box
          component="nav"
          sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                borderRight: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            mt: { xs: 8, md: 0 }
          }}
        >
          {currentScreen === 'overview' && <OverviewScreen />}
          {currentScreen === 'competitors' && <CompetitorsScreen />}
          {currentScreen === 'geography' && <GeographyScreen />}
          {currentScreen === 'persona' && <PersonaScreen />}
          {currentScreen === 'brandbook' && <BrandBookScreen />}
          {currentScreen === 'mention-analytics' && <MentionAnalyticsScreen />}
          {currentScreen === 'ranking-analytics' && <RankingAnalyticsScreen />}
          {currentScreen === 'perception-analytics' && <PerceptionAnalyticsScreen />}
          {currentScreen === 'prompt-analytics' && <PromptAnalyticsScreen />}
          {currentScreen === 'citation-analytics' && <CitationAnalyticsScreen />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

// Overview Screen Component

const OverviewScreen = () => {
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

  // Info icon component with tooltip
  const InfoIcon = ({ description }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e) => {
      setShowTooltip(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
    };

    return (
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        <IconButton
          size="small"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setShowTooltip(false)}
          sx={{ p: 0.25, ml: 0.5 }}
        >
          <Box sx={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            color: 'text.secondary',
            fontWeight: 'bold'
          }}>
            i
          </Box>
        </IconButton>
        {showTooltip && (
          <Box sx={{
            position: 'fixed',
            bgcolor: 'grey.900',
            color: 'white',
            p: 1.5,
            borderRadius: 1,
            fontSize: 11,
            maxWidth: 250,
            zIndex: 1300,
            boxShadow: 3,
            pointerEvents: 'none',
            transform: 'translate(-50%, -100%)',
            marginTop: '-10px',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid',
              borderTopColor: 'grey.900'
            }
          }}
            style={{
              left: mousePos.x,
              top: mousePos.y
            }}>
            {description}
          </Box>
        )}
      </Box>
    );
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
            formatter: (val) => `${val}%`
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
      formatter: (val) => `${val}`,
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
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
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
        formatter: (val) => `${val}%`,
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
        formatter: (val) => `${val}%`
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
      {/* Header - Reduced Size */}
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
          minHeight: 0
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
                  <Chart
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
                  <Chart
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
          minHeight: 0
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
                  <Chart
                    options={rankingTrendsOptions}
                    series={rankingTrendsSeries}
                    type="line"
                    height="100%"
                  />
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Top Citations - Updated to match LLMs style */}
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
                  <Chart
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

// Competitors Screen
const CompetitorsScreen = () => {
  const [competitors, setCompetitors] = useState([
    { id: 1, name: 'TechCorp', domain: 'techcorp.com', url: 'https://techcorp.com' },
    { id: 2, name: 'InnovateX', domain: 'innovatex.io', url: 'https://innovatex.io' }
  ]);

  const [suggestions, setSuggestions] = useState([
    { id: 3, name: 'TechRival', domain: 'techrival.com', url: 'https://techrival.com' },
    { id: 4, name: 'NextGen Solutions', domain: 'nextgen.com', url: 'https://nextgen.com' },
    { id: 5, name: 'Innovation Labs', domain: 'innovlabs.net', url: 'https://innovlabs.net' }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCompetitor, setEditingCompetitor] = useState(null);
  const [formData, setFormData] = useState({ name: '', domain: '', url: '' });

  const handleAddCompetitor = () => {
    setEditingCompetitor(null);
    setFormData({ name: '', domain: '', url: '' });
    setDialogOpen(true);
  };

  const handleEditCompetitor = (competitor) => {
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

  const handleDeleteCompetitor = (id) => {
    setCompetitors(prev => prev.filter(comp => comp.id !== id));
  };

  const handleAddSuggestion = (suggestion) => {
    const newId = Math.max(...competitors.map(c => c.id), 0) + 1;
    setCompetitors(prev => [{ ...suggestion, id: newId }, ...prev]);
    setSuggestions(prev => prev.filter(sug => sug.id !== suggestion.id));
  };

  const handleRemoveSuggestion = (id) => {
    setSuggestions(prev => prev.filter(sug => sug.id !== id));
  };

  const handleLoadMore = () => {
    // Simulate loading more suggestions
    const newSuggestions = [
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
                      <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
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
                      <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
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

// Geography Screen
const GeographyScreen = () => {
  const [geographyData, setGeographyData] = useState([
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
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    region: '',
    country: '',
    state: '',
    city: '',
    scale: 'Country'
  });

  const handleInputChange = (field, value) => {
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

  const handleEditGeography = (item) => {
    setEditingItem(item);

    // Extract values from hierarchy
    const hierarchyData = {
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

  const handleDeleteGeography = (id) => {
    setGeographyData(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveGeography = () => {
    // Build hierarchy based on form data
    const hierarchy = [];
    if (formData.region) hierarchy.push({ level: 'Region', value: formData.region });
    if (formData.country) hierarchy.push({ level: 'Country', value: formData.country });
    if (formData.state) hierarchy.push({ level: 'State', value: formData.state });
    if (formData.city) hierarchy.push({ level: 'City', value: formData.city });

    if (editingItem) {
      // Update existing item
      setGeographyData(prev => prev.map(item =>
        item.id === editingItem.id
          ? { ...item, scale: formData.scale, hierarchy }
          : item
      ));
    } else {
      // Add new item
      const newItem = {
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
  const stats = {
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
              width: '100%'
            }}>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{stats.regions}</Typography>
                <Typography variant="body2" color="text.secondary">Regions</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{stats.countries}</Typography>
                <Typography variant="body2" color="text.secondary">Countries</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{stats.states}</Typography>
                <Typography variant="body2" color="text.secondary">States/Provinces</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
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
                onChange={(e) => handleInputChange('scale', e.target.value)}
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

// Personas Screen
const PersonaScreen = () => {
  const [personas, setPersonas] = useState([
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
  const [editingPersona, setEditingPersona] = useState(null);
  const [formData, setFormData] = useState({
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

  const checkGuidelinesCoverage = (description) => {
    const allPoints = [...demographicPoints, ...behavioralPoints];
    return allPoints.map(point => ({
      point,
      covered: description.toLowerCase().includes(point.toLowerCase()) ||
        description.toLowerCase().includes(point.replace(/\s+/g, '').toLowerCase())
    }));
  };

  const handleOpenDialog = (persona = null) => {
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

  const handleGeographyChange = (event) => {
    const value = event.target.value;
    let newGeographies;

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
      const newPersona = {
        id: Date.now(),
        ...formData,
        completeness: calculateCompleteness(formData.description)
      };
      setPersonas(prev => [...prev, newPersona]);
    }
    handleCloseDialog();
  };

  const calculateCompleteness = (description) => {
    const coverage = checkGuidelinesCoverage(description);
    const coveredCount = coverage.filter(item => item.covered).length;
    return Math.round((coveredCount / coverage.length) * 100);
  };

  const handleDelete = (personaId) => {
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

// Brand Book Screen
const BrandBookScreen = () => {
  const [brandData, setBrandData] = useState({
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

  const handleInputChange = (field, value) => {
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

  const removeKeyFeature = (index) => {
    setBrandData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
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
                <Button variant="contained" color="success" size="large">
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

// Analytics Screen Components
const MentionAnalyticsScreen = () => {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [showFilters, setShowFilters] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedPersona, setSelectedPersona] = useState('all');
  const [selectedGeography, setSelectedGeography] = useState('all');
  const [selectedIntent, setSelectedIntent] = useState('all');
  const [openSelect, setOpenSelect] = useState(null);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowFilters(!showFilters);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setShowFilters(false);
    setOpenSelect(null);
  };

  const handleSelectOpen = (selectName) => {
    setOpenSelect(selectName);
  };

  const handleSelectClose = () => {
    setOpenSelect(null);
  };

  const resetFilters = () => {
    setTimeFilter('30days');
    setSelectedModel('all');
    setSelectedPersona('all');
    setSelectedGeography('all');
    setSelectedIntent('all');
  };

  // Handle model legend clicks
  const handleModelLegendClick = (seriesIndex) => {
    const modelNames = ['gpt4', 'claude', 'gemini', 'llama'];
    const clickedModel = modelNames[seriesIndex];
    setSelectedModel(selectedModel === clickedModel ? 'all' : clickedModel);
  };

  // Handle persona legend clicks
  const handlePersonaLegendClick = (seriesIndex) => {
    const personaNames = ['tech', 'business', 'developer'];
    const clickedPersona = personaNames[seriesIndex];
    setSelectedPersona(selectedPersona === clickedPersona ? 'all' : clickedPersona);
  };

  // Handle competition legend clicks
  const handleCompetitionLegendClick = (seriesIndex) => {
    // Competition chart doesn't filter other data, but can toggle series visibility
    console.log('Competition series clicked:', seriesIndex);
  };

  // Generate filtered data based on time filter
  const getTimeFilteredData = () => {
    const baseData = {
      '7days': {
        categories: ['Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30'],
        modelData: {
          gpt4: [70, 72, 74, 73, 75, 74, 75],
          claude: [60, 62, 64, 63, 65, 64, 65],
          gemini: [50, 52, 54, 53, 55, 54, 55],
          llama: [40, 42, 44, 43, 45, 44, 45]
        },
        personaData: {
          tech: [68, 70, 72, 71, 72, 71, 72],
          business: [48, 50, 52, 51, 52, 51, 52],
          developer: [78, 80, 82, 81, 82, 81, 82]
        }
      },
      '30days': {
        categories: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 30'],
        modelData: {
          gpt4: [62, 65, 68, 72, 75],
          claude: [52, 55, 58, 62, 65],
          gemini: [42, 45, 48, 52, 55],
          llama: [32, 35, 38, 42, 45]
        },
        personaData: {
          tech: [58, 62, 65, 68, 72],
          business: [38, 42, 45, 48, 52],
          developer: [68, 72, 75, 78, 82]
        }
      },
      '90days': {
        categories: ['Oct', 'Nov', 'Dec', 'Jan'],
        modelData: {
          gpt4: [55, 60, 68, 75],
          claude: [45, 50, 58, 65],
          gemini: [35, 40, 48, 55],
          llama: [25, 30, 38, 45]
        },
        personaData: {
          tech: [50, 55, 65, 72],
          business: [30, 35, 45, 52],
          developer: [60, 65, 75, 82]
        }
      }
    };
    return baseData[timeFilter];
  };

  const timeData = getTimeFilteredData();

  // Enhanced chart configurations with interactive legends
  const modelChartOptions = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: { show: false },
      animations: { enabled: true },
      events: {
        legendClick: function (chartContext, seriesIndex, config) {
          handleModelLegendClick(seriesIndex);
          return false; // Prevent default ApexCharts legend behavior
        }
      }
    },
    colors: ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'],
    stroke: {
      width: 3,
      curve: 'smooth',
      opacity: selectedModel === 'all' ? [1, 1, 1, 1] : [
        selectedModel === 'gpt4' ? 1 : 0.3,
        selectedModel === 'claude' ? 1 : 0.3,
        selectedModel === 'gemini' ? 1 : 0.3,
        selectedModel === 'llama' ? 1 : 0.3
      ]
    },
    fill: {
      opacity: selectedModel === 'all' ? [1, 1, 1, 1] : [
        selectedModel === 'gpt4' ? 1 : 0.3,
        selectedModel === 'claude' ? 1 : 0.3,
        selectedModel === 'gemini' ? 1 : 0.3,
        selectedModel === 'llama' ? 1 : 0.3
      ]
    },
    markers: {
      size: 4,
      colors: ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
        sizeOffset: 2
      }
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      markers: {
        width: 12,
        height: 3,
        strokeWidth: 0,
        radius: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: false // Disable default behavior, we handle it manually
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const modelNames = ['GPT-4', 'Claude', 'Gemini', 'Llama'];
        const category = w.globals.categoryLabels[dataPointIndex];

        let tooltipContent = `<div class="custom-tooltip" style="padding: 8px 12px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${category}</div>`;

        series.forEach((seriesData, index) => {
          const value = seriesData[dataPointIndex];
          const color = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'][index];
          tooltipContent += `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%; margin-right: 8px;"></div>
              <span style="font-size: 12px; color: #64748b;">${modelNames[index]}: <strong>${value}%</strong></span>
            </div>`;
        });

        tooltipContent += `<div style="font-size: 10px; color: #94a3b8; margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 4px;">Click legend to filter</div></div>`;

        return tooltipContent;
      }
    }
  };

  const modelChartSeries = [
    {
      name: 'GPT-4',
      data: timeData.modelData.gpt4
    },
    {
      name: 'Claude',
      data: timeData.modelData.claude
    },
    {
      name: 'Gemini',
      data: timeData.modelData.gemini
    },
    {
      name: 'Llama',
      data: timeData.modelData.llama
    }
  ].map((series, index) => {
    const modelNames = ['gpt4', 'claude', 'gemini', 'llama'];
    const isSelected = selectedModel === 'all' || selectedModel === modelNames[index];
    return {
      ...series,
      opacity: isSelected ? 1 : 0.3
    };
  });

  const personaChartOptions = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: { show: false },
      animations: { enabled: true },
      events: {
        legendClick: function (chartContext, seriesIndex, config) {
          handlePersonaLegendClick(seriesIndex);
          return false; // Prevent default ApexCharts legend behavior
        }
      }
    },
    colors: ['#6366f1', '#10b981', '#f59e0b'],
    stroke: {
      width: 3,
      curve: 'smooth',
      opacity: selectedPersona === 'all' ? [1, 1, 1] : [
        selectedPersona === 'tech' ? 1 : 0.3,
        selectedPersona === 'business' ? 1 : 0.3,
        selectedPersona === 'developer' ? 1 : 0.3
      ]
    },
    fill: {
      opacity: selectedPersona === 'all' ? [1, 1, 1] : [
        selectedPersona === 'tech' ? 1 : 0.3,
        selectedPersona === 'business' ? 1 : 0.3,
        selectedPersona === 'developer' ? 1 : 0.3
      ]
    },
    markers: {
      size: 4,
      colors: ['#6366f1', '#10b981', '#f59e0b'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
        sizeOffset: 2
      }
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      markers: {
        width: 12,
        height: 3,
        strokeWidth: 0,
        radius: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: false // Disable default behavior
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const personaNames = ['Tech Enthusiast', 'Business Executive', 'Developer'];
        const category = w.globals.categoryLabels[dataPointIndex];

        let tooltipContent = `<div class="custom-tooltip" style="padding: 8px 12px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${category}</div>`;

        series.forEach((seriesData, index) => {
          const value = seriesData[dataPointIndex];
          const color = ['#6366f1', '#10b981', '#f59e0b'][index];
          tooltipContent += `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%; margin-right: 8px;"></div>
              <span style="font-size: 12px; color: #64748b;">${personaNames[index]}: <strong>${value}%</strong></span>
            </div>`;
        });

        tooltipContent += `<div style="font-size: 10px; color: #94a3b8; margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 4px;">Click legend to filter</div></div>`;

        return tooltipContent;
      }
    }
  };

  const personaChartSeries = [
    {
      name: 'Tech Enthusiast',
      data: timeData.personaData.tech
    },
    {
      name: 'Business Executive',
      data: timeData.personaData.business
    },
    {
      name: 'Developer',
      data: timeData.personaData.developer
    }
  ].map((series, index) => {
    const personaNames = ['tech', 'business', 'developer'];
    const isSelected = selectedPersona === 'all' || selectedPersona === personaNames[index];
    return {
      ...series,
      opacity: isSelected ? 1 : 0.3
    };
  });

  const competitionChartOptions = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: { show: false },
      animations: { enabled: true },
      events: {
        legendClick: function (chartContext, seriesIndex, config) {
          handleCompetitionLegendClick(seriesIndex);
          return false; // Prevent default behavior
        }
      }
    },
    colors: ['#6366f1', '#ef4444', '#f59e0b'],
    stroke: {
      width: [4, 3, 3],
      curve: 'smooth'
    },
    markers: {
      size: 4,
      colors: ['#6366f1', '#ef4444', '#f59e0b'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
        sizeOffset: 2
      }
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      markers: {
        width: 12,
        height: 3,
        strokeWidth: 0,
        radius: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const companyNames = ['Your Brand', 'TechCorp', 'InnovateX'];
        const category = w.globals.categoryLabels[dataPointIndex];

        let tooltipContent = `<div class="custom-tooltip" style="padding: 8px 12px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${category}</div>`;

        series.forEach((seriesData, index) => {
          const value = seriesData[dataPointIndex];
          const color = ['#6366f1', '#ef4444', '#f59e0b'][index];
          tooltipContent += `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%; margin-right: 8px;"></div>
              <span style="font-size: 12px; color: #64748b;">${companyNames[index]}: <strong>${value}%</strong></span>
            </div>`;
        });

        tooltipContent += `</div>`;

        return tooltipContent;
      }
    }
  };

  const competitionChartSeries = [
    {
      name: 'Your Brand (42%)',
      data: [42, 45, 48, 52, 55]
    },
    {
      name: 'TechCorp (28%)',
      data: [28, 32, 35, 38, 42]
    },
    {
      name: 'InnovateX (18%)',
      data: [18, 22, 25, 28, 32]
    }
  ];

  // Filter data based on selections (with enhanced filtering based on chart interactions)
  const getFilteredIntentData = () => {
    let baseIntentData = [
      { intent: 'Product Comparison', mentions: 45, trend: '+5.2%', id: 'comparison' },
      { intent: 'Feature Inquiry', mentions: 62, trend: '+3.1%', id: 'feature' },
      { intent: 'Pricing Questions', mentions: 28, trend: '-1.2%', id: 'pricing' },
      { intent: 'Technical Support', mentions: 73, trend: '+8.4%', id: 'support' },
      { intent: 'Integration Help', mentions: 38, trend: '+2.6%', id: 'integration' }
    ];

    // Apply model filter influence on intent data
    if (selectedModel !== 'all') {
      baseIntentData = baseIntentData.map(item => ({
        ...item,
        mentions: Math.round(item.mentions * (selectedModel === 'gpt4' ? 1.2 : selectedModel === 'claude' ? 1.1 : 0.9))
      }));
    }

    // Apply persona filter influence on intent data
    if (selectedPersona !== 'all') {
      baseIntentData = baseIntentData.map(item => ({
        ...item,
        mentions: Math.round(item.mentions * (selectedPersona === 'developer' ? 1.3 : selectedPersona === 'tech' ? 1.1 : 0.8))
      }));
    }

    // Always return all data, filtering will be handled by opacity
    return baseIntentData;
  };

  const getFilteredGeographyData = () => {
    let baseGeographyData = [
      { region: 'North America', mentions: 52, trend: '+2.8%', id: 'na' },
      { region: 'Europe', mentions: 38, trend: '+1.5%', id: 'eu' },
      { region: 'Asia Pacific', mentions: 34, trend: '-0.8%', id: 'apac' },
      { region: 'Latin America', mentions: 28, trend: '+3.2%', id: 'latam' },
      { region: 'Middle East', mentions: 25, trend: '+1.1%', id: 'me' },
      { region: 'Africa', mentions: 22, trend: '+2.4%', id: 'africa' }
    ];

    // Apply model filter influence on geography data
    if (selectedModel !== 'all') {
      baseGeographyData = baseGeographyData.map(item => ({
        ...item,
        mentions: Math.round(item.mentions * (selectedModel === 'gpt4' ? 1.1 : selectedModel === 'claude' ? 1.05 : 0.95))
      }));
    }

    // Apply persona filter influence on geography data
    if (selectedPersona !== 'all') {
      baseGeographyData = baseGeographyData.map(item => ({
        ...item,
        mentions: Math.round(item.mentions * (selectedPersona === 'tech' ? 1.2 : selectedPersona === 'business' ? 0.9 : 1.1))
      }));
    }

    // Always return all data, filtering will be handled by opacity
    return baseGeographyData;
  };

  const intentData = getFilteredIntentData();
  const geographyData = getFilteredGeographyData();

  const sourcesData = [
    { source: 'AI Model Responses', mentions: 1247, percentage: 34 },
    { source: 'Industry Reports', mentions: 892, percentage: 24 },
    { source: 'Tech Forums', mentions: 567, percentage: 15 },
    { source: 'News Articles', mentions: 445, percentage: 12 }
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedModel !== 'all') count++;
    if (selectedPersona !== 'all') count++;
    if (selectedGeography !== 'all') count++;
    if (selectedIntent !== 'all') count++;
    if (timeFilter !== '30days') count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  // Helper function to get active filter labels
  const getActiveFilterLabels = () => {
    const labels = [];
    if (selectedModel !== 'all') {
      const modelLabels = { gpt4: 'GPT-4', claude: 'Claude', gemini: 'Gemini', llama: 'Llama' };
      labels.push(`Model: ${modelLabels[selectedModel]}`);
    }
    if (selectedPersona !== 'all') {
      const personaLabels = { tech: 'Tech Enthusiast', business: 'Business Executive', developer: 'Developer' };
      labels.push(`Persona: ${personaLabels[selectedPersona]}`);
    }
    if (selectedGeography !== 'all') {
      const geoLabels = { na: 'North America', eu: 'Europe', apac: 'Asia Pacific', latam: 'Latin America', me: 'Middle East', africa: 'Africa' };
      labels.push(`Geography: ${geoLabels[selectedGeography]}`);
    }
    if (selectedIntent !== 'all') {
      const intentLabels = { comparison: 'Product Comparison', feature: 'Feature Inquiry', pricing: 'Pricing Questions', support: 'Technical Support', integration: 'Integration Help' };
      labels.push(`Intent: ${intentLabels[selectedIntent]}`);
    }
    if (timeFilter !== '30days') {
      const timeLabels = { '7days': 'Last 7 Days', '30days': 'Last 30 Days', '90days': 'Last 90 Days' };
      labels.push(`Time: ${timeLabels[timeFilter]}`);
    }
    return labels;
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
            {activeFiltersCount > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                  Active Filters: {getActiveFilterLabels().join(' • ')}
                </Typography>
              </Box>
            )}
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
              modifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [0, 8],
                  },
                },
                {
                  name: 'preventOverflow',
                  options: {
                    boundary: 'viewport',
                    altAxis: true,
                    padding: 8,
                  },
                },
              ]}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper
                    sx={{
                      p: 3,
                      mt: 1,
                      minWidth: 320,
                      maxWidth: 400,
                      zIndex: 10000,
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      position: 'relative'
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Filters
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={handleFilterClose}
                          sx={{ color: 'text.secondary' }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Stack spacing={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Time Period</InputLabel>
                          <Select
                            value={timeFilter}
                            label="Time Period"
                            open={openSelect === 'timePeriod'}
                            onOpen={() => handleSelectOpen('timePeriod')}
                            onClose={handleSelectClose}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="7days">Last 7 Days</MenuItem>
                            <MenuItem value="30days">Last 30 Days</MenuItem>
                            <MenuItem value="90days">Last 90 Days</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Model</InputLabel>
                          <Select
                            value={selectedModel}
                            label="Model"
                            open={openSelect === 'model'}
                            onOpen={() => handleSelectOpen('model')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
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
                            value={selectedPersona}
                            label="Persona"
                            open={openSelect === 'persona'}
                            onOpen={() => handleSelectOpen('persona')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedPersona(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="all">All Personas</MenuItem>
                            <MenuItem value="tech">Tech Enthusiast</MenuItem>
                            <MenuItem value="business">Business Executive</MenuItem>
                            <MenuItem value="developer">Developer</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Intent</InputLabel>
                          <Select
                            value={selectedIntent}
                            label="Intent"
                            open={openSelect === 'intent'}
                            onOpen={() => handleSelectOpen('intent')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedIntent(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="all">All Intents</MenuItem>
                            <MenuItem value="comparison">Product Comparison</MenuItem>
                            <MenuItem value="feature">Feature Inquiry</MenuItem>
                            <MenuItem value="pricing">Pricing Questions</MenuItem>
                            <MenuItem value="support">Technical Support</MenuItem>
                            <MenuItem value="integration">Integration Help</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Geography</InputLabel>
                          <Select
                            value={selectedGeography}
                            label="Geography"
                            open={openSelect === 'geography'}
                            onOpen={() => handleSelectOpen('geography')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedGeography(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="all">All Regions</MenuItem>
                            <MenuItem value="na">North America</MenuItem>
                            <MenuItem value="eu">Europe</MenuItem>
                            <MenuItem value="apac">Asia Pacific</MenuItem>
                            <MenuItem value="latam">Latin America</MenuItem>
                            <MenuItem value="me">Middle East</MenuItem>
                            <MenuItem value="africa">Africa</MenuItem>
                          </Select>
                        </FormControl>

                        <Box sx={{ pt: 1 }}>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={resetFilters}
                            disabled={activeFiltersCount === 0}
                          >
                            Clear All Filters
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Stack>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ width: '100%' }}>
        {<Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 0 }}>
                  Mention % by AI Model
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Click legend to filter
                </Typography>
              </Box>
              <Box sx={{ flex: 1, width: '100%' }}>
                <Chart
                  options={modelChartOptions}
                  series={modelChartSeries}
                  type="line"
                  height="100%"
                  width="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>}

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Mention % by Intent Category
              </Typography>
              <Box sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
                {intentData.map((item, i) => {
                  const isSelected = selectedIntent === 'all' || selectedIntent === item.id;

                  return (
                    <Box
                      key={item.id}
                      sx={{
                        mb: 0,
                        cursor: 'pointer',
                        opacity: isSelected ? 1 : 0.3,
                        transition: 'all 0.3s ease',
                        p: 1.5,
                        '&:hover': {
                          bgcolor: 'action.hover',
                          opacity: 0.8
                        }
                      }}
                      onClick={() => setSelectedIntent(selectedIntent === item.id ? 'all' : item.id)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12 }}>
                          {item.intent}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>
                            {item.mentions}%
                          </Typography>
                          <Chip
                            label={item.trend}
                            size="small"
                            color={item.trend.startsWith('+') ? 'success' : 'error'}
                            sx={{ fontSize: 9, height: 18, minWidth: 45 }}
                          />
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.mentions}
                        sx={{ height: 5, borderRadius: 1 }}
                        color={item.mentions >= 60 ? 'success' : item.mentions >= 40 ? 'warning' : 'error'}
                      />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 0 }}>
                  Mention % by Target Persona
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Click legend to filter
                </Typography>
              </Box>
              <Box sx={{ flex: 1, width: '100%' }}>
                <Chart
                  options={personaChartOptions}
                  series={personaChartSeries}
                  type="line"
                  height="100%"
                  width="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Mention % by Geography
              </Typography>
              <Box sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
                {geographyData.map((item, i) => {
                  const isSelected = selectedGeography === 'all' || selectedGeography === item.id;

                  return (
                    <Box
                      key={item.id}
                      sx={{
                        mb: 0,
                        cursor: 'pointer',
                        opacity: isSelected ? 1 : 0.3,
                        transition: 'all 0.3s ease',
                        p: 1.5,
                        '&:hover': {
                          bgcolor: 'action.hover',
                          opacity: 0.8
                        }
                      }}
                      onClick={() => setSelectedGeography(selectedGeography === item.id ? 'all' : item.id)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12 }}>
                          {item.region}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>
                            {item.mentions}%
                          </Typography>
                          <Chip
                            label={item.trend}
                            size="small"
                            color={item.trend.startsWith('+') ? 'success' : 'error'}
                            sx={{ fontSize: 9, height: 18, minWidth: 45 }}
                          />
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.mentions}
                        sx={{ height: 5, borderRadius: 1 }}
                        color={item.mentions >= 40 ? 'success' : item.mentions >= 30 ? 'warning' : 'error'}
                      />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 0 }}>
                  Mention % vs Competition
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Interactive view
                </Typography>
              </Box>
              <Box sx={{ flex: 1, width: '100%' }}>
                <Chart
                  options={competitionChartOptions}
                  series={competitionChartSeries}
                  type="line"
                  height="100%"
                  width="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Top Sources with Mention Count
              </Typography>
              <Box sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
                {sourcesData.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      mb: 0,
                      p: 1.5,
                      bgcolor: item.percentage >= 30 ? '#f0fdf4' : item.percentage >= 20 ? '#fffbeb' : '#fef2f2',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          fontSize: 12
                        }}
                      >
                        {item.source}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          fontSize: 12,
                          color: item.percentage >= 30 ? '#10b981' : item.percentage >= 20 ? '#f59e0b' : '#ef4444'
                        }}
                      >
                        {item.percentage}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                        {item.mentions.toLocaleString()} mentions
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.percentage}
                        sx={{
                          height: 5,
                          borderRadius: 1,
                          width: '60%',
                          ml: 1
                        }}
                        color={item.percentage >= 30 ? 'success' : item.percentage >= 20 ? 'warning' : 'error'}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
// Ranking Analytics Screen
const RankingAnalyticsScreen = () => {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [showFilters, setShowFilters] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedPersona, setSelectedPersona] = useState('all');
  const [selectedGeography, setSelectedGeography] = useState('all');
  const [selectedIntent, setSelectedIntent] = useState('all');
  const [openSelect, setOpenSelect] = useState(null);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowFilters(!showFilters);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setShowFilters(false);
    setOpenSelect(null);
  };

  const handleSelectOpen = (selectName) => {
    setOpenSelect(selectName);
  };

  const handleSelectClose = () => {
    setOpenSelect(null);
  };

  const resetFilters = () => {
    setTimeFilter('30days');
    setSelectedModel('all');
    setSelectedPersona('all');
    setSelectedGeography('all');
    setSelectedIntent('all');
  };

  // Handle model legend clicks
  const handleModelLegendClick = (seriesIndex) => {
    const modelNames = ['gpt4', 'claude', 'gemini', 'llama'];
    const clickedModel = modelNames[seriesIndex];
    setSelectedModel(selectedModel === clickedModel ? 'all' : clickedModel);
  };

  // Handle persona legend clicks
  const handlePersonaLegendClick = (seriesIndex) => {
    const personaNames = ['tech', 'business', 'developer'];
    const clickedPersona = personaNames[seriesIndex];
    setSelectedPersona(selectedPersona === clickedPersona ? 'all' : clickedPersona);
  };

  // Handle competition legend clicks
  const handleCompetitionLegendClick = (seriesIndex) => {
    // Competition chart doesn't filter other data, but can toggle series visibility
    console.log('Competition series clicked:', seriesIndex);
  };

  // Generate filtered data based on time filter
  const getTimeFilteredData = () => {
    const baseData = {
      '7days': {
        categories: ['Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30'],
        modelData: {
          gpt4: [2.1, 2.2, 2.3, 2.2, 2.4, 2.3, 2.4],
          claude: [1.8, 1.9, 2.0, 1.9, 2.1, 2.0, 2.1],
          gemini: [2.8, 2.9, 3.0, 2.9, 3.1, 3.0, 3.1],
          llama: [3.8, 3.9, 4.0, 3.9, 4.1, 4.0, 4.1]
        },
        personaData: {
          tech: [2.2, 2.1, 2.0, 2.1, 2.0, 2.1, 2.0],
          business: [2.8, 2.7, 2.6, 2.7, 2.6, 2.7, 2.6],
          developer: [1.6, 1.5, 1.4, 1.5, 1.4, 1.5, 1.4]
        }
      },
      '30days': {
        categories: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 30'],
        modelData: {
          gpt4: [2.8, 2.6, 2.4, 2.2, 2.1],
          claude: [2.4, 2.2, 2.0, 1.8, 1.7],
          gemini: [3.4, 3.2, 3.0, 2.8, 2.7],
          llama: [4.4, 4.2, 4.0, 3.8, 3.7]
        },
        personaData: {
          tech: [2.6, 2.4, 2.2, 2.0, 1.9],
          business: [3.2, 3.0, 2.8, 2.6, 2.5],
          developer: [1.8, 1.6, 1.4, 1.2, 1.1]
        }
      },
      '90days': {
        categories: ['Oct', 'Nov', 'Dec', 'Jan'],
        modelData: {
          gpt4: [3.2, 2.8, 2.4, 2.1],
          claude: [2.8, 2.4, 2.0, 1.7],
          gemini: [3.8, 3.4, 3.0, 2.7],
          llama: [4.8, 4.4, 4.0, 3.7]
        },
        personaData: {
          tech: [3.0, 2.6, 2.2, 1.9],
          business: [3.6, 3.2, 2.8, 2.5],
          developer: [2.2, 1.8, 1.4, 1.1]
        }
      }
    };
    return baseData[timeFilter];
  };

  const timeData = getTimeFilteredData();

  // Enhanced chart configurations with interactive legends
  const modelChartOptions = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: { show: false },
      animations: { enabled: true },
      events: {
        legendClick: function (chartContext, seriesIndex, config) {
          handleModelLegendClick(seriesIndex);
          return false; // Prevent default ApexCharts legend behavior
        }
      }
    },
    colors: ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'],
    stroke: {
      width: 3,
      curve: 'smooth',
      opacity: selectedModel === 'all' ? [1, 1, 1, 1] : [
        selectedModel === 'gpt4' ? 1 : 0.3,
        selectedModel === 'claude' ? 1 : 0.3,
        selectedModel === 'gemini' ? 1 : 0.3,
        selectedModel === 'llama' ? 1 : 0.3
      ]
    },
    fill: {
      opacity: selectedModel === 'all' ? [1, 1, 1, 1] : [
        selectedModel === 'gpt4' ? 1 : 0.3,
        selectedModel === 'claude' ? 1 : 0.3,
        selectedModel === 'gemini' ? 1 : 0.3,
        selectedModel === 'llama' ? 1 : 0.3
      ]
    },
    markers: {
      size: 4,
      colors: ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
        sizeOffset: 2
      }
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
      min: 1,
      max: 5,
      reversed: true, // Lower rank numbers are better
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      markers: {
        width: 12,
        height: 3,
        strokeWidth: 0,
        radius: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: false // Disable default behavior, we handle it manually
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const modelNames = ['GPT-4', 'Claude', 'Gemini', 'Llama'];
        const category = w.globals.categoryLabels[dataPointIndex];

        let tooltipContent = `<div class="custom-tooltip" style="padding: 8px 12px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${category}</div>`;

        series.forEach((seriesData, index) => {
          const value = seriesData[dataPointIndex];
          const color = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'][index];
          tooltipContent += `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%; margin-right: 8px;"></div>
              <span style="font-size: 12px; color: #64748b;">${modelNames[index]}: <strong>Rank ${value}</strong></span>
            </div>`;
        });

        tooltipContent += `<div style="font-size: 10px; color: #94a3b8; margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 4px;">Click legend to filter</div></div>`;

        return tooltipContent;
      }
    }
  };

  const modelChartSeries = [
    {
      name: 'GPT-4',
      data: timeData.modelData.gpt4
    },
    {
      name: 'Claude',
      data: timeData.modelData.claude
    },
    {
      name: 'Gemini',
      data: timeData.modelData.gemini
    },
    {
      name: 'Llama',
      data: timeData.modelData.llama
    }
  ].map((series, index) => {
    const modelNames = ['gpt4', 'claude', 'gemini', 'llama'];
    const isSelected = selectedModel === 'all' || selectedModel === modelNames[index];
    return {
      ...series,
      opacity: isSelected ? 1 : 0.3
    };
  });

  const personaChartOptions = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: { show: false },
      animations: { enabled: true },
      events: {
        legendClick: function (chartContext, seriesIndex, config) {
          handlePersonaLegendClick(seriesIndex);
          return false; // Prevent default ApexCharts legend behavior
        }
      }
    },
    colors: ['#6366f1', '#10b981', '#f59e0b'],
    stroke: {
      width: 3,
      curve: 'smooth',
      opacity: selectedPersona === 'all' ? [1, 1, 1] : [
        selectedPersona === 'tech' ? 1 : 0.3,
        selectedPersona === 'business' ? 1 : 0.3,
        selectedPersona === 'developer' ? 1 : 0.3
      ]
    },
    fill: {
      opacity: selectedPersona === 'all' ? [1, 1, 1] : [
        selectedPersona === 'tech' ? 1 : 0.3,
        selectedPersona === 'business' ? 1 : 0.3,
        selectedPersona === 'developer' ? 1 : 0.3
      ]
    },
    markers: {
      size: 4,
      colors: ['#6366f1', '#10b981', '#f59e0b'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
        sizeOffset: 2
      }
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
      min: 1,
      max: 5,
      reversed: true, // Lower rank numbers are better
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      markers: {
        width: 12,
        height: 3,
        strokeWidth: 0,
        radius: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: false // Disable default behavior
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const personaNames = ['Tech Enthusiast', 'Business Executive', 'Developer'];
        const category = w.globals.categoryLabels[dataPointIndex];

        let tooltipContent = `<div class="custom-tooltip" style="padding: 8px 12px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${category}</div>`;

        series.forEach((seriesData, index) => {
          const value = seriesData[dataPointIndex];
          const color = ['#6366f1', '#10b981', '#f59e0b'][index];
          tooltipContent += `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%; margin-right: 8px;"></div>
              <span style="font-size: 12px; color: #64748b;">${personaNames[index]}: <strong>Rank ${value}</strong></span>
            </div>`;
        });

        tooltipContent += `<div style="font-size: 10px; color: #94a3b8; margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 4px;">Click legend to filter</div></div>`;

        return tooltipContent;
      }
    }
  };

  const personaChartSeries = [
    {
      name: 'Tech Enthusiast',
      data: timeData.personaData.tech
    },
    {
      name: 'Business Executive',
      data: timeData.personaData.business
    },
    {
      name: 'Developer',
      data: timeData.personaData.developer
    }
  ].map((series, index) => {
    const personaNames = ['tech', 'business', 'developer'];
    const isSelected = selectedPersona === 'all' || selectedPersona === personaNames[index];
    return {
      ...series,
      opacity: isSelected ? 1 : 0.3
    };
  });

  const competitionChartOptions = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: { show: false },
      animations: { enabled: true },
      events: {
        legendClick: function (chartContext, seriesIndex, config) {
          handleCompetitionLegendClick(seriesIndex);
          return false; // Prevent default behavior
        }
      }
    },
    colors: ['#6366f1', '#ef4444', '#f59e0b'],
    stroke: {
      width: [4, 3, 3],
      curve: 'smooth'
    },
    markers: {
      size: 4,
      colors: ['#6366f1', '#ef4444', '#f59e0b'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
        sizeOffset: 2
      }
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
      min: 1,
      max: 5,
      reversed: true, // Lower rank numbers are better
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      markers: {
        width: 12,
        height: 3,
        strokeWidth: 0,
        radius: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const companyNames = ['Your Brand', 'TechCorp', 'InnovateX'];
        const category = w.globals.categoryLabels[dataPointIndex];

        let tooltipContent = `<div class="custom-tooltip" style="padding: 8px 12px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${category}</div>`;

        series.forEach((seriesData, index) => {
          const value = seriesData[dataPointIndex];
          const color = ['#6366f1', '#ef4444', '#f59e0b'][index];
          tooltipContent += `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%; margin-right: 8px;"></div>
              <span style="font-size: 12px; color: #64748b;">${companyNames[index]}: <strong>Rank ${value}</strong></span>
            </div>`;
        });

        tooltipContent += `</div>`;

        return tooltipContent;
      }
    }
  };

  const competitionChartSeries = [
    {
      name: 'Your Brand (2.2)',
      data: [2.8, 2.6, 2.4, 2.2, 2.1]
    },
    {
      name: 'TechCorp (3.1)',
      data: [3.4, 3.3, 3.2, 3.1, 3.0]
    },
    {
      name: 'InnovateX (3.8)',
      data: [4.2, 4.1, 4.0, 3.9, 3.8]
    }
  ];

  // Filter data based on selections (with enhanced filtering based on chart interactions)
  const getFilteredIntentData = () => {
    let baseIntentData = [
      { intent: 'Product Comparison', rank: 2.3, trend: '-0.4', id: 'comparison' },
      { intent: 'Feature Inquiry', rank: 1.8, trend: '-0.2', id: 'feature' },
      { intent: 'Pricing Questions', rank: 3.2, trend: '+0.3', id: 'pricing' },
      { intent: 'Technical Support', rank: 1.4, trend: '-0.6', id: 'support' },
      { intent: 'Integration Help', rank: 2.7, trend: '-0.1', id: 'integration' }
    ];

    // Apply model filter influence on intent data
    if (selectedModel !== 'all') {
      baseIntentData = baseIntentData.map(item => ({
        ...item,
        rank: Math.max(1.0, Math.round((item.rank * (selectedModel === 'gpt4' ? 0.9 : selectedModel === 'claude' ? 0.8 : 1.1)) * 10) / 10)
      }));
    }

    // Apply persona filter influence on intent data
    if (selectedPersona !== 'all') {
      baseIntentData = baseIntentData.map(item => ({
        ...item,
        rank: Math.max(1.0, Math.round((item.rank * (selectedPersona === 'developer' ? 0.7 : selectedPersona === 'tech' ? 0.9 : 1.2)) * 10) / 10)
      }));
    }

    // Always return all data, filtering will be handled by opacity
    return baseIntentData;
  };

  const getFilteredGeographyData = () => {
    let baseGeographyData = [
      { region: 'North America', rank: 1.8, trend: '-0.3', id: 'na' },
      { region: 'Europe', rank: 2.4, trend: '-0.1', id: 'eu' },
      { region: 'Asia Pacific', rank: 2.9, trend: '+0.2', id: 'apac' },
      { region: 'Latin America', rank: 2.1, trend: '-0.4', id: 'latam' },
      { region: 'Middle East', rank: 2.6, trend: '-0.2', id: 'me' },
      { region: 'Africa', rank: 2.8, trend: '-0.1', id: 'africa' }
    ];

    // Apply model filter influence on geography data
    if (selectedModel !== 'all') {
      baseGeographyData = baseGeographyData.map(item => ({
        ...item,
        rank: Math.max(1.0, Math.round((item.rank * (selectedModel === 'gpt4' ? 0.9 : selectedModel === 'claude' ? 0.85 : 1.05)) * 10) / 10)
      }));
    }

    // Apply persona filter influence on geography data
    if (selectedPersona !== 'all') {
      baseGeographyData = baseGeographyData.map(item => ({
        ...item,
        rank: Math.max(1.0, Math.round((item.rank * (selectedPersona === 'tech' ? 0.8 : selectedPersona === 'business' ? 1.1 : 0.9)) * 10) / 10)
      }));
    }

    // Always return all data, filtering will be handled by opacity
    return baseGeographyData;
  };

  const intentData = getFilteredIntentData();
  const geographyData = getFilteredGeographyData();

  const categoryData = [
    { category: 'Brand Comparison', rank: 1.8, queries: 234 },
    { category: 'Feature Questions', rank: 2.1, queries: 189 },
    { category: 'Best Practices', rank: 2.4, queries: 156 },
    { category: 'Product Reviews', rank: 1.9, queries: 142 }
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedModel !== 'all') count++;
    if (selectedPersona !== 'all') count++;
    if (selectedGeography !== 'all') count++;
    if (selectedIntent !== 'all') count++;
    if (timeFilter !== '30days') count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  // Helper function to get active filter labels
  const getActiveFilterLabels = () => {
    const labels = [];
    if (selectedModel !== 'all') {
      const modelLabels = { gpt4: 'GPT-4', claude: 'Claude', gemini: 'Gemini', llama: 'Llama' };
      labels.push(`Model: ${modelLabels[selectedModel]}`);
    }
    if (selectedPersona !== 'all') {
      const personaLabels = { tech: 'Tech Enthusiast', business: 'Business Executive', developer: 'Developer' };
      labels.push(`Persona: ${personaLabels[selectedPersona]}`);
    }
    if (selectedGeography !== 'all') {
      const geoLabels = { na: 'North America', eu: 'Europe', apac: 'Asia Pacific', latam: 'Latin America', me: 'Middle East', africa: 'Africa' };
      labels.push(`Geography: ${geoLabels[selectedGeography]}`);
    }
    if (selectedIntent !== 'all') {
      const intentLabels = { comparison: 'Product Comparison', feature: 'Feature Inquiry', pricing: 'Pricing Questions', support: 'Technical Support', integration: 'Integration Help' };
      labels.push(`Intent: ${intentLabels[selectedIntent]}`);
    }
    if (timeFilter !== '30days') {
      const timeLabels = { '7days': 'Last 7 Days', '30days': 'Last 30 Days', '90days': 'Last 90 Days' };
      labels.push(`Time: ${timeLabels[timeFilter]}`);
    }
    return labels;
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
              Monitor your ranking positions across queries and identify optimization opportunities
            </Typography>
            {activeFiltersCount > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                  Active Filters: {getActiveFilterLabels().join(' • ')}
                </Typography>
              </Box>
            )}
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
              modifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [0, 8],
                  },
                },
                {
                  name: 'preventOverflow',
                  options: {
                    boundary: 'viewport',
                    altAxis: true,
                    padding: 8,
                  },
                },
              ]}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper
                    sx={{
                      p: 3,
                      mt: 1,
                      minWidth: 320,
                      maxWidth: 400,
                      zIndex: 10000,
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      position: 'relative'
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Filters
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={handleFilterClose}
                          sx={{ color: 'text.secondary' }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Stack spacing={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Time Period</InputLabel>
                          <Select
                            value={timeFilter}
                            label="Time Period"
                            open={openSelect === 'timePeriod'}
                            onOpen={() => handleSelectOpen('timePeriod')}
                            onClose={handleSelectClose}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="7days">Last 7 Days</MenuItem>
                            <MenuItem value="30days">Last 30 Days</MenuItem>
                            <MenuItem value="90days">Last 90 Days</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Model</InputLabel>
                          <Select
                            value={selectedModel}
                            label="Model"
                            open={openSelect === 'model'}
                            onOpen={() => handleSelectOpen('model')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
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
                            value={selectedPersona}
                            label="Persona"
                            open={openSelect === 'persona'}
                            onOpen={() => handleSelectOpen('persona')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedPersona(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="all">All Personas</MenuItem>
                            <MenuItem value="tech">Tech Enthusiast</MenuItem>
                            <MenuItem value="business">Business Executive</MenuItem>
                            <MenuItem value="developer">Developer</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Intent</InputLabel>
                          <Select
                            value={selectedIntent}
                            label="Intent"
                            open={openSelect === 'intent'}
                            onOpen={() => handleSelectOpen('intent')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedIntent(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="all">All Intents</MenuItem>
                            <MenuItem value="comparison">Product Comparison</MenuItem>
                            <MenuItem value="feature">Feature Inquiry</MenuItem>
                            <MenuItem value="pricing">Pricing Questions</MenuItem>
                            <MenuItem value="support">Technical Support</MenuItem>
                            <MenuItem value="integration">Integration Help</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Geography</InputLabel>
                          <Select
                            value={selectedGeography}
                            label="Geography"
                            open={openSelect === 'geography'}
                            onOpen={() => handleSelectOpen('geography')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedGeography(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="all">All Regions</MenuItem>
                            <MenuItem value="na">North America</MenuItem>
                            <MenuItem value="eu">Europe</MenuItem>
                            <MenuItem value="apac">Asia Pacific</MenuItem>
                            <MenuItem value="latam">Latin America</MenuItem>
                            <MenuItem value="me">Middle East</MenuItem>
                            <MenuItem value="africa">Africa</MenuItem>
                          </Select>
                        </FormControl>

                        <Box sx={{ pt: 1 }}>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={resetFilters}
                            disabled={activeFiltersCount === 0}
                          >
                            Clear All Filters
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Stack>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 0 }}>
                  Average Rank by AI Model
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Click legend to filter
                </Typography>
              </Box>
              <Box sx={{ flex: 1, width: '100%' }}>
                <Chart
                  options={modelChartOptions}
                  series={modelChartSeries}
                  type="line"
                  height="100%"
                  width="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Average Rank by Intent Category
              </Typography>
              <Box sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
                {intentData.map((item, i) => {
                  const isSelected = selectedIntent === 'all' || selectedIntent === item.id;

                  return (
                    <Box
                      key={item.id}
                      sx={{
                        mb: 0,
                        cursor: 'pointer',
                        opacity: isSelected ? 1 : 0.3,
                        transition: 'all 0.3s ease',
                        p: 1.5,
                        '&:hover': {
                          bgcolor: 'action.hover',
                          opacity: 0.8
                        }
                      }}
                      onClick={() => setSelectedIntent(selectedIntent === item.id ? 'all' : item.id)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12 }}>
                          {item.intent}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>
                            {item.rank}
                          </Typography>
                          <Chip
                            label={item.trend}
                            size="small"
                            color={item.trend.startsWith('-') ? 'success' : 'error'}
                            sx={{ fontSize: 9, height: 18, minWidth: 45 }}
                          />
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(5 - item.rank) * 20}
                        sx={{ height: 5, borderRadius: 1 }}
                        color={item.rank <= 2 ? 'success' : item.rank <= 3 ? 'warning' : 'error'}
                      />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 0 }}>
                  Average Rank by Target Persona
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Click legend to filter
                </Typography>
              </Box>
              <Box sx={{ flex: 1, width: '100%' }}>
                <Chart
                  options={personaChartOptions}
                  series={personaChartSeries}
                  type="line"
                  height="100%"
                  width="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Average Rank by Geography
              </Typography>
              <Box sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
                {geographyData.map((item, i) => {
                  const isSelected = selectedGeography === 'all' || selectedGeography === item.id;

                  return (
                    <Box
                      key={item.id}
                      sx={{
                        mb: 0,
                        cursor: 'pointer',
                        opacity: isSelected ? 1 : 0.3,
                        transition: 'all 0.3s ease',
                        p: 1.5,
                        '&:hover': {
                          bgcolor: 'action.hover',
                          opacity: 0.8
                        }
                      }}
                      onClick={() => setSelectedGeography(selectedGeography === item.id ? 'all' : item.id)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12 }}>
                          {item.region}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>
                            {item.rank}
                          </Typography>
                          <Chip
                            label={item.trend}
                            size="small"
                            color={item.trend.startsWith('-') ? 'success' : 'error'}
                            sx={{ fontSize: 9, height: 18, minWidth: 45 }}
                          />
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(5 - item.rank) * 20}
                        sx={{ height: 5, borderRadius: 1 }}
                        color={item.rank <= 2 ? 'success' : item.rank <= 3 ? 'warning' : 'error'}
                      />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 0 }}>
                  Average Rank vs Competition
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Interactive view
                </Typography>
              </Box>
              <Box sx={{ flex: 1, width: '100%' }}>
                <Chart
                  options={competitionChartOptions}
                  series={competitionChartSeries}
                  type="line"
                  height="100%"
                  width="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Top Query Categories with Avg Rank
              </Typography>
              <Box sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
                {categoryData.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      mb: 0,
                      p: 1.5,
                      bgcolor: item.rank <= 2 ? '#f0fdf4' : item.rank <= 2.5 ? '#fffbeb' : '#fef2f2',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          fontSize: 12
                        }}
                      >
                        {item.category}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          fontSize: 12,
                          color: item.rank <= 2 ? '#10b981' : item.rank <= 2.5 ? '#f59e0b' : '#ef4444'
                        }}
                      >
                        {item.rank}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                        {item.queries.toLocaleString()} queries
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(5 - item.rank) * 20}
                        sx={{
                          height: 5,
                          borderRadius: 1,
                          width: '60%',
                          ml: 1
                        }}
                        color={item.rank <= 2 ? 'success' : item.rank <= 2.5 ? 'warning' : 'error'}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

// Perception Analytics Screen
const PerceptionAnalyticsScreen = () => {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [showFilters, setShowFilters] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedPersona, setSelectedPersona] = useState('all');
  const [selectedGeography, setSelectedGeography] = useState('all');
  const [selectedIntent, setSelectedIntent] = useState('all');
  const [openSelect, setOpenSelect] = useState(null);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowFilters(!showFilters);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setShowFilters(false);
    setOpenSelect(null);
  };

  const handleSelectOpen = (selectName) => {
    setOpenSelect(selectName);
  };

  const handleSelectClose = () => {
    setOpenSelect(null);
  };

  const resetFilters = () => {
    setTimeFilter('30days');
    setSelectedModel('all');
    setSelectedPersona('all');
    setSelectedGeography('all');
    setSelectedIntent('all');
  };

  // Handle model legend clicks
  const handleModelLegendClick = (seriesIndex) => {
    const modelNames = ['gpt4', 'claude', 'gemini', 'llama'];
    const clickedModel = modelNames[seriesIndex];
    setSelectedModel(selectedModel === clickedModel ? 'all' : clickedModel);
  };

  // Handle persona legend clicks
  const handlePersonaLegendClick = (seriesIndex) => {
    const personaNames = ['tech', 'business', 'developer'];
    const clickedPersona = personaNames[seriesIndex];
    setSelectedPersona(selectedPersona === clickedPersona ? 'all' : clickedPersona);
  };

  // Handle competition legend clicks
  const handleCompetitionLegendClick = (seriesIndex) => {
    // Competition chart doesn't filter other data, but can toggle series visibility
    console.log('Competition series clicked:', seriesIndex);
  };

  // Generate filtered data based on time filter
  const getTimeFilteredData = () => {
    const baseData = {
      '7days': {
        categories: ['Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30'],
        modelData: {
          gpt4: [76, 77, 78, 77, 79, 78, 79],
          claude: [82, 83, 84, 83, 85, 84, 85],
          gemini: [68, 69, 70, 69, 71, 70, 71],
          llama: [61, 62, 63, 62, 64, 63, 64]
        },
        personaData: {
          tech: [74, 75, 76, 75, 77, 76, 77],
          business: [69, 70, 71, 70, 72, 71, 72],
          developer: [84, 85, 86, 85, 87, 86, 87]
        }
      },
      '30days': {
        categories: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 30'],
        modelData: {
          gpt4: [72, 74, 76, 78, 79],
          claude: [78, 80, 82, 84, 85],
          gemini: [64, 66, 68, 70, 71],
          llama: [57, 59, 61, 63, 64]
        },
        personaData: {
          tech: [70, 72, 74, 76, 77],
          business: [65, 67, 69, 71, 72],
          developer: [80, 82, 84, 86, 87]
        }
      },
      '90days': {
        categories: ['Oct', 'Nov', 'Dec', 'Jan'],
        modelData: {
          gpt4: [68, 72, 76, 79],
          claude: [74, 78, 82, 85],
          gemini: [60, 64, 68, 71],
          llama: [53, 57, 61, 64]
        },
        personaData: {
          tech: [66, 70, 74, 77],
          business: [61, 65, 69, 72],
          developer: [76, 80, 84, 87]
        }
      }
    };
    return baseData[timeFilter];
  };

  const timeData = getTimeFilteredData();

  // Enhanced chart configurations with interactive legends
  const modelChartOptions = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: { show: false },
      animations: { enabled: true },
      events: {
        legendClick: function (chartContext, seriesIndex, config) {
          handleModelLegendClick(seriesIndex);
          return false; // Prevent default ApexCharts legend behavior
        }
      }
    },
    colors: ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'],
    stroke: {
      width: 3,
      curve: 'smooth',
      opacity: selectedModel === 'all' ? [1, 1, 1, 1] : [
        selectedModel === 'gpt4' ? 1 : 0.3,
        selectedModel === 'claude' ? 1 : 0.3,
        selectedModel === 'gemini' ? 1 : 0.3,
        selectedModel === 'llama' ? 1 : 0.3
      ]
    },
    fill: {
      opacity: selectedModel === 'all' ? [1, 1, 1, 1] : [
        selectedModel === 'gpt4' ? 1 : 0.3,
        selectedModel === 'claude' ? 1 : 0.3,
        selectedModel === 'gemini' ? 1 : 0.3,
        selectedModel === 'llama' ? 1 : 0.3
      ]
    },
    markers: {
      size: 4,
      colors: ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
        sizeOffset: 2
      }
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      markers: {
        width: 12,
        height: 3,
        strokeWidth: 0,
        radius: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: false // Disable default behavior, we handle it manually
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const modelNames = ['GPT-4', 'Claude', 'Gemini', 'Llama'];
        const category = w.globals.categoryLabels[dataPointIndex];

        let tooltipContent = `<div class="custom-tooltip" style="padding: 8px 12px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${category}</div>`;

        series.forEach((seriesData, index) => {
          const value = seriesData[dataPointIndex];
          const color = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'][index];
          tooltipContent += `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%; margin-right: 8px;"></div>
              <span style="font-size: 12px; color: #64748b;">${modelNames[index]}: <strong>${value}%</strong></span>
            </div>`;
        });

        tooltipContent += `<div style="font-size: 10px; color: #94a3b8; margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 4px;">Click legend to filter</div></div>`;

        return tooltipContent;
      }
    }
  };

  const modelChartSeries = [
    {
      name: 'GPT-4',
      data: timeData.modelData.gpt4
    },
    {
      name: 'Claude',
      data: timeData.modelData.claude
    },
    {
      name: 'Gemini',
      data: timeData.modelData.gemini
    },
    {
      name: 'Llama',
      data: timeData.modelData.llama
    }
  ].map((series, index) => {
    const modelNames = ['gpt4', 'claude', 'gemini', 'llama'];
    const isSelected = selectedModel === 'all' || selectedModel === modelNames[index];
    return {
      ...series,
      opacity: isSelected ? 1 : 0.3
    };
  });

  const personaChartOptions = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: { show: false },
      animations: { enabled: true },
      events: {
        legendClick: function (chartContext, seriesIndex, config) {
          handlePersonaLegendClick(seriesIndex);
          return false; // Prevent default ApexCharts legend behavior
        }
      }
    },
    colors: ['#6366f1', '#10b981', '#f59e0b'],
    stroke: {
      width: 3,
      curve: 'smooth',
      opacity: selectedPersona === 'all' ? [1, 1, 1] : [
        selectedPersona === 'tech' ? 1 : 0.3,
        selectedPersona === 'business' ? 1 : 0.3,
        selectedPersona === 'developer' ? 1 : 0.3
      ]
    },
    fill: {
      opacity: selectedPersona === 'all' ? [1, 1, 1] : [
        selectedPersona === 'tech' ? 1 : 0.3,
        selectedPersona === 'business' ? 1 : 0.3,
        selectedPersona === 'developer' ? 1 : 0.3
      ]
    },
    markers: {
      size: 4,
      colors: ['#6366f1', '#10b981', '#f59e0b'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
        sizeOffset: 2
      }
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      markers: {
        width: 12,
        height: 3,
        strokeWidth: 0,
        radius: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: false // Disable default behavior
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const personaNames = ['Tech Enthusiast', 'Business Executive', 'Developer'];
        const category = w.globals.categoryLabels[dataPointIndex];

        let tooltipContent = `<div class="custom-tooltip" style="padding: 8px 12px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${category}</div>`;

        series.forEach((seriesData, index) => {
          const value = seriesData[dataPointIndex];
          const color = ['#6366f1', '#10b981', '#f59e0b'][index];
          tooltipContent += `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%; margin-right: 8px;"></div>
              <span style="font-size: 12px; color: #64748b;">${personaNames[index]}: <strong>${value}%</strong></span>
            </div>`;
        });

        tooltipContent += `<div style="font-size: 10px; color: #94a3b8; margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 4px;">Click legend to filter</div></div>`;

        return tooltipContent;
      }
    }
  };

  const personaChartSeries = [
    {
      name: 'Tech Enthusiast',
      data: timeData.personaData.tech
    },
    {
      name: 'Business Executive',
      data: timeData.personaData.business
    },
    {
      name: 'Developer',
      data: timeData.personaData.developer
    }
  ].map((series, index) => {
    const personaNames = ['tech', 'business', 'developer'];
    const isSelected = selectedPersona === 'all' || selectedPersona === personaNames[index];
    return {
      ...series,
      opacity: isSelected ? 1 : 0.3
    };
  });

  const competitionChartOptions = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: { show: false },
      animations: { enabled: true },
      events: {
        legendClick: function (chartContext, seriesIndex, config) {
          handleCompetitionLegendClick(seriesIndex);
          return false; // Prevent default behavior
        }
      }
    },
    colors: ['#6366f1', '#ef4444', '#f59e0b'],
    stroke: {
      width: [4, 3, 3],
      curve: 'smooth'
    },
    markers: {
      size: 4,
      colors: ['#6366f1', '#ef4444', '#f59e0b'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 6,
        sizeOffset: 2
      }
    },
    xaxis: {
      categories: timeData.categories,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: { style: { fontSize: '10px', colors: '#94a3b8' } }
    },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      markers: {
        width: 12,
        height: 3,
        strokeWidth: 0,
        radius: 2
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const companyNames = ['Your Brand', 'TechCorp', 'InnovateX'];
        const category = w.globals.categoryLabels[dataPointIndex];

        let tooltipContent = `<div class="custom-tooltip" style="padding: 8px 12px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${category}</div>`;

        series.forEach((seriesData, index) => {
          const value = seriesData[dataPointIndex];
          const color = ['#6366f1', '#ef4444', '#f59e0b'][index];
          tooltipContent += `
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <div style="width: 8px; height: 8px; background: ${color}; border-radius: 50%; margin-right: 8px;"></div>
              <span style="font-size: 12px; color: #64748b;">${companyNames[index]}: <strong>${value}%</strong></span>
            </div>`;
        });

        tooltipContent += `</div>`;

        return tooltipContent;
      }
    }
  };

  const competitionChartSeries = [
    {
      name: 'Your Brand (78%)',
      data: [74, 76, 78, 80, 82]
    },
    {
      name: 'TechCorp (65%)',
      data: [61, 63, 65, 67, 69]
    },
    {
      name: 'InnovateX (58%)',
      data: [54, 56, 58, 60, 62]
    }
  ];

  // Filter data based on selections (with enhanced filtering based on chart interactions)
  const getFilteredIntentData = () => {
    let baseIntentData = [
      { intent: 'Product Comparison', score: 78, trend: '+2.1%', id: 'comparison' },
      { intent: 'Feature Inquiry', score: 85, trend: '+1.8%', id: 'feature' },
      { intent: 'Pricing Questions', score: 62, trend: '-0.5%', id: 'pricing' },
      { intent: 'Technical Support', score: 91, trend: '+3.2%', id: 'support' },
      { intent: 'Integration Help', score: 74, trend: '+0.9%', id: 'integration' }
    ];

    // Apply model filter influence on intent data
    if (selectedModel !== 'all') {
      baseIntentData = baseIntentData.map(item => ({
        ...item,
        score: Math.round(item.score * (selectedModel === 'claude' ? 1.1 : selectedModel === 'gpt4' ? 1.05 : 0.95))
      }));
    }

    // Apply persona filter influence on intent data
    if (selectedPersona !== 'all') {
      baseIntentData = baseIntentData.map(item => ({
        ...item,
        score: Math.round(item.score * (selectedPersona === 'developer' ? 1.15 : selectedPersona === 'tech' ? 1.05 : 0.9))
      }));
    }

    // Always return all data, filtering will be handled by opacity
    return baseIntentData;
  };

  const getFilteredGeographyData = () => {
    let baseGeographyData = [
      { region: 'North America', score: 79, trend: '+1.2%', id: 'na' },
      { region: 'Europe', score: 73, trend: '+0.8%', id: 'eu' },
      { region: 'Asia Pacific', score: 68, trend: '-0.3%', id: 'apac' },
      { region: 'Latin America', score: 81, trend: '+2.1%', id: 'latam' },
      { region: 'Middle East', score: 71, trend: '+0.5%', id: 'me' },
      { region: 'Africa', score: 76, trend: '+1.8%', id: 'africa' }
    ];

    // Apply model filter influence on geography data
    if (selectedModel !== 'all') {
      baseGeographyData = baseGeographyData.map(item => ({
        ...item,
        score: Math.round(item.score * (selectedModel === 'claude' ? 1.08 : selectedModel === 'gpt4' ? 1.04 : 0.96))
      }));
    }

    // Apply persona filter influence on geography data
    if (selectedPersona !== 'all') {
      baseGeographyData = baseGeographyData.map(item => ({
        ...item,
        score: Math.round(item.score * (selectedPersona === 'tech' ? 1.05 : selectedPersona === 'business' ? 0.95 : 1.1))
      }));
    }

    // Always return all data, filtering will be handled by opacity
    return baseGeographyData;
  };

  const intentData = getFilteredIntentData();
  const geographyData = getFilteredGeographyData();

  const citationsData = [
    { source: 'Company Website', score: 92, mentions: 89 },
    { source: 'Wikipedia', score: 78, mentions: 156 },
    { source: 'TechCrunch', score: 84, mentions: 67 },
    { source: 'Forbes', score: 88, mentions: 45 }
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedModel !== 'all') count++;
    if (selectedPersona !== 'all') count++;
    if (selectedGeography !== 'all') count++;
    if (selectedIntent !== 'all') count++;
    if (timeFilter !== '30days') count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  // Helper function to get active filter labels
  const getActiveFilterLabels = () => {
    const labels = [];
    if (selectedModel !== 'all') {
      const modelLabels = { gpt4: 'GPT-4', claude: 'Claude', gemini: 'Gemini', llama: 'Llama' };
      labels.push(`Model: ${modelLabels[selectedModel]}`);
    }
    if (selectedPersona !== 'all') {
      const personaLabels = { tech: 'Tech Enthusiast', business: 'Business Executive', developer: 'Developer' };
      labels.push(`Persona: ${personaLabels[selectedPersona]}`);
    }
    if (selectedGeography !== 'all') {
      const geoLabels = { na: 'North America', eu: 'Europe', apac: 'Asia Pacific', latam: 'Latin America', me: 'Middle East', africa: 'Africa' };
      labels.push(`Geography: ${geoLabels[selectedGeography]}`);
    }
    if (selectedIntent !== 'all') {
      const intentLabels = { comparison: 'Product Comparison', feature: 'Feature Inquiry', pricing: 'Pricing Questions', support: 'Technical Support', integration: 'Integration Help' };
      labels.push(`Intent: ${intentLabels[selectedIntent]}`);
    }
    if (timeFilter !== '30days') {
      const timeLabels = { '7days': 'Last 7 Days', '30days': 'Last 30 Days', '90days': 'Last 90 Days' };
      labels.push(`Time: ${timeLabels[timeFilter]}`);
    }
    return labels;
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
              Deep dive into how AI models perceive and present your brand sentiment
            </Typography>
            {activeFiltersCount > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }}>
                  Active Filters: {getActiveFilterLabels().join(' • ')}
                </Typography>
              </Box>
            )}
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
              modifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [0, 8],
                  },
                },
                {
                  name: 'preventOverflow',
                  options: {
                    boundary: 'viewport',
                    altAxis: true,
                    padding: 8,
                  },
                },
              ]}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper
                    sx={{
                      p: 3,
                      mt: 1,
                      minWidth: 320,
                      maxWidth: 400,
                      zIndex: 10000,
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      position: 'relative'
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Filters
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={handleFilterClose}
                          sx={{ color: 'text.secondary' }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Stack spacing={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Time Period</InputLabel>
                          <Select
                            value={timeFilter}
                            label="Time Period"
                            open={openSelect === 'timePeriod'}
                            onOpen={() => handleSelectOpen('timePeriod')}
                            onClose={handleSelectClose}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="7days">Last 7 Days</MenuItem>
                            <MenuItem value="30days">Last 30 Days</MenuItem>
                            <MenuItem value="90days">Last 90 Days</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Model</InputLabel>
                          <Select
                            value={selectedModel}
                            label="Model"
                            open={openSelect === 'model'}
                            onOpen={() => handleSelectOpen('model')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
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
                            value={selectedPersona}
                            label="Persona"
                            open={openSelect === 'persona'}
                            onOpen={() => handleSelectOpen('persona')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedPersona(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="all">All Personas</MenuItem>
                            <MenuItem value="tech">Tech Enthusiast</MenuItem>
                            <MenuItem value="business">Business Executive</MenuItem>
                            <MenuItem value="developer">Developer</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Intent</InputLabel>
                          <Select
                            value={selectedIntent}
                            label="Intent"
                            open={openSelect === 'intent'}
                            onOpen={() => handleSelectOpen('intent')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedIntent(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="all">All Intents</MenuItem>
                            <MenuItem value="comparison">Product Comparison</MenuItem>
                            <MenuItem value="feature">Feature Inquiry</MenuItem>
                            <MenuItem value="pricing">Pricing Questions</MenuItem>
                            <MenuItem value="support">Technical Support</MenuItem>
                            <MenuItem value="integration">Integration Help</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <InputLabel>Geography</InputLabel>
                          <Select
                            value={selectedGeography}
                            label="Geography"
                            open={openSelect === 'geography'}
                            onOpen={() => handleSelectOpen('geography')}
                            onClose={handleSelectClose}
                            onChange={(e) => setSelectedGeography(e.target.value)}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  zIndex: 99999,
                                  maxHeight: 200
                                }
                              },
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null
                            }}
                          >
                            <MenuItem value="all">All Regions</MenuItem>
                            <MenuItem value="na">North America</MenuItem>
                            <MenuItem value="eu">Europe</MenuItem>
                            <MenuItem value="apac">Asia Pacific</MenuItem>
                            <MenuItem value="latam">Latin America</MenuItem>
                            <MenuItem value="me">Middle East</MenuItem>
                            <MenuItem value="africa">Africa</MenuItem>
                          </Select>
                        </FormControl>

                        <Box sx={{ pt: 1 }}>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={resetFilters}
                            disabled={activeFiltersCount === 0}
                          >
                            Clear All Filters
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Stack>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 0 }}>
                  Perception by AI Model
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Click legend to filter
                </Typography>
              </Box>
              <Box sx={{ flex: 1, width: '100%' }}>
                <Chart
                  options={modelChartOptions}
                  series={modelChartSeries}
                  type="line"
                  height="100%"
                  width="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Perception by Intent Category
              </Typography>
              <Box sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
                {intentData.map((item, i) => {
                  const isSelected = selectedIntent === 'all' || selectedIntent === item.id;

                  return (
                    <Box
                      key={item.id}
                      sx={{
                        mb: 0,
                        cursor: 'pointer',
                        opacity: isSelected ? 1 : 0.3,
                        transition: 'all 0.3s ease',
                        p: 1.5,
                        '&:hover': {
                          bgcolor: 'action.hover',
                          opacity: 0.8
                        }
                      }}
                      onClick={() => setSelectedIntent(selectedIntent === item.id ? 'all' : item.id)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12 }}>
                          {item.intent}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>
                            {item.score}%
                          </Typography>
                          <Chip
                            label={item.trend}
                            size="small"
                            color={item.trend.startsWith('+') ? 'success' : 'error'}
                            sx={{ fontSize: 9, height: 18, minWidth: 45 }}
                          />
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.score}
                        sx={{ height: 5, borderRadius: 1 }}
                        color={item.score >= 80 ? 'success' : item.score >= 70 ? 'warning' : 'error'}
                      />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 0 }}>
                  Perception by Target Persona
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Click legend to filter
                </Typography>
              </Box>
              <Box sx={{ flex: 1, width: '100%' }}>
                <Chart
                  options={personaChartOptions}
                  series={personaChartSeries}
                  type="line"
                  height="100%"
                  width="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Perception by Geography
              </Typography>
              <Box sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
                {geographyData.map((item, i) => {
                  const isSelected = selectedGeography === 'all' || selectedGeography === item.id;

                  return (
                    <Box
                      key={item.id}
                      sx={{
                        mb: 0,
                        cursor: 'pointer',
                        opacity: isSelected ? 1 : 0.3,
                        transition: 'all 0.3s ease',
                        p: 1.5,
                        '&:hover': {
                          bgcolor: 'action.hover',
                          opacity: 0.8
                        }
                      }}
                      onClick={() => setSelectedGeography(selectedGeography === item.id ? 'all' : item.id)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12 }}>
                          {item.region}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12 }}>
                            {item.score}%
                          </Typography>
                          <Chip
                            label={item.trend}
                            size="small"
                            color={item.trend.startsWith('+') ? 'success' : 'error'}
                            sx={{ fontSize: 9, height: 18, minWidth: 45 }}
                          />
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={item.score}
                        sx={{ height: 5, borderRadius: 1 }}
                        color={item.score >= 75 ? 'success' : item.score >= 70 ? 'warning' : 'error'}
                      />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 0 }}>
                  Perception vs Competition
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Interactive view
                </Typography>
              </Box>
              <Box sx={{ flex: 1, width: '100%' }}>
                <Chart
                  options={competitionChartOptions}
                  series={competitionChartSeries}
                  type="line"
                  height="100%"
                  width="100%"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card sx={{ height: 350, width: '100%' }}>
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Top Citations with Perception Score
              </Typography>
              <Box sx={{ flex: 1, overflow: 'auto', width: '100%' }}>
                {citationsData.map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      mb: 0,
                      p: 1.5,
                      bgcolor: item.score >= 85 ? '#f0fdf4' : item.score >= 75 ? '#fffbeb' : '#fef2f2',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          fontSize: 12
                        }}
                      >
                        {item.source}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          fontSize: 12,
                          color: item.score >= 85 ? '#10b981' : item.score >= 75 ? '#f59e0b' : '#ef4444'
                        }}
                      >
                        {item.score}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                        {item.mentions.toLocaleString()} mentions
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.score}
                        sx={{
                          height: 5,
                          borderRadius: 1,
                          width: '60%',
                          ml: 1
                        }}
                        color={item.score >= 85 ? 'success' : item.score >= 75 ? 'warning' : 'error'}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

// Prompt Analytics Screen
const PromptAnalyticsScreen = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  const [filters, setFilters] = useState({
    timeRange: '30d',
    model: 'all',
    mentioned: 'all',
    intent: 'all',
    persona: 'all',
    geography: 'all'
  });

  const promptData = [
    {
      id: 1,
      prompt: "What are the best cloud computing platforms for startups looking to scale quickly?",
      definition: {
        intent: "Product Recommendation",
        persona: "Startup Founder",
        geography: "US"
      },
      response: "For startups looking to scale quickly, I'd recommend considering several cloud platforms. AWS offers the most comprehensive services with excellent scalability. Google Cloud provides strong AI/ML capabilities. Microsoft Azure integrates well with existing enterprise tools. Acme Corp's cloud solutions also offer competitive pricing and dedicated startup support programs with 24/7 technical assistance.",
      model: "GPT-4",
      analysis: {
        mentioned: "Yes",
        ranking: 4,
        perception: "Positive - Competitive pricing, good support",
        competitors: [
          { name: "AWS", ranking: 1, perception: "Industry leader - Comprehensive services" },
          { name: "Google Cloud", ranking: 2, perception: "Strong in AI/ML - Technical excellence" },
          { name: "Microsoft Azure", ranking: 3, perception: "Enterprise integration - Reliable platform" }
        ]
      },
      timestamp: "2024-01-15 14:30"
    },
    {
      id: 2,
      prompt: "Compare enterprise cloud migration strategies and tools",
      definition: {
        intent: "Comparison",
        persona: "Enterprise CTO",
        geography: "EU"
      },
      response: "Enterprise cloud migration requires careful planning and the right tools. Leading solutions include AWS Migration Hub, Azure Migrate, and Google Cloud Migration Center.",
      model: "Claude",
      analysis: {
        mentioned: "No",
        ranking: null,
        perception: null,
        competitors: [
          { name: "AWS", ranking: 1, perception: "Most comprehensive migration tools" },
          { name: "Azure", ranking: 2, perception: "Strong enterprise integration" },
          { name: "Google Cloud", ranking: 3, perception: "Good assessment capabilities" }
        ]
      },
      timestamp: "2024-01-15 16:45"
    }
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
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
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
              Prompt-level Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed analysis of user queries and AI responses
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={filters.timeRange}
                label="Time Range"
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
              >
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
                <MenuItem value="90d">Last 90 days</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Model</InputLabel>
              <Select
                value={filters.model}
                label="Model"
                onChange={(e) => handleFilterChange('model', e.target.value)}
              >
                <MenuItem value="all">All Models</MenuItem>
                <MenuItem value="GPT-4">GPT-4</MenuItem>
                <MenuItem value="Claude">Claude</MenuItem>
                <MenuItem value="Gemini">Gemini</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Mentioned</InputLabel>
              <Select
                value={filters.mentioned}
                label="Mentioned"
                onChange={(e) => handleFilterChange('mentioned', e.target.value)}
              >
                <MenuItem value="all">All Mentions</MenuItem>
                <MenuItem value="yes">Mentioned</MenuItem>
                <MenuItem value="no">Not Mentioned</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Box>

      <Card variant="outlined" sx={{ mb: 2, p: 1.5, bgcolor: 'grey.50' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {promptData.length} of {promptData.length} prompts
        </Typography>
      </Card>

      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '20%', fontWeight: 600 }}>Prompt</TableCell>
                <TableCell sx={{ width: '15%', fontWeight: 600 }}>Prompt Definition</TableCell>
                <TableCell sx={{ width: '25%', fontWeight: 600 }}>Response</TableCell>
                <TableCell align="center" sx={{ width: '10%', fontWeight: 600 }}>AI Model</TableCell>
                <TableCell sx={{ width: '20%', fontWeight: 600 }}>Response Analysis</TableCell>
                <TableCell align="center" sx={{ width: '10%', fontWeight: 600 }}>Detailed Report</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promptData.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ verticalAlign: 'top' }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.5, maxHeight: 80, overflow: 'hidden' }}>
                      {item.prompt}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                      {item.timestamp}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ verticalAlign: 'top', fontSize: 12 }}>
                    <Box sx={{ mb: 0.75 }}>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>Intent:</Typography>
                      <Typography variant="body2" color="text.secondary">{item.definition.intent}</Typography>
                    </Box>
                    <Box sx={{ mb: 0.75 }}>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>Persona:</Typography>
                      <Typography variant="body2" color="text.secondary">{item.definition.persona}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>Geography:</Typography>
                      <Typography variant="body2" color="text.secondary">{item.definition.geography}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ verticalAlign: 'top' }}>
                    <Typography variant="body2" color="text.secondary" sx={{
                      lineHeight: 1.4,
                      maxHeight: 100,
                      overflow: 'hidden'
                    }}>
                      {item.response}
                    </Typography>
                  </TableCell>

                  <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                    <Chip
                      label={item.model}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell sx={{ verticalAlign: 'top', fontSize: 12 }}>
                    <Box sx={{ mb: 0.75 }}>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>Mentioned:</Typography>
                      <Chip
                        label={item.analysis.mentioned}
                        size="small"
                        color={item.analysis.mentioned === 'Yes' ? 'success' : 'error'}
                        sx={{ ml: 0.75, fontSize: 10 }}
                      />
                    </Box>

                    {item.analysis.mentioned === 'Yes' && (
                      <>
                        <Box sx={{ mb: 0.75 }}>
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>Ranking:</Typography>
                          <Chip
                            label={`#${item.analysis.ranking}`}
                            size="small"
                            variant="outlined"
                            sx={{ ml: 0.75, fontSize: 10 }}
                          />
                        </Box>

                        <Box sx={{ mb: 0.75 }}>
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>Perception:</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                            {item.analysis.perception}
                          </Typography>
                        </Box>
                      </>
                    )}

                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>Competitors:</Typography>
                      <Box sx={{ mt: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.25 }}>
                        {item.analysis.competitors.map((competitor, idx) => (
                          <Chip
                            key={idx}
                            label={competitor.name}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: 9 }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => setSelectedPrompt(item)}
                    >
                      View Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>

      {/* Detailed Report Dialog */}
      <Dialog
        open={!!selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { height: '90vh' } }}
      >
        {selectedPrompt && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Detailed Prompt Analysis
                </Typography>
                <IconButton onClick={() => setSelectedPrompt(null)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    bgcolor: selectedPrompt.analysis.mentioned === 'Yes' ? '#f0fdf4' : '#fef2f2',
                    borderColor: selectedPrompt.analysis.mentioned === 'Yes' ? '#bbf7d0' : '#fecaca'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {selectedPrompt.analysis.mentioned === 'Yes' ? '✅' : '❌'} Executive Summary
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {selectedPrompt.analysis.mentioned === 'Yes'
                      ? `Your brand was mentioned and ranked #${selectedPrompt.analysis.ranking} in this ${selectedPrompt.definition.intent.toLowerCase()} query.`
                      : `Your brand was not mentioned in this ${selectedPrompt.definition.intent.toLowerCase()} query. Consider optimizing content for better visibility.`
                    }
                  </Typography>
                </Card>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                    Prompt Details
                  </Typography>
                  <Card variant="outlined" sx={{ p: 1.5, mb: 1.5, bgcolor: 'grey.50' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0.5 }}>
                      Test Prompt
                    </Typography>
                    <Typography variant="body2">
                      "{selectedPrompt.prompt}"
                    </Typography>
                  </Card>

                  <Grid container spacing={1.5}>
                    <Grid item xs={4}>
                      <Card variant="outlined" sx={{ p: 1, bgcolor: 'grey.50' }}>
                        <Typography variant="caption" color="text.secondary">Intent</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {selectedPrompt.definition.intent}
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card variant="outlined" sx={{ p: 1, bgcolor: 'grey.50' }}>
                        <Typography variant="caption" color="text.secondary">Persona</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {selectedPrompt.definition.persona}
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card variant="outlined" sx={{ p: 1, bgcolor: 'grey.50' }}>
                        <Typography variant="caption" color="text.secondary">Geography</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {selectedPrompt.definition.geography}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                    AI Response
                  </Typography>
                  <Card variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                    <Typography variant="body2" color="text.secondary">
                      {selectedPrompt.response}
                    </Typography>
                  </Card>
                </Box>

                {selectedPrompt.analysis.mentioned === 'Yes' && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                      Brand Performance
                    </Typography>
                    <Grid container spacing={1.5}>
                      <Grid item xs={4}>
                        <Card variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                          <Typography variant="caption" color="text.secondary">Ranking</Typography>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            #{selectedPrompt.analysis.ranking}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={8}>
                        <Card variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                          <Typography variant="caption" color="text.secondary">Perception</Typography>
                          <Typography variant="body2">
                            {selectedPrompt.analysis.perception}
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                    Competitive Analysis
                  </Typography>
                  <Stack spacing={1}>
                    {selectedPrompt.analysis.competitors.map((competitor, idx) => (
                      <Card key={idx} variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {competitor.name}
                              </Typography>
                              <Chip
                                label={`#${competitor.ranking}`}
                                size="small"
                                color={competitor.ranking === 1 ? 'success' : competitor.ranking <= 3 ? 'warning' : 'error'}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {competitor.perception}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

// Citation Analytics Screen
const CitationAnalyticsScreen = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSource, setSelectedSource] = useState('all');
  const [sortBy, setSortBy] = useState('citationFreq');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showReportPanel, setShowReportPanel] = useState(false);
  const [selectedReportSource, setSelectedReportSource] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const citationData = [
    {
      source: 'TechCrunch',
      citationFreq: 87,
      mentionPercent: 23.4,
      avgRank: 2.1,
      perceptionScore: 8.2
    },
    {
      source: 'Forbes',
      citationFreq: 64,
      mentionPercent: 18.7,
      avgRank: 1.8,
      perceptionScore: 8.9
    },
    {
      source: 'Wired',
      citationFreq: 52,
      mentionPercent: 15.2,
      avgRank: 2.4,
      perceptionScore: 7.8
    },
    {
      source: 'VentureBeat',
      citationFreq: 41,
      mentionPercent: 12.1,
      avgRank: 2.9,
      perceptionScore: 7.5
    }
  ];

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setShowFilters(!showFilters);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setShowFilters(false);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...citationData].sort((a, b) => {
    const aVal = a[sortBy as keyof typeof a];
    const bVal = b[sortBy as keyof typeof b];

    if (sortOrder === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

  const openReport = (source: string) => {
    setSelectedReportSource(source);
    setShowReportPanel(true);
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
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
              Citation Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Analyze citation sources and reference patterns across AI model responses
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<RefreshIcon />}>
              Reset
            </Button>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
            >
              Filters
            </Button>
            <Popper open={showFilters} anchorEl={anchorEl} placement="bottom-end" transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper sx={{ p: 2, mt: 1, minWidth: 200 }}>
                    <ClickAwayListener onClickAway={handleFilterClose}>
                      <Stack spacing={1}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                          Source Type
                        </Typography>
                        {['All Sources', 'News Sites', 'Tech Blogs', 'Research Papers'].map((option) => (
                          <Box
                            key={option}
                            sx={{
                              p: 1,
                              borderRadius: 1,
                              cursor: 'pointer',
                              bgcolor: selectedSource === option.toLowerCase().replace(' ', '') ? 'primary.light' : 'transparent',
                              '&:hover': { bgcolor: 'grey.100' }
                            }}
                            onClick={() => setSelectedSource(option.toLowerCase().replace(' ', ''))}
                          >
                            <Typography variant="body2">{option}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </ClickAwayListener>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Stack>
        </Box>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => handleSort('source')}
                >
                  Source
                  {sortBy === 'source' && (
                    <Typography component="span" sx={{ ml: 0.5, fontSize: 10 }}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => handleSort('citationFreq')}
                >
                  Citation Freq.
                  {sortBy === 'citationFreq' && (
                    <Typography component="span" sx={{ ml: 0.5, fontSize: 10 }}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => handleSort('mentionPercent')}
                >
                  Mention %
                  {sortBy === 'mentionPercent' && (
                    <Typography component="span" sx={{ ml: 0.5, fontSize: 10 }}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => handleSort('avgRank')}
                >
                  Avg. Rank
                  {sortBy === 'avgRank' && (
                    <Typography component="span" sx={{ ml: 0.5, fontSize: 10 }}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </Typography>
                  )}
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => handleSort('perceptionScore')}
                >
                  Perception Score
                  {sortBy === 'perceptionScore' && (
                    <Typography component="span" sx={{ ml: 0.5, fontSize: 10 }}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  Check Detailed Report
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row) => (
                <TableRow key={row.source} hover>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {row.source}
                  </TableCell>
                  <TableCell>
                    {row.citationFreq}
                  </TableCell>
                  <TableCell>
                    {row.mentionPercent}%
                  </TableCell>
                  <TableCell>
                    {row.avgRank}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <Typography variant="body2">{row.perceptionScore}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(row.perceptionScore / 10) * 100}
                        sx={{
                          width: 40,
                          height: 4,
                          borderRadius: 1
                        }}
                        color={row.perceptionScore >= 8 ? 'success' : row.perceptionScore >= 7 ? 'warning' : 'error'}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => openReport(row.source)}
                      sx={{ textDecoration: 'underline' }}
                    >
                      View Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Report Panel Dialog */}
      <Dialog
        open={showReportPanel}
        onClose={() => setShowReportPanel(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { height: '90vh' } }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Citation Report: {selectedReportSource}</Typography>
            <IconButton onClick={() => setShowReportPanel(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            {/* Top Prompts Section */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Top Prompts & Responses
              </Typography>
              {[
                {
                  prompt: "What are the best project management tools for startups?",
                  responses: 12,
                  intent: "Product Research",
                  geography: "North America",
                  persona: "Startup Founder"
                },
                {
                  prompt: "How to choose enterprise software for team collaboration?",
                  responses: 8,
                  intent: "Solution Comparison",
                  geography: "Europe",
                  persona: "IT Manager"
                }
              ].map((prompt, index) => (
                <Card key={index} variant="outlined" sx={{ p: 2, mb: 1.5, bgcolor: 'grey.50' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                    "{prompt.prompt}"
                  </Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <Typography variant="caption">Responses: {prompt.responses}</Typography>
                    <Typography variant="caption">Intent: {prompt.intent}</Typography>
                    <Typography variant="caption">Geography: {prompt.geography}</Typography>
                    <Typography variant="caption">Persona: {prompt.persona}</Typography>
                  </Stack>
                </Card>
              ))}

              {/* Share Analysis */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                  Intent Distribution
                </Typography>
                {[
                  { intent: 'Product Research', percentage: 45 },
                  { intent: 'Solution Comparison', percentage: 30 },
                  { intent: 'Problem Solving', percentage: 25 }
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 120 }}>{item.intent}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={item.percentage}
                      sx={{ flex: 1, mx: 1.5, height: 6, borderRadius: 1 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 30 }}>
                      {item.percentage}%
                    </Typography>
                  </Box>
                ))}

                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2, mt: 2.5 }}>
                  Geography Distribution
                </Typography>
                {[
                  { region: 'North America', percentage: 50 },
                  { region: 'Europe', percentage: 30 },
                  { region: 'Asia Pacific', percentage: 20 }
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 120 }}>{item.region}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={item.percentage}
                      sx={{ flex: 1, mx: 1.5, height: 6, borderRadius: 1 }}
                      color="success"
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 30 }}>
                      {item.percentage}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Competitor Performance Section */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Competitor Performance
              </Typography>
              <Card variant="outlined">
                {[
                  { competitor: 'Competitor A', citations: 23, share: '26%' },
                  { competitor: 'Competitor B', citations: 18, share: '21%' },
                  { competitor: 'Competitor C', citations: 12, share: '14%' }
                ].map((comp, index) => (
                  <Box key={index} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1.5,
                    borderBottom: index < 2 ? '1px solid' : 'none',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{comp.competitor}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">{comp.citations} citations</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{comp.share}</Typography>
                    </Box>
                  </Box>
                ))}
              </Card>
            </Box>

            {/* Snippets Section */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Citation Snippets Comparison
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5 }}>
                Our Brand Descriptions
              </Typography>
              {[
                "Acme Corp offers comprehensive project management solutions with advanced analytics and team collaboration features...",
                "Known for its intuitive interface and powerful automation capabilities, Acme Corp helps teams streamline workflows..."
              ].map((snippet, index) => (
                <Card key={index} variant="outlined" sx={{ p: 2, mb: 1.5, bgcolor: 'grey.50' }}>
                  <Typography variant="overline" color="primary" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
                    Acme Corp
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {snippet}
                  </Typography>
                </Card>
              ))}

              <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1.5, mt: 2 }}>
                Competitor Descriptions
              </Typography>
              {[
                {
                  name: 'Competitor A',
                  snippet: 'A popular choice for agile teams, offering basic project tracking and simple collaboration tools...'
                },
                {
                  name: 'Competitor B',
                  snippet: 'Provides enterprise-grade project management with focus on resource planning and budget tracking...'
                }
              ].map((comp, index) => (
                <Card key={index} variant="outlined" sx={{ p: 2, mb: 1.5, bgcolor: 'grey.50' }}>
                  <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
                    {comp.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {comp.snippet}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
export default BrandGEODashboard;