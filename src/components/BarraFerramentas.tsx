'use client';

import * as React from 'react';
import { styled, Toolbar } from '@mui/material';
import { ColorProps, LayoutProps } from '@pipelinesolucoes/theme';

interface BarraFerramentasProps extends ColorProps, LayoutProps {          
    background?: string;
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


const CustomToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => !['maxWidth', 'padding'].includes(prop as string),
})<{maxWidth?: string; padding?: string;}>(({ maxWidth = '1200px', padding = '0' }) => ({
  margin: '0',
  padding: padding,
  width: '100%',
  maxWidth: maxWidth,  
}));

const Bar = styled('div', {
  shouldForwardProp: (prop) => !['background_color'].includes(prop as string),
})<{background_color: string;}>(({ background_color }) => ({
  display: 'flex',
  flexDirection: 'column', // Layout flex vertical
  alignItems: 'center', // Centraliza horizontalmente
  justifyContent: 'center', // Centraliza verticalmente
  backgroundColor: background_color, // Define a cor de fundo
  width: '100%', // Largura total
  boxSizing: 'border-box',
  position: 'relative',
}));


/**
 * Componente que renderiza uma barra de ferramentas (Toolbar) do Material UI com layout em grid
 * dividido em três áreas: esquerda, meio e direita. Cada área é renderizada via funções
 * `renderLeft`, `renderMiddle` e `renderRigth`.
 *
 * @param {() => React.ReactElement} renderLeft Função que retorna o conteúdo a ser renderizado na área esquerda. Obrigatório.
 * @param {() => React.ReactElement} renderMiddle Função que retorna o conteúdo a ser renderizado na área central. Obrigatório.
 * @param {() => React.ReactElement} renderRigth Função que retorna o conteúdo a ser renderizado na área direita. Obrigatório.
 * @param {string} [maxWidth='1200px'] Largura máxima do container interno (Toolbar). Controla o `max-width` do conteúdo.
 * @param {string} [background='transparent'] Cor de fundo do container externo da barra.
 *
 * @example
 * ```tsx
 * import * as React from 'react';
 * import { BarraFerramentas } from '@/components/BarraFerramentas';
 * import { Typography, Button } from '@mui/material';
 *
 * const Example = () => {
 *   return (
 *     <BarraFerramentas
 *       background="#ffffff"
 *       maxWidth="1280px"
 *       renderLeft={() => <Typography variant="h6">Logo</Typography>}
 *       renderMiddle={() => <Typography variant="body1">Título</Typography>}
 *       renderRigth={() => <Button variant="contained">Ação</Button>}
 *     />
 *   );
 * };
 * ```
 */
const BarraFerramentas: React.FC<BarraFerramentasProps> = ({    
    renderLeft, 
    renderMiddle,
    renderRigth, 
    maxWidth = '1200px',
    background = "transparent",
}) => {

  return (
    <Bar background_color={background} id="barraferramentas">
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

