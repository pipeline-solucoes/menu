
import { styled } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

export const CustomToolbar = styled(Toolbar, {
  shouldForwardProp: (prop) => !['maxWidth', 'padding'].includes(prop as string),
})<{maxWidth?: string; padding?: string;}>(({ maxWidth = '1200px', padding = '0' }) => ({
  margin: '0',
  padding: padding,
  width: '100%',
  maxWidth: maxWidth,  
}));

export const ContainerRedeSocialHorizontal = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center', 
  margin: '16px 0px',
});

export const Bar = styled('div', {
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