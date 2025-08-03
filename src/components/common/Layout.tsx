import React, { useState } from 'react';
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
  Badge,
  useTheme,
  useMediaQuery,
  Collapse
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
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { DRAWER_WIDTH } from '@/styles/theme';
import { DropdownState, ScreenType } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

const menuItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: DashboardIcon,
    screen: 'overview' as ScreenType
  },
  {
    id: 'dashboard',
    label: 'Dashboard Setup',
    icon: SettingsIcon,
    submenu: [
      { id: 'competitors', label: 'Competitors', icon: PeopleIcon, screen: 'competitors' as ScreenType },
      { id: 'geography', label: 'Geography', icon: PublicIcon, screen: 'geography' as ScreenType },
      { id: 'persona', label: 'Persona', icon: PeopleIcon, screen: 'persona' as ScreenType },
      { id: 'brandbook', label: 'Brand Book', icon: DescriptionIcon, screen: 'brandbook' as ScreenType }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: AnalyticsIcon,
    submenu: [
      { id: 'mentions', label: 'Mention Analytics', icon: TrendingUpIcon, screen: 'mentions' as ScreenType },
      { id: 'rankings', label: 'Ranking Analytics', icon: AssessmentIcon, screen: 'rankings' as ScreenType },
      { id: 'perception', label: 'Perception Analytics', icon: PsychologyIcon, screen: 'perception' as ScreenType },
      { id: 'prompts', label: 'Prompt Analytics', icon: SearchIcon, screen: 'prompts' as ScreenType },
      { id: 'citations', label: 'Citation Analytics', icon: DescriptionIcon, screen: 'citations' as ScreenType }
    ]
  }
];

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentScreen, 
  onScreenChange 
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState<DropdownState>({
    dashboard: false,
    analytics: false
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDropdown = (dropdown: keyof DropdownState) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const navigateToScreen = (screen: ScreenType) => {
    onScreenChange(screen);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderMenuItem = (item: any, isSubmenu = false) => (
    <ListItem key={item.id} disablePadding>
      <ListItemButton
        onClick={() => {
          if (item.screen) {
            navigateToScreen(item.screen);
          } else if (item.submenu) {
            toggleDropdown(item.id);
          }
        }}
        selected={currentScreen === item.screen}
        sx={{
          pl: isSubmenu ? 4 : 2,
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '& .MuiListItemIcon-root': {
              color: 'white',
            },
          },
        }}
      >
        <ListItemIcon sx={{ color: currentScreen === item.screen ? 'white' : 'inherit' }}>
          <item.icon />
        </ListItemIcon>
        <ListItemText primary={item.label} />
        {item.submenu && (
          <ExpandMoreIcon 
            sx={{ 
              transform: dropdowns[item.id as keyof DropdownState] ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s'
            }} 
          />
        )}
      </ListItemButton>
    </ListItem>
  );

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Brand GEO
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <div key={item.id}>
            {renderMenuItem(item)}
            {item.submenu && (
              <Collapse in={dropdowns[item.id as keyof DropdownState]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem) => renderMenuItem(subItem, true))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            SEO Analytics Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default'
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};