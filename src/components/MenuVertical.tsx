'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { ItemMenuConfig } from '@/types/ItemMenuConfig';
import { styled } from '@mui/material';


export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexGrow: 1,
  gap: '16px',
  width: '100%',
}));


interface MenuVerticalProps {
  listaItemMenu: ItemMenuConfig[];  
}

/**
 * Componente de menu vertical que renderiza uma lista de itens de menu
 * empilhados em coluna utilizando `flexbox`.
 *
 * Os itens são recebidos através da prop `listaItemMenu`, onde cada item
 * contém um componente React que será clonado internamente para garantir
 * a atribuição correta da `key`.
 *
 * O componente utiliza um estado interno (`buttons`) para armazenar os itens
 * processados e exibe um fallback de carregamento enquanto os componentes
 * ainda não foram construídos.
 *
 * @param {ItemMenuConfig[]} listaItemMenu Lista de configurações dos itens de menu que serão renderizados verticalmente.
 *
 * @example
 * ```tsx
 * import MenuVertical from '@/components/MenuVertical';
 * import { ItemMenu } from '@/components/ItemMenu';
 *
 * const Example = () => {
 *   return (
 *     <MenuVertical
 *       listaItemMenu={[
 *         { component: <ItemMenu label="Dashboard" href="/dashboard" /> },
 *         { component: <ItemMenu label="Perfil" href="/perfil" /> },
 *         { component: <ItemMenu label="Configurações" href="/configuracoes" /> },
 *       ]}
 *     />
 *   );
 * };
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
