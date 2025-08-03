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
  id: string;
  name: string;
  type: 'country' | 'region' | 'city';
  selected: boolean;
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  geography: string[];
  completeness: number;
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