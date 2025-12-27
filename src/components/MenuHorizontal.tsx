'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { ItemMenuConfig } from '@/types/ItemMenuConfig';
import { styled } from '@mui/material';


export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  gap: '16px',
  width: '100%',  
}));

interface MenuHorizontalProps {
  listaItemMenu: ItemMenuConfig[];  
}

/**
 * Componente de menu horizontal que renderiza uma lista de itens de menu
 * lado a lado utilizando `flexbox`.
 *
 * Os itens são recebidos por meio da prop `listaItemMenu`, onde cada item
 * contém um componente React que será clonado internamente para garantir
 * a atribuição correta da `key`.
 *
 * O componente mantém um estado interno (`buttons`) para armazenar os itens
 * já processados e renderiza um fallback de carregamento enquanto os itens
 * ainda não foram construídos.
 *
 * @param {ItemMenuConfig[]} listaItemMenu Lista de configurações dos itens de menu que serão renderizados horizontalmente.
 *
 * @example
 * ```tsx
 * import MenuHorizontal from '@/components/MenuHorizontal';
 * import { ItemMenu } from '@/components/ItemMenu';
 *
 * const Example = () => {
 *   return (
 *     <MenuHorizontal
 *       listaItemMenu={[
 *         { component: <ItemMenu label="Home" href="/" /> },
 *         { component: <ItemMenu label="Sobre" href="/sobre" /> },
 *         { component: <ItemMenu label="Contato" href="/contato" /> },
 *       ]}
 *     />
 *   );
 * };
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

