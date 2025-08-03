import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';

interface InfoIconProps {
  description: string;
}

export const InfoIcon: React.FC<InfoIconProps> = ({ description }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
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