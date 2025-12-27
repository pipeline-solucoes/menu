
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

export const SpanBody1 = styled('span', {
    shouldForwardProp: (prop) =>
      !['text_color'].includes(prop as string),
  })<{text_color: string}>(({ theme, text_color }) => ({
    
    color: text_color,
    
    // Tipografia
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.body1?.fontWeight,
    fontStyle: theme.typography.body1?.fontStyle,
    lineHeight: theme.typography.body1?.lineHeight,
    letterSpacing: theme.typography.body1?.letterSpacing,
    fontSize: theme.typography.body1?.fontSize,
    margin: theme.typography.body1?.margin,
  }));

  export const SpanBody2 = styled('span', {
    shouldForwardProp: (prop) =>
      !['text_color'].includes(prop as string),
  })<{text_color: string}>(({ theme, text_color }) => ({
    
    color: text_color,
    
    // Tipografia
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.body2?.fontWeight,
    fontStyle: theme.typography.body2?.fontStyle,
    lineHeight: theme.typography.body2?.lineHeight,
    letterSpacing: theme.typography.body2?.letterSpacing,
    fontSize: theme.typography.body2?.fontSize,
    margin: theme.typography.body2?.margin,
  }));