'use client';

import * as React from 'react';
import { Bar, CustomToolbar } from './BarraFerramentasStyled';
import { styled } from '@mui/material';

interface BarraFerramentasProps {          
    background_color?: string;
    maxWidth?: string;            
    renderLeft: () => React.ReactElement;    
    renderMiddle: () => React.ReactElement;    
    renderRigth: () => React.ReactElement;    
}

const DivStyled = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  width: '100%',
  heigth: '100%',
});

const BarraFerramentas: React.FC<BarraFerramentasProps> = ({    
    renderLeft, 
    renderMiddle,
    renderRigth, 
    maxWidth = '1200px',
    background_color = "transparent",
}) => {

  return (
    <Bar background_color={background_color} id="barraferramentas">
      <CustomToolbar disableGutters maxWidth={maxWidth}>        
        <DivStyled>
          {renderLeft()}
          {renderMiddle()}
          {renderRigth()}
        </DivStyled>
      </CustomToolbar>
    </Bar>
  );
}

BarraFerramentas.displayName = "BarraFerramentas"; // para DevTools
(BarraFerramentas as any).typeName = "BarraFerramentas"; // para seu código

export default BarraFerramentas;

