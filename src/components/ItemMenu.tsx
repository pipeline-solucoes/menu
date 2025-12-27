'use client';

import React from 'react';
import { styled } from '@mui/material';

const ButtonStyled = styled('a', {
  shouldForwardProp: (prop) =>
    ![
      'background_color',
      'background_color_hover',
      'color',
      'color_hover',
      'padding',
      'border_radius',
      'border_color',
      'border_color_underline',
      'width',
      'margin',
    ].includes(prop as string),
})<{
  background_color: string;
  background_color_hover: string;
  color: string;
  color_hover: string;
  padding: string;
  border_radius: string;
  border_color: string;
  border_color_underline: string;
  width: string;
  margin: string;
}>(({
  background_color,
  background_color_hover,
  color,
  color_hover,
  padding,
  border_radius,
  border_color,
  border_color_underline,
  width,
  margin,
}) => ({
  width: width,
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'none',
  textAlign: 'center',
  boxShadow: 'none',
  backgroundColor: background_color,
  color: color,
  border: `1px solid ${border_color}`,
  borderRadius: border_radius,
  padding: padding,
  margin: margin,

  '&:hover': {
    backgroundColor: background_color_hover,
    borderBottom: `1px solid ${border_color_underline}`,
    color: color_hover,
  },
}));

interface ItemMenuProps {  
  url: string;
  aria_label: string;
  background_color?: string;
  background_color_hover?: string;
  color: string;
  color_hover?: string; 
  border_color?: string;
  border_radius?: string;
  text_decoration: 'none' | 'underline';  
  layout: 'button' | 'link';
  width: string;
  margin?: string;
  children: React.ReactNode;  
  afterClick?: () => void;
}

/**
 * IMPORTANTE:
 * 
 * Todo componente estilizado criado no projeto principal que for usado no menu
 * (como ItemMenuCustom) deve definir a propriedade estática `typeName`:
 * 
 *    (ItemMenuCustom as any).typeName = "ItemMenu";
 * 
 * Isso garante que a lib consiga identificar o componente corretamente e
 * injetar o `afterClick` para fechar o menu ou executar ações adicionais.
 */

const ItemMenu: React.FC<ItemMenuProps> = ({ 
  url, aria_label, background_color, background_color_hover,
  color, color_hover, border_radius, border_color, text_decoration = 'none',
  layout, width, margin, children, afterClick }) => {
  
  const backgroundColor = background_color ?? 'transparent';
  const backgroundColorHover = background_color_hover ?? backgroundColor;
  const colorHover = color_hover ?? color;    
  const borderRadius = border_radius ?? '0px';
  const padding = layout == 'button' ? '8px 24px' : '0px';
  const borderColor = text_decoration == 'underline' ? 'transparent' : (border_color ?? 'transparent');
  const borderColorUnderline = (text_decoration == 'underline') ? color : (border_color ?? 'transparent');
  const marginButton = margin ?? '0px'; 
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {

    e.preventDefault();
    const id = url.replace('#', '');

    if (afterClick) {      
      afterClick();  // Fecha o Menu primeiro
      // Faz o scroll com delay, para evitar reflow pesado
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    } else {
      // Se não houver afterClick, scroll normal      
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }    
  };

  if (url.indexOf('http') != -1) {
    return (
      <ButtonStyled 
        href={url}
        width={width}
        background_color={backgroundColor}
        background_color_hover={backgroundColorHover}
        color={color} 
        color_hover={colorHover}
        border_radius={borderRadius}
        border_color={borderColor}
        border_color_underline={borderColorUnderline}
        padding={padding}
        margin={marginButton}
        aria-label={aria_label}  
        target="_blank"
        rel="noopener noreferrer"        
      >
        {children}
      </ButtonStyled>
    );    
  }
  else if (url.indexOf('/#') != -1 || url.startsWith('/')) {
    return (
      <ButtonStyled 
        href={url}
        width={width}
        background_color={backgroundColor}
        background_color_hover={backgroundColorHover}
        color={color} 
        color_hover={colorHover}
        border_radius={borderRadius}
        border_color={borderColor}
        border_color_underline={borderColorUnderline}
        padding={padding}
        margin={marginButton}
        aria-label={aria_label}              
      >
        {children}
      </ButtonStyled>
    );    
  }
  else{
    return (
      <ButtonStyled
        href={url} 
        onClick={handleClick}
        width={width}
        background_color={backgroundColor}
        background_color_hover={backgroundColorHover}
        color={color} 
        color_hover={colorHover}
        border_radius={borderRadius}
        border_color={borderColor}
        border_color_underline={borderColorUnderline}
        padding={padding}
        margin={marginButton}
        aria-label={aria_label}              
      >
        {children}
      </ButtonStyled>
    );
  }
};

ItemMenu.displayName = "ItemMenu"; // para DevTools
(ItemMenu as any).typeName = "ItemMenu"; // para seu código

export default ItemMenu;