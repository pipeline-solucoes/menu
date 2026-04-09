import * as React from 'react';
import MobileDrawer from './MobileDrawer';
import DesktopDrawer from './DesktopDrawer';
import { DrawerProps } from '@/types/Drawer';

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
  backgroundHeader,
  backgroundMenuAvatar,
  backgroundDrawer,
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
  onTabChange,
  activeTabIndex,
  defaultTabIndex = 0,
  tituloAvatarDrawer,
  subtituloAvatarDrawer,
  drawer_opened = true,
  alert,
  headerDrawerContent,
  heightHeader,
  backgrondToolTip,
  colorToolTip,
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

  if (isMobile) {
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
        activeTabIndex={currentIndex}
        onTabChange={handleChangeIndex}
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

  return (
    <DesktopDrawer
            
      backgroundDrawer={backgroundDrawer}

      backgroundHeader={backgroundHeader}
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
      backgroundMenuAvatar={backgroundMenuAvatar}
      colorItemMenu={colorItemMenu}
      colorItemMenuSelected={colorItemMenuSelected}
      tituloAvatarDrawer={tituloAvatarDrawer}
      subtituloAvatarDrawer={subtituloAvatarDrawer}
            
      loading={loading}
      loadingBackgroundColor={loadingBackgroundColor}
      loadingSpinnerSize={loadingSpinnerSize}
      loadingMessage={loadingMessage}
      loadingColor={loadingColor}
            
      defaultTabIndex={defaultTabIndex}
      activeTabIndex={currentIndex}
      onTabChange={handleChangeIndex}

      alert={alert}
      onUnauthenticated={onUnauthenticated}            
      drawer_opened={drawer_opened}

      backgrondToolTip={backgrondToolTip}
      colorToolTip={colorToolTip}
    />
  );
};

DrawerResponsive.displayName = 'DrawerResponsive';

export default DrawerResponsive;