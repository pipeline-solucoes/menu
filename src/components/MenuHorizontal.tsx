'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { ItemMenuConfig } from '@/types/ItemMenuConfig';
import { styled } from '@mui/material';

/**
 * Container principal do menu horizontal
 */
export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  gap: '16px',
  width: '100%',  
}));

/**
 * Props do componente MenuHorizontal
 */
interface MenuHorizontalProps {
  /**
   * Lista de itens do menu horizontal. Cada item deve seguir a interface `ItemMenuConfig`.
   */
  listaItemMenu: ItemMenuConfig[];  
}

/**
 * Componente MenuHorizontal
 *
 * Renderiza um menu horizontal de itens customizáveis. Cada item é passado via `listaItemMenu` como um componente React,
 * e o menu cuida de renderizá-los dentro de um container horizontal com espaçamento uniforme.
 *
 *
 * Exemplo de uso:
 * ```tsx
 * <MenuHorizontal
 *   listaItemMenu={[
 *     { component: <Button>Home</Button> },
 *     { component: <Button>Perfil</Button> }
 *   ]}
 * />
 * ```
 */
const MenuHorizontal: React.FC<MenuHorizontalProps> = ({
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
    return <Container>{buttons}</Container>;
  } else {
    return <Container>carregando...</Container>;
  }
};

MenuHorizontal.displayName = "MenuHorizontal"; // para DevTools

export default MenuHorizontal;

