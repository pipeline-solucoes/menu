'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { Bar, ContainerRedeSocialHorizontal, CustomToolbar, SpanBody1 } from './BarraFerramentasStyled';
import { ItemMenuConfig } from '@/types/ItemMenuConfig';
import ItemMenu from './ItemMenu';
import { SvgIconProps } from '@mui/material';

interface BarraFerramentasHamburguerProps {    
    listaItemMenu?: ItemMenuConfig[];
    background_color?: string;
    color: string;    
    color_hover: string;       
    renderSocialMedia: () => React.ReactElement;       
    IconHamburguer: React.ElementType<SvgIconProps>;
    logo: () => React.ReactElement;     
    padding?: string;
    gap?: string;
}

// Função que processa a lista e adiciona afterClick somente ao ItemMenu
function renderListaItemMenu(
  listaItemMenu: { component: React.ReactElement }[],
  handleCloseNavMenu: () => void
) {
  return listaItemMenu.map((item, index) => {
    const el = item.component;

    if (el.type === ItemMenu) {
      return React.cloneElement(
        el as React.ReactElement<{ afterClick?: () => void }>,
        { afterClick: handleCloseNavMenu, key: index }
      );
    }

    return React.cloneElement(el, { key: index });
  });
}

const BarraFerramentasHamburguer: React.FC<BarraFerramentasHamburguerProps> = ({
    listaItemMenu, renderSocialMedia, 
    background_color, color,  
    IconHamburguer, logo,
    padding="8px",
    gap='16px'
}) => {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const renderMenu = () => {
    return (
      <Box>
        <IconButton
          size="large"
          aria-label="menu hamburguer"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <IconHamburguer/>
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
          sx={{ display: { xs: 'block', md: 'none', padding: '0' } }}
        >
          <nav>
            <Box display='flex' flexDirection='column' sx={{ padding: padding, gap: gap }} >            
              { listaItemMenu && listaItemMenu.length > 0 
                  ? ( renderListaItemMenu(listaItemMenu, handleCloseNavMenu)) 
                  : ( <SpanBody1 text_color={color}>carregando...</SpanBody1>)
              }            
            </Box>
          </nav>
        </Menu>
      </Box>
    );
  };

  const background_color_bar = background_color || 'transparent';

  return (
    <Bar background_color={background_color_bar} id="barraferramentahamburguer">
      <CustomToolbar disableGutters>
        <Box>
          {renderMenu()}
        </Box>
        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          {logo()}
        </Box>
        <ContainerRedeSocialHorizontal>
          {renderSocialMedia()}
        </ContainerRedeSocialHorizontal>
      </CustomToolbar>
    </Bar>
  );
}

export default BarraFerramentasHamburguer;

