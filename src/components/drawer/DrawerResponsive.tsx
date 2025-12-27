import * as React from 'react';
import MobileDrawer from './MobileDrawer';
import DesktopDrawer from './DesktopDrawer';
import { DrawerProps } from '@/types/Drawer';
import { useMediaQuery, useTheme } from '@mui/material';


/**
 * DrawerResponsive é um layout de navegação responsivo que:
 * - Em telas pequenas (xs/sm) usa o `MobileMiniDrawerLayout` (header + bottom navigation);
 * - Em telas médias ou maiores (md+) usa o `DesktopMiniDrawerLayout` (AppBar + Drawer).
 * 
 * @param {string} backgroundHeader Cor de fundo do AppBar.
 * @param {string} backgroundMenuAvatar Cor de fundo do menu Avatar.
 * @param {string} colorItemMenu Cor do ícone do menu e dos itens de menu.
 * @param {string} colorItemMenuSelected Cor do item de menu selecionado.
 * @param {number | string | null} idUsuarioLogado Id do usuário logado.
 * @param {string} nomeUsuarioLogado Nome do usuário logado.
 * @param {string} emailUsuario Email do usuário logado.
 * @param {Array<any>} menuItems Itens exibidos no Drawer.
 * @param {Array<any>} avatarMenuItems Itens exibidos no menu do avatar.
 * @param {string} profileImage URL final da imagem de avatar já tratada.
 * @param {number} selectedIndex Índice do item selecionado.
 * @param {(index: number) => void} onChangeIndex Callback chamado ao alterar o item selecionado.
 * @param {() => void} [onUnauthenticated] Callback chamado se não tiver usuário logado.
 * @param {React.ReactNode} [toolbarContent] Conteúdos genéricos exibidos na barra de ferramentas (texto, ícones, imagens etc.).
 * @param {boolean} [loading=false] Indica se o overlay de loading deve ser exibido sobre toda a tela.
 * @param {string} [loadingBackgroundColor='rgba(0, 0, 0, 0.4)'] Cor de fundo do overlay de loading.
 * @param {number} [loadingSpinnerSize=48] Tamanho do spinner de loading.
 * @param {string} [loadingMessage] Texto opcional exibido abaixo do spinner de loading.
 * @param {string} [loadingColor='#ffffff'] Cor do spinner e do texto da mensagem de loading.
 * @param {() => void} [onChangeIndex] Callback chamado quando o item de menu selecionado é alterado.
 * 
 * 
 * Exemplo de uso:
 * ```tsx
 * <MiniDrawer
 *   backgroundHeader="#ffffff"
 *   colorMenuHamburguer="#000000"
 *   nomeUsuarioLogado="John Doe"
 *   menuItems={[
 *     { text: 'Home', icon: <HomeIcon />, component: <HomePage /> },
 *     { text: 'Configurações', icon: <SettingsIcon />, component: <SettingsPage /> },
 *   ]}
 * />
 * ```
 * 
 * ``` Como implementar o evento onChangeIndex
 *    const Page = () => {
 *    const [abaAtual, setAbaAtual] = React.useState(0);
 *    const handleMenuIndexChange = (index: number) => {
 *      setAbaAtual(index);
 *      // Aqui você decide o que carregar:
 *      switch (index) {
 *        case 0:
 *          // carregar dados da aba "Dashboard"
 *          // fetchDashboard();
 *          break;
 *        case 1:
 *          // carregar dados da aba "Consultas"
 *          // fetchConsultas();
 *          break;
 *        case 2:
 *          // carregar dados da aba "Financeiro"
 *          // fetchFinanceiro();
 *          break;
 *        // etc...
 *      }
 *    };
 *    return (
 *      <DrawerResponsive
 *        // ...outras props
 *        onMenuIndexChange={handleMenuIndexChange}
 *      />
 *    );
 *  };
 */

const DrawerResponsive: React.FC<DrawerProps> = ({
  endPointLogout,
  backgroundHeader,
  backgroundMenuAvatar,
  colorItemMenu,
  colorItemMenuSelected,
  idUsuarioLogado,
  nomeUsuarioLogado,
  profileImage,
  emailUsuario,
  menuItems,
  avatarMenuItems,
  onUnauthenticated,
  toolbarContent,
  loading = false,
  loadingBackgroundColor = 'rgba(0, 0, 0, 0.4)',
  loadingSpinnerSize = 48,
  loadingMessage,
  loadingColor = '#ffffff',
  onChangeIndex,
}) => {
  const defaultAvatar = '/nofoto.jpg';
  const avatarSrc =
    profileImage && profileImage.trim() !== '' ? profileImage : defaultAvatar;

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleChangeIndex = (index: number) => {
    setSelectedIndex(index);
    onChangeIndex?.(index);
  };

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const sm = useMediaQuery(theme.breakpoints.between("sm", "md"));
 
  if (xs || sm){
    return (
      <MobileDrawer
        endPointLogout={endPointLogout}
        backgroundHeader={backgroundHeader} 
        backgroundMenuAvatar={backgroundMenuAvatar}
        colorItemMenu={colorItemMenu}
        colorItemMenuSelected={colorItemMenuSelected}       
        nomeUsuarioLogado={nomeUsuarioLogado}
        profileImage={avatarSrc}
        idUsuarioLogado={idUsuarioLogado}
        emailUsuario={emailUsuario}
        menuItems={menuItems}
        avatarMenuItems={avatarMenuItems}
        selectedIndex={selectedIndex}
        onChangeIndex={handleChangeIndex}
        onUnauthenticated={onUnauthenticated}
        toolbarContent={toolbarContent}
        loading={loading}
        loadingBackgroundColor={loadingBackgroundColor}
        loadingSpinnerSize={loadingSpinnerSize}
        loadingMessage={loadingMessage}
        loadingColor={loadingColor}        
      />
    )
  }
  else{
    return (        
        <DesktopDrawer
          endPointLogout={endPointLogout}
          backgroundHeader={backgroundHeader}
          backgroundMenuAvatar={backgroundMenuAvatar}
          colorItemMenu={colorItemMenu}
          colorItemMenuSelected={colorItemMenuSelected} 
          idUsuarioLogado={idUsuarioLogado}
          nomeUsuarioLogado={nomeUsuarioLogado}
          profileImage={avatarSrc}
          emailUsuario={emailUsuario}
          menuItems={menuItems}
          avatarMenuItems={avatarMenuItems}
          selectedIndex={selectedIndex}
          onChangeIndex={handleChangeIndex}
          onUnauthenticated={onUnauthenticated}
          toolbarContent={toolbarContent}
          loading={loading}
          loadingBackgroundColor={loadingBackgroundColor}
          loadingSpinnerSize={loadingSpinnerSize}
          loadingMessage={loadingMessage}
          loadingColor={loadingColor}
        />    
    );
  }
};

DrawerResponsive.displayName = 'DrawerResponsive';

export default DrawerResponsive;
