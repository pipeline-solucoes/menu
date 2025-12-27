'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { SpanBody1 } from './BarraFerramentasStyled';
import { ItemMenuConfig } from '@/types/ItemMenuConfig';
import { ReactElement } from 'react';
import { SvgIconProps } from '@mui/material';

interface MenuHamburguerProps {    
    listaItemMenu?: ItemMenuConfig[];
    background_color?: string; 
    color: string;     
    imageHamburguer: () => ReactElement<HTMLImageElement> | ReactElement<SvgIconProps>;    
}

const MenuHamburguer: React.FC<MenuHamburguerProps> = ({
    listaItemMenu, 
    background_color = "transparent",
    color,       
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
              sx={{ padding: "24px", gap: "16px", backgroundColor: background_color }}
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
                  : ( <SpanBody1 text_color={color}>carregando...</SpanBody1> )
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

