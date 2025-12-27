'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { ItemMenuConfig } from '@/types/ItemMenuConfig';
import { styled } from '@mui/material';

/**
 * Container principal do menu vertical
 */
export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexGrow: 1,
  gap: '16px',
  width: '100%',
}));

/**
 * Props do componente MenuVertical
 */
interface MenuVerticalProps {
  /**
   * Lista de itens do menu. Cada item deve seguir a interface `ItemMenuConfig`.
   */
  listaItemMenu: ItemMenuConfig[];  
}

/**
 * Componente MenuVertical
 *
 * Renderiza um menu vertical de itens customizáveis. Cada item é passado via `listaItemMenu` como um componente React,
 * e o menu cuida de renderizá-los dentro de um container vertical com espaçamento uniforme.
 *
 *
 * Exemplo de uso:
 * ```tsx
 * <MenuVertical
 *   
 *   listaItemMenu={[
 *     { component: <Button>Home</Button> },
 *     { component: <Button>Perfil</Button> }
 *   ]}
 * />
 * ```
 */
const MenuVertical: React.FC<MenuVerticalProps> = ({
  listaItemMenu
}) => {

  const [buttons, setButtons] = React.useState<React.ReactNode[] | null>(null);

  useEffect(() => {
    if (listaItemMenu) {
      const constructedButtons = listaItemMenu.map((item, index) =>
        React.cloneElement(item.component, { key: index })
      );
      setButtons(constructedButtons);
    }
  }, [listaItemMenu]);

  if (buttons) {
    return (
      <Container>
        {buttons}
      </Container>
    );
  } else {
    return (
      <Container>
        carregando...
      </Container>
    );
  }
};

MenuVertical.displayName = "MenuVertical"; // para DevTools

export default MenuVertical;
