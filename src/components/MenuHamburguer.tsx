'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { ItemMenuConfig } from '@/types/ItemMenuConfig';
import { ReactElement } from 'react';
import { SvgIconProps, Typography } from '@mui/material';
import { ColorProps } from '@/types/style/ColorProps';

interface MenuHamburguerProps extends ColorProps{    
    listaItemMenu?: ItemMenuConfig[];
    background?: string; 
    colorText: string;     
    imageHamburguer: () => ReactElement<HTMLImageElement> | ReactElement<SvgIconProps>;    
}

/**
 * Componente de menu hamburguer responsivo que exibe um `IconButton` e, ao clicar,
 * abre um `Menu` do Material UI contendo itens configuráveis via `listaItemMenu`.
 *
 * O menu é exibido apenas em telas pequenas (xs) e ocultado em telas médias ou maiores (md+),
 * seguindo a regra definida em `sx`.
 *
 * Quando um item renderizado for um componente do tipo `ItemMenu` (identificado por `type.typeName === "ItemMenu"`),
 * o componente injeta automaticamente a prop `afterClick` para fechar o menu ao clicar no item.
 *
 * @param {ItemMenuConfig[]} [listaItemMenu] Lista de itens de menu (componentes) a serem renderizados dentro do menu.
 * @param {string} [background='transparent'] Cor/fundo do container interno do menu (aplicado em `backgroundColor`).
 * @param {string} colorText Cor do texto exibido no fallback "carregando..." quando não há itens na lista.
 * @param {() => React.ReactElement<HTMLImageElement> | React.ReactElement<SvgIconProps>} imageHamburguer Função que retorna o elemento visual do botão (imagem ou ícone MUI) exibido dentro do `IconButton`.
 *
 * @example
 * ```tsx
 * import MenuHamburguer from '@/components/MenuHamburguer';
 * import MenuIcon from '@mui/icons-material/Menu';
 * import { ItemMenu } from '@/components/ItemMenu';
 *
 * const Example = () => {
 *   return (
 *     <MenuHamburguer
 *       background="#ffffff"
 *       colorText="#111"
 *       imageHamburguer={() => <MenuIcon />}
 *       listaItemMenu={[
 *         { component: <ItemMenu label="Home" href="/" /> },
 *         { component: <ItemMenu label="Sobre" href="/sobre" /> },
 *       ]}
 *     />
 *   );
 * };
 * ```
 */
const MenuHamburguer: React.FC<MenuHamburguerProps> = ({
    listaItemMenu, 
    background = "transparent",
    colorText,       
    imageHamburguer
}) => {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
      <Box>
        <IconButton
          size="large"
          aria-label="menu hamburguer"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          {imageHamburguer()}
        </IconButton>

        <Menu
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none', paddingTop: '0', paddingBottom: '0' } }}
        >
          <nav>
            <Box
              display="flex"
              flexDirection="column"
              sx={{ padding: "24px", gap: "16px", backgroundColor: background }}
            >
              { listaItemMenu && listaItemMenu.length > 0 
                  ? (
                      listaItemMenu.map((item, index) => {

                        const el = item.component;
                        const type = el.type as any;

                        if (type.typeName === "ItemMenu") {                          

                          return React.cloneElement(
                            el as React.ReactElement<{ afterClick?: () => void }>,
                            { key: index, afterClick: handleCloseNavMenu }
                          );

                        }

                        return React.cloneElement(el, { key: index }); })
                    )                       
                  : ( <Typography variant='body1' component="div" color={colorText}>carregando...</Typography> )
              }              
            </Box>
          </nav>
        </Menu>
      </Box>
    );

}

MenuHamburguer.displayName = "MenuHamburguer"; // para DevTools
(MenuHamburguer as any).typeName = "MenuHamburguer"; // para seu código

export default MenuHamburguer;

