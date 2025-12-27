'use client';

import * as React from 'react';
import { Bar, CustomToolbar } from './BarraFerramentasStyled';
import { styled } from '@mui/material';

interface BarraFerramentasSaaSProps {          
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

const BarraFerramentasSaaS: React.FC<BarraFerramentasSaaSProps> = ({    
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

BarraFerramentasSaaS.displayName = "BarraFerramentasSaaS"; // para DevTools
(BarraFerramentasSaaS as any).typeName = "BarraFerramentasSaaS"; // para seu código

export default BarraFerramentasSaaS;

