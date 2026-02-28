import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Toolbar,
  Typography,
  CircularProgress,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { DrawerProps, MenuItemDrawer } from '@/types/Drawer';
import IconDrawerTrigger from './IconDrawerTrigger';
import UserAvatarMenu from './UserAvatarMenu';

const StyledHeader = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'backgroundHeader',
})<{
  backgroundHeader?: string;
}>(({ theme, backgroundHeader }) => ({
  backgroundColor: backgroundHeader || '#ffffff',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledBottomBar = styled(BottomNavigation, {
  shouldForwardProp: (prop) =>
    !['background', 'color', 'colorSelected', 'height'].includes(prop as string),
})<{
  background: string;
  color: string;
  colorSelected: string;
  height: string;
}>(({ theme, background, color, colorSelected, height }) => ({
  height,
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: background,
  borderTop: `1px solid ${theme.palette.divider}`,

  '& .MuiBottomNavigationAction-root': {
    color: color,
    minWidth: 56,
  },
  '& .Mui-selected': {
    color: colorSelected,
  },
}));

const ToolbarContent = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  width: '100%',
  gap: '16px',
}));

const LoadingOverlay = styled('div', {
  shouldForwardProp: (prop) =>
    !['overlayBackground', 'overlayColor'].includes(prop as string),
})<{
  overlayBackground?: string;
  overlayColor?: string;
}>(({ overlayBackground, overlayColor, theme }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: theme.zIndex.modal + 1,
  backgroundColor: overlayBackground || 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: overlayColor || '#ffffff',
}));

type MobileDrawerProps = Omit<DrawerProps, 'selectedIndex' | 'onChangeIndex'> & {
  /**
   * Índice da aba/item ativo controlado externemente.
   */
  activeTabIndex?: number;

  /**
   * Índice inicial quando não controlado.
   * @default 0
   */
  defaultTabIndex?: number;

  /**
   * Callback disparado ao trocar de aba.
   */
  onTabChange?: (index: number) => void;
};

/**
 * Layout mobile com navegação via BottomNavigation.
 *
 * Suporta modo:
 * - Controlado (via activeTabIndex)
 * - Não-controlado (via defaultTabIndex)
 *
 * @param {number} [activeTabIndex] Índice ativo controlado externamente.
 * @param {number} [defaultTabIndex=0] Índice inicial quando não controlado.
 * @param {(index: number) => void} [onTabChange] Callback disparado ao trocar de aba.
 *
 * @example
 * ```tsx
 * const Page = () => {
 *   const [tab, setTab] = React.useState(0);
 *
 *   return (
 *     <MobileDrawer
 *       activeTabIndex={tab}
 *       onTabChange={setTab}
 *       menuItems={menuItems}
 *     />
 *   );
 * };
 * ```
 */
const MobileDrawer: React.FC<MobileDrawerProps> = ({
  endPointLogout,
  backgroundHeader = '#fff',
  backgroundMenuAvatar = '#fff',
  colorItemMenu,
  colorItemMenuSelected,
  idUsuarioLogado,
  nomeUsuarioLogado,
  profileImage,
  emailUsuario,
  menuItems,
  avatarMenuItems,
  activeTabIndex,
  defaultTabIndex = 0,
  onTabChange,
  onUnauthenticated,
  toolbarContent,
  loading = false,
  loadingBackgroundColor = 'rgba(0, 0, 0, 0.4)',
  loadingSpinnerSize = 48,
  loadingMessage,
  loadingColor = '#ffffff',
  heightHeader = '72px',
  headerDrawerContent
}) => {
  const isControlled = typeof activeTabIndex === 'number';

  const [internalIndex, setInternalIndex] = React.useState<number>(defaultTabIndex);

  const currentIndex = isControlled ? activeTabIndex! : internalIndex;

  const handleChange = (index: number) => {
    onTabChange?.(index);

    if (!isControlled) {
      setInternalIndex(index);
    }
  };

  // controle de autenticação
  const hasFiredUnauth = React.useRef(false);

  React.useEffect(() => {
    if (
      !hasFiredUnauth.current &&
      loading === false &&
      idUsuarioLogado === null
    ) {
      hasFiredUnauth.current = true;
      onUnauthenticated?.();
    }
  }, [loading, idUsuarioLogado, onUnauthenticated]);

  if (loading === false && idUsuarioLogado === null) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <StyledHeader position="fixed" backgroundHeader={backgroundHeader}>
          <Toolbar sx={{ display: 'grid', gridTemplateColumns: '1fr auto', justifyItems: 'flex-start' }}>            
            <div>
              {headerDrawerContent && headerDrawerContent}
            </div>
            <ToolbarContent>
              {toolbarContent}
              <IconDrawerTrigger
                background={backgroundMenuAvatar}
                icon={
                  <Avatar
                    src={profileImage}
                    alt={`foto do perfil de ${nomeUsuarioLogado}`}
                    sx={{ width: 48, height: 48 }}
                  />
                }
              >
                <UserAvatarMenu
                  userName={nomeUsuarioLogado}
                  userEmail={emailUsuario}
                  menuItems={avatarMenuItems}
                  endPointLogout={endPointLogout}
                />
              </IconDrawerTrigger>
            </ToolbarContent>
          </Toolbar>
        </StyledHeader>

        <Toolbar />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            mb: '74px',
            overflowY: 'auto',
          }}
        >
          {menuItems[currentIndex]?.component ?? (
            <Typography>Selecione um item do menu.</Typography>
          )}
        </Box>

        <StyledBottomBar
          height={heightHeader}
          background={backgroundHeader}
          color={colorItemMenu}
          colorSelected={colorItemMenuSelected}
          showLabels
          value={currentIndex}
          onChange={(_, newValue: number) => handleChange(newValue)}
        >
          {menuItems.map((item: MenuItemDrawer, idx: number) => (
            <BottomNavigationAction
              key={item.text ?? idx}
              label={item.text}
              icon={item.icon}
            />
          ))}
        </StyledBottomBar>
      </Box>

      {loading && (
        <LoadingOverlay
          overlayBackground={loadingBackgroundColor}
          overlayColor={loadingColor}
        >
          <CircularProgress
            size={loadingSpinnerSize}
            sx={{ color: loadingColor }}
          />
          {loadingMessage && (
            <Typography sx={{ mt: 2, color: loadingColor }}>
              {loadingMessage}
            </Typography>
          )}
        </LoadingOverlay>
      )}
    </>
  );
};

MobileDrawer.displayName = 'MobileDrawer';

export default MobileDrawer;