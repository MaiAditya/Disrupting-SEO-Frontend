import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Layout } from '@/components/common/Layout';
import { OverviewScreen } from '@/components/screens/OverviewScreen';
import { theme } from '@/styles/theme';
import { ScreenType } from '@/types';

// Placeholder components for other screens
const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ padding: '2rem' }}>
    <h2>{title}</h2>
    <p>This screen is under development. The component will be extracted from the original file.</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('overview');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'overview':
        return <OverviewScreen />;
      case 'competitors':
        return <PlaceholderScreen title="Competitors Management" />;
      case 'geography':
        return <PlaceholderScreen title="Geography Settings" />;
      case 'persona':
        return <PlaceholderScreen title="Persona Management" />;
      case 'brandbook':
        return <PlaceholderScreen title="Brand Book" />;
      case 'mentions':
        return <PlaceholderScreen title="Mention Analytics" />;
      case 'rankings':
        return <PlaceholderScreen title="Ranking Analytics" />;
      case 'perception':
        return <PlaceholderScreen title="Perception Analytics" />;
      case 'prompts':
        return <PlaceholderScreen title="Prompt Analytics" />;
      case 'citations':
        return <PlaceholderScreen title="Citation Analytics" />;
      default:
        return <OverviewScreen />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
      >
        {renderScreen()}
      </Layout>
    </ThemeProvider>
  );
};

export default Dashboard;