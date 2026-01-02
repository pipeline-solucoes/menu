'use client';

import React from 'react';
import { styled } from '@mui/material';
import { BorderProps, ColorProps, LayoutProps } from '@pipelinesolucoes/theme';


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

interface ItemMenuProps extends ColorProps, BorderProps, LayoutProps {  
  url: string;
  aria_label: string;

  background?: string;
  backgroundHover?: string;
  colorText: string;
  colorTextHover?: string; 
  borderColor?: string;
  borderRadius?: string;
  width: string;
  margin?: string;
  padding? : string;

  text_decoration: 'none' | 'underline';  
  layout: 'button' | 'link';

  children: React.ReactNode;  
  afterClick?: () => void;
}

/**
 * Componente de item de menu baseado em `<a>` estilizado via Material UI `styled`.
 * Renderiza um link com aparência de **botão** ou **link**, aplicando estilos de fundo, texto,
 * borda e hover, além de suportar comportamento de **scroll suave** para âncoras.
 *
 * Regras de navegação:
 * - Se `url` contém `"http"`, abre como link externo (com `target="_blank"` e `rel="noopener noreferrer"`).
 * - Se `url` contém `"/#"` ou começa com `"/"`, renderiza como link interno padrão (sem interceptar o clique).
 * - Caso contrário, assume âncora (ex.: `"#section"`) e faz `scrollIntoView` suave; se `afterClick` existir,
 *   chama primeiro `afterClick()` e aplica um `setTimeout` para evitar reflow pesado antes do scroll.
 *
 * @param {string} url URL de destino. Pode ser externa (`https://...`), interna (`/rota` ou `/#secao`) ou âncora (`#secao`). Obrigatório.
 * @param {string} aria_label Rótulo de acessibilidade aplicado em `aria-label`. Obrigatório.
 * @param {string} [background='transparent'] Cor de fundo (CSS) do item no estado normal.
 * @param {string} [backgroundHover=background] Cor de fundo (CSS) no hover. Por padrão, herda o valor de `background`.
 * @param {string} colorText Cor do texto (CSS) no estado normal. Obrigatório.
 * @param {string} [colorTextHover=colorText] Cor do texto (CSS) no hover. Por padrão, herda `colorText`.
 * @param {string} [borderColor='transparent'] Cor da borda (CSS). Se `text_decoration="underline"`, a borda padrão fica transparente.
 * @param {string} [borderRadius='0px'] Raio da borda (CSS).
 * @param {'none' | 'underline'} [text_decoration='none'] Controla o estilo de “sublinhado” no hover via `borderBottom`.
 * @param {'button' | 'link'} layout Define o layout visual: em `'button'` aplica `padding`; em `'link'` usa `padding` `'0px'`. Obrigatório.
 * @param {string} width Largura do item (CSS). Obrigatório.
 * @param {string} [margin='0px'] Margem (CSS) aplicada ao item.
 * @param {string} [padding='8px 24px'] Padding (CSS) quando `layout="button"`. Quando `layout="link"`, o padding efetivo é `'0px'`.
 * @param {React.ReactNode} children Conteúdo interno do item (texto, Typography, ícones etc.). Obrigatório.
 * @param {() => void} [afterClick] Callback opcional disparado antes do scroll (quando âncora) para permitir fechar o menu/rodar ações adicionais.
 *
 * IMPORTANTE:
 * 
 * Todo componente estilizado criado no projeto principal que for usado no menu
 * (como ItemMenuCustom) deve definir a propriedade estática `typeName`:
 * 
 *    (ItemMenuCustom as any).typeName = "ItemMenu";
 * 
 * Isso garante que a lib consiga identificar o componente corretamente e
 * injetar o `afterClick` para fechar o menu ou executar ações adicionais.
 * 
 * 
 *
 * @example
 * ```tsx
 *  const ItemMenuCustom: React.FC<ItemMenuCustomProps> = ({rota, otherPage = "true", afterClick }) => {            
 *      const theme = useTheme();
 *      const url = (rota.url == "/") ? rota.url : ( (otherPage && rota.url.indexOf("/") == -1) ? `/${rota.url}` : rota.url );
 *      
 *      return(
 *          <ItemMenu 
 *              key={url}            
 *              width='auto'
 *              url={url} 
 *              color={theme.palette.text.primary} 
 *              color_hover={theme.palette.primary.main} 
 *              text_decoration="none"             
 *              aria_label={'menu ' + rota.caption}
 *              layout= 'link'
 *              afterClick={afterClick}     
 *          >
 *              <Typography variant='subtitle1' component="span">{rota.caption}</Typography>
 *          </ItemMenu>      
 *      );         
 *  };
 *  (ItemMenuCustom as any).typeName = "ItemMenu";
 *  export default ItemMeuCustom;
 */

const ItemMenu: React.FC<ItemMenuProps> = ({ 
  url, aria_label, background, backgroundHover,
  colorText, colorTextHover, borderRadius, borderColor, text_decoration = 'none',
  layout, width, margin, padding = '8px 24px', children, afterClick }) => {
  
  const backgroundColor = background ?? 'transparent';
  const backgroundColorHover = backgroundHover ?? backgroundColor;
  const colorHover = colorTextHover ?? colorText;    
  const border_radius = borderRadius ?? '0px';
  const marginButton = margin ?? '0px'; 

  const paddingLayout = layout == 'button' ? padding : '0px';
  const border_color = text_decoration == 'underline' ? 'transparent' : (borderColor ?? 'transparent');
  const borderColorUnderline = (text_decoration == 'underline') ? colorText : (borderColor ?? 'transparent');

  
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
        color={colorText} 
        color_hover={colorHover}
        border_radius={border_radius}
        border_color={border_color}
        border_color_underline={borderColorUnderline}
        padding={paddingLayout}
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
        color={colorText} 
        color_hover={colorHover}
        border_radius={border_radius}
        border_color={border_color}
        border_color_underline={borderColorUnderline}
        padding={paddingLayout}
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
        color={colorText} 
        color_hover={colorHover}
        border_radius={border_radius}
        border_color={border_color}
        border_color_underline={borderColorUnderline}
        padding={paddingLayout}
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