// Common types used across the application

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  screen?: string;
  submenu?: MenuItem[];
}

export interface DropdownState {
  dashboard: boolean;
  analytics: boolean;
}

export interface ChartProps {
  options: any;
  series: any;
  type: string;
  height: number | string;
}

export interface Competitor {
  id: number;
  name: string;
  domain: string;
  url: string;
  status?: 'active' | 'inactive';
}

export interface CompetitorFormData {
  name: string;
  domain: string;
  url: string;
}

export interface Geography {
  id: number;
  scale: 'Global' | 'Region' | 'Country' | 'State' | 'City';
  hierarchy: GeographyHierarchy[];
}

export interface GeographyHierarchy {
  level: 'Region' | 'Country' | 'State' | 'City';
  value: string;
}

export interface GeographyFormData {
  region: string;
  country: string;
  state: string;
  city: string;
  scale: 'Global' | 'Region' | 'Country' | 'State' | 'City';
}

export interface GeographyStats {
  regions: number;
  countries: number;
  states: number;
  cities: number;
}

export interface Persona {
  id: number;
  name: string;
  description: string;
  geography: string[];
  completeness: number;
}

export interface PersonaFormData {
  name: string;
  description: string;
  geography: string[];
}

export interface GuidelineCoverage {
  point: string;
  covered: boolean;
}

export interface BrandData {
  brandName: string;
  website: string;
  industry: string;
  description: string;
  longDescription: string;
  keyFeatures: string[];
}

export interface AnalyticsFilter {
  timeRange: string;
  model: string;
  persona: string;
  geography: string;
  intent: string;
}

export interface MentionData {
  intent: string;
  mentions: number;
  trend: string;
  id: string;
}

export interface GeographyMentionData {
  region: string;
  mentions: number;
  trend: string;
  id: string;
}

export interface SourceData {
  source: string;
  mentions: number;
  percentage: number;
}

export interface FilterState {
  timeRange: string;
  models: string[];
  personas: string[];
  competitors: string[];
  geography: string[];
  intent: string[];
}

export interface Analytics {
  mentions: number;
  rankings: number;
  perception: number;
  citations: number;
}

export interface ChartData {
  categories: string[];
  series: Array<{
    name: string;
    data: number[];
    color?: string;
  }>;
}

export type ScreenType = 
  | 'overview' 
  | 'competitors' 
  | 'geography' 
  | 'persona' 
  | 'brandbook' 
  | 'mentions' 
  | 'rankings' 
  | 'perception' 
  | 'prompts' 
  | 'citations';