import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Layout } from '@/components/common/Layout';
import { OverviewScreen } from '@/components/screens/OverviewScreen';
import { CompetitorsScreen } from '@/components/screens/CompetitorsScreen';
import { GeographyScreen } from '@/components/screens/GeographyScreen';
import { PersonaScreen } from '@/components/screens/PersonaScreen';
import { BrandBookScreen } from '@/components/screens/BrandBookScreen';
import { MentionAnalyticsScreen } from '@/components/screens/MentionAnalyticsScreen';
import { RankingAnalyticsScreen } from '@/components/screens/RankingAnalyticsScreen';
import { PerceptionAnalyticsScreen } from '@/components/screens/PerceptionAnalyticsScreen';
import { PromptAnalyticsScreen } from '@/components/screens/PromptAnalyticsScreen';
import { CitationAnalyticsScreen } from '@/components/screens/CitationAnalyticsScreen';
import { theme } from '@/styles/theme';
import { ScreenType } from '@/types';

// All screens are now fully implemented and functional!

const Dashboard: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('overview');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'overview':
        return <OverviewScreen />;
      case 'competitors':
        return <CompetitorsScreen />;
      case 'geography':
        return <GeographyScreen />;
      case 'persona':
        return <PersonaScreen />;
      case 'brandbook':
        return <BrandBookScreen />;
      case 'mentions':
        return <MentionAnalyticsScreen />;
      case 'rankings':
        return <RankingAnalyticsScreen />;
      case 'perception':
        return <PerceptionAnalyticsScreen />;
      case 'prompts':
        return <PromptAnalyticsScreen />;
      case 'citations':
        return <CitationAnalyticsScreen />;
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