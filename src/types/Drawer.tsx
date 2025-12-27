
/**
 * Representa um item do menu usado no Drawer e no BottomNavigation.
 *
 * @property text - Texto exibido no item de menu.
 * @property icon - Ícone exibido ao lado do texto.
 * @property component - Componente React renderizado quando o item é selecionado.
 */
export interface MenuItemDrawer {
  text: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

/**
 * Representa um item do menu usado no Menu do Avatar.
 *
 * @property label - Texto exibido no item do menu 
 * @property onClick - Ação executada ao clicar no item
 */
export interface AvatarMenuItem {
  label: string;  
  onClick?: () => void;
}


/**
 * Propriedades do componente MiniDrawer.
 *
 * @property endPointLogout - endPoint do Logout
 * @property backgroundHeader - Cor de fundo do header e BottomNavigation.
 * @property backgroundMenuAvatar - Cor de fundo do menu Avatar.
 * @property colorItemMenu - Cor do ícone do menu e dos itens de menu.
 * @property colorItemMenuSelected - Cor do item de menu selecionado.
 * @property idUsuarioLogado - Id do usuário logado.
 * @property nomeUsuarioLogado - Nome do usuário logado.
 * @property profileImage - URL da imagem de perfil do usuário.
 * @default profileImage "/images/default-avatar.png"
 * @property profileImage - URL da imagem de perfil do usuário.
 * @property emailUsuario - Email do usuário.
 * @property toolbarContent - Conteúdos genéricos exibidos na barra de ferramentas (texto, ícones, imagens etc.) 
 * @property loading - Indica se o overlay de loading deve ser exibido sobre toda a tela.
 * @property loadingBackgroundColor - Cor de fundo do overlay de loading.
 * @property loadingSpinnerSize - Tamanho do spinner de loading.
 * @property loadingMessage - Texto opcional exibido abaixo do spinner de loading.
 * @property loadingColor - Cor do spinner e do texto da mensagem de loading.
 * 
 */
export interface DrawerProps {
  endPointLogout: string;  
  backgroundHeader: string;
  backgroundMenuAvatar: string;
  colorItemMenu: string;
  colorItemMenuSelected: string;
  idUsuarioLogado: string;
  nomeUsuarioLogado: string;
  profileImage?: string;
  emailUsuario: string;
  menuItems: MenuItemDrawer[];
  avatarMenuItems: AvatarMenuItem[];
  selectedIndex: number;
  onChangeIndex: (index: number) => void;
  onUnauthenticated?: () => void;
  toolbarContent?: React.ReactNode;  
  loading?: boolean;
  loadingBackgroundColor?: string;  
  loadingSpinnerSize?: number;
  loadingMessage?: string;
  loadingColor?: string;
}
