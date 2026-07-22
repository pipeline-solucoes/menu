import * as React from 'react';
import MobileDrawer from './MobileDrawer';
import DesktopDrawer from './DesktopDrawer';
import { DrawerProps } from '@/types/Drawer';
import { useTheme } from '@mui/material';

/**
 * DrawerResponsive é um layout de navegação responsivo que:
 * - Em telas pequenas (xs/sm) usa o `MobileDrawer`;
 * - Em telas médias ou maiores (md+) usa o `DesktopDrawer`.
 *
 * @param {number} [activeTabIndex] Índice do item ativo controlado externamente (troca programática).
 * @param {number} [defaultTabIndex=0] Índice inicial quando não controlado por `activeTabIndex`.
 * @param {(index: number) => void} [onTabChange] Callback disparado ao trocar de aba/item.
 *
 * @example
 * ```tsx
 * const Page = () => {
 *   const [tab, setTab] = React.useState(0);
 *   return (
 *     <DrawerResponsive
 *       activeTabIndex={tab}
 *       onTabChange={(i) => setTab(i)}
 *       // ...outras props
 *     />
 *   );
 * };
 * ```
 */
const DrawerResponsive: React.FC<DrawerProps> = ({
  endPointLogout,
  isMobile,
  drawer_opened = true,
  activeTabIndex,
  defaultTabIndex = 0,
 
  backgroundHeader,
  backgroundMenuAvatar,
  backgroundDrawer,
  colorItemMenu,
  colorItemMenuSelected,
  backgrondToolTip,
  colorToolTip,
 
  idUsuarioLogado,
  nomeUsuarioLogado,
  profileImage,
  emailUsuario,
  menuItems,
  avatarMenuItems,
  toolbarContent,

  tituloAvatarDrawer,
  subtituloAvatarDrawer,

  loading = false,
  loadingBackgroundColor,
  loadingSpinnerSize,
  loadingColor,
  loadingMessage,
      
  alert,
  headerDrawerContent,
  heightHeader,
  
  onUnauthenticated,
  onTabChange,
}) => {
  const defaultAvatar = '/nofoto.jpg';
  const avatarSrc =
    profileImage && profileImage.trim() !== '' ? profileImage : defaultAvatar;

  const isControlled = typeof activeTabIndex === 'number';

  const [internalIndex, setInternalIndex] = React.useState<number>(defaultTabIndex);

  // se mudar defaultTabIndex em runtime e estiver uncontrolled, acompanha
  React.useEffect(() => {
    if (!isControlled) {
      setInternalIndex(defaultTabIndex);
    }
  }, [defaultTabIndex, isControlled]);

  const currentIndex = isControlled ? (activeTabIndex as number) : internalIndex;

  const handleChangeIndex = (index: number) => {
    onTabChange?.(index);

    // Só atualiza estado interno se NÃO estiver controlado
    if (!isControlled) {
      setInternalIndex(index);
    }
  };

  const theme = useTheme();
  const themeDrawer = theme?.pipelinesolucoes?.drawer;

  const bDrawer = backgroundDrawer ?? themeDrawer?.background ?? '#fff'; 
  const bHeader = backgroundHeader ?? themeDrawer?.header?.background ?? '#fff'; 
  const bMenuAvatar = backgroundMenuAvatar ?? themeDrawer?.menuAvatar?.background ?? '#fff';

  const cItemMenu = colorItemMenu ?? themeDrawer?.itemMenu?.color ?? '#000';
  const cItemMenuSelected = colorItemMenuSelected ?? themeDrawer?.itemMenu?.color ?? '#000';

  const bToolTip = backgrondToolTip ?? themeDrawer?.tooltip?.background ?? '#000';
  const cToolTip = colorToolTip ?? themeDrawer?.tooltip?.color ?? '#fff';

  const bLoading = loadingBackgroundColor ?? themeDrawer?.loading?.background ?? 'rgba(0, 0, 0, 0.4)';
  const cLoading = loadingColor ?? themeDrawer?.loading?.color ?? '#fff';
  const sizeLoading = loadingSpinnerSize ?? themeDrawer?.loading?.spinnerSize ?? 48;


  if (isMobile) {
    return (
      <MobileDrawer
        endPointLogout={endPointLogout}
        backgroundHeader={bHeader}
        backgroundMenuAvatar={bMenuAvatar}
        colorItemMenu={cItemMenu}
        colorItemMenuSelected={cItemMenuSelected}
        nomeUsuarioLogado={nomeUsuarioLogado}
        profileImage={avatarSrc}
        idUsuarioLogado={idUsuarioLogado}
        emailUsuario={emailUsuario}
        menuItems={menuItems}
        avatarMenuItems={avatarMenuItems}
        activeTabIndex={currentIndex}
        onTabChange={handleChangeIndex}
        onUnauthenticated={onUnauthenticated}
        toolbarContent={toolbarContent}
        loading={loading}
        loadingBackgroundColor={bLoading}
        loadingSpinnerSize={sizeLoading}
        loadingMessage={loadingMessage}
        loadingColor={cLoading}
      />
    );
  }

  return (
    <DesktopDrawer
            
      backgroundDrawer={bDrawer}

      backgroundHeader={bHeader}
      headerDrawerContent={headerDrawerContent}
      heightHeader={heightHeader}
      toolbarContent={toolbarContent}

      idUsuarioLogado={idUsuarioLogado}
      nomeUsuarioLogado={nomeUsuarioLogado}
      profileImage={avatarSrc}
      emailUsuario={emailUsuario}
      
      menuItems={menuItems}
      avatarMenuItems={avatarMenuItems}      
      endPointLogout={endPointLogout}
      backgroundMenuAvatar={bMenuAvatar}
      colorItemMenu={cItemMenu}
      colorItemMenuSelected={cItemMenuSelected}
      tituloAvatarDrawer={tituloAvatarDrawer}
      subtituloAvatarDrawer={subtituloAvatarDrawer}
            
      loading={loading}
      loadingBackgroundColor={bLoading}
      loadingSpinnerSize={sizeLoading}
      loadingMessage={loadingMessage}
      loadingColor={cLoading}
            
      defaultTabIndex={defaultTabIndex}
      activeTabIndex={currentIndex}
      onTabChange={handleChangeIndex}

      alert={alert}
      onUnauthenticated={onUnauthenticated}            
      drawer_opened={drawer_opened}

      backgrondToolTip={bToolTip}
      colorToolTip={cToolTip}
    />
  );
};

DrawerResponsive.displayName = 'DrawerResponsive';

export default DrawerResponsive;