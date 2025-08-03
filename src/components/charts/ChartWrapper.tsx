import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';
import { ChartProps } from '@/types';

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

// Chart with error handling
export const ChartWithErrorBoundary: React.FC<ChartProps> = ({ 
  options, 
  series, 
  type, 
  height 
}) => {
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
        Chart failed to load
      </Box>
    );
  }

  try {
    return (
      <Chart
        options={options}
        series={series}
        type={type}
        height={height}
      />
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
};

export const getResponsiveChartOptions = (baseOptions: any) => ({
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