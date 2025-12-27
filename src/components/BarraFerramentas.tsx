'use client';

import * as React from 'react';
import { Bar, ContainerRedeSocialHorizontal, CustomToolbar, SpanBody1 } from './BarraFerramentasStyled';
import { ItemMenuConfig } from '@/types/ItemMenuConfig';
import { styled } from '@mui/material';

interface BarraFerramentasProps {    
    listaItemMenu: ItemMenuConfig[];   
    background_color?: string;
    color: string;    
    color_hover: string;    
    text_decoration: 'none' | 'underline';
    renderLogo: () => React.ReactElement;    
    renderSocialMedia: () => React.ReactElement;    
}

const DivStyled = styled('div')({
  display: 'flex',
  flex: '1',
});

const ContainerMenuHorizontal = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  gap: '16px',
});

const BarraFerramentas: React.FC<BarraFerramentasProps> = ({
    listaItemMenu,
    renderLogo, 
    renderSocialMedia, 
    background_color, color, color_hover, 
    text_decoration
}) => {

  const background_color_bar = background_color || 'transparent';
  const [buttons, setButtons] = React.useState<React.ReactNode[] | null>(null);
      
  React.useEffect(() => {
      const borderColor = (text_decoration === 'none') ? 'transparent' : color;

      if (listaItemMenu) {
          const constructedButtons = listaItemMenu.map((item) => (
              item.component
          ));
          setButtons(constructedButtons);
      }
  }, [listaItemMenu, color, color_hover, text_decoration]);

  return (
    <Bar background_color={background_color_bar} id="barraferramentas">
      <CustomToolbar disableGutters>
        {renderLogo()}
        <DivStyled>
          <ContainerMenuHorizontal>
            <nav>
              {buttons ? buttons : <SpanBody1 text_color={color}>carregando...</SpanBody1>}
            </nav>
          </ContainerMenuHorizontal>
          <ContainerRedeSocialHorizontal>
            {renderSocialMedia()}
          </ContainerRedeSocialHorizontal>
        </DivStyled>
      </CustomToolbar>
    </Bar>
  );
}

export default BarraFerramentas;

