import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { DrawerProps } from '@/types/Drawer';
import { LogoutIcon } from './LogoutIcon';
import IconDrawerTrigger from './IconDrawerTrigger';
import UserAvatarMenu from './UserAvatarMenu';
import { useConfirmMessage } from '@pipelinesolucoes/notification';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => !['open', 'background'].includes(prop as string),
})<{
  open?: boolean;
  background: string;
}>(({ theme, open, background }) => ({
  background,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open
    ? {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
}));

const ToolbarContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'end',
  width: '100%',
  gap: '20px',
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
  pointerEvents: 'auto',
  color: overlayColor || '#ffffff',
}));

const CardAvatar = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'start',
  width: '100%',
  gap: '16px',
  marginBottom: '24px',
  padding: '8px 20px',
}));

const AlertAreaWrapper = styled('div', {
  shouldForwardProp: (prop) =>
    ![
      'open',
      'width',
      'padding',
      'margin',
      'background',
      'color',
      'borderRadius',
      'boxShadow',
    ].includes(prop as string),
})<{
  open?: boolean;
  width?: string | number;
  padding?: string | number;
  margin?: string | number;
  background?: string;
  color?: string;
  borderRadius?: string | number;
  boxShadow?: string;
}>(({ theme, open, width, padding, margin, background, color, borderRadius, boxShadow }) => ({
  width: open ? (width ?? '100%') : '100%',
  padding: open ? (padding ?? theme.spacing(1, 1.5)) : 0,
  margin: open ? (margin ?? theme.spacing(1, 0, 0, 0)) : 0,
  background: open ? (background ?? 'transparent') : 'transparent',
  color: color ?? 'inherit',
  borderRadius: open ? (borderRadius ?? 0) : 0,
  boxShadow: open ? (boxShadow ?? 'none') : 'none',
  overflow: 'hidden',
}));



/**
 * Layout desktop responsável por exibir:
 * - AppBar com botão de menu e informações do usuário;
 * - Drawer lateral (mini/expandido) com itens de navegação;
 * - Conteúdo principal à direita.
 *
 * Inclui uma área de alertas no Drawer:
 * - Quando o Drawer está aberto: exibe ícone + conteúdo (`alertContent`);
 * - Quando o Drawer está fechado: exibe apenas o ícone (`alertIcon`);
 * - Clique no ícone NÃO troca de aba; ações devem ficar dentro do `alertContent`.
 *
 * Também suporta um estado de carregamento (`loading`) que exibe um overlay
 * escurecido com um spinner centralizado, desabilitando a interação com a página.
 *
 * @param {number} [activeTabIndex] Índice ativo controlado externamente (troca programática).
 * @param {number} [defaultTabIndex=0] Índice inicial quando não controlado.
 * @param {(index: number) => void} [onTabChange] Callback disparado ao trocar de aba/item.
 * @param {React.ReactElement} [alertIcon] Ícone exibido na área de alertas (sempre visível).
 * @param {React.ReactNode} [alertContent] Conteúdo renderizado quando o Drawer está aberto.
 * @param {() => void} [onAlertIconClick] Callback ao clicar no ícone de alertas.
 * @param {string} [alertAriaLabel='Open alerts'] Rótulo de acessibilidade do botão de alertas.
 * @param {string | number} [alertWidth='100%'] Largura do container de alertas (quando aberto).
 * @param {string | number} [alertPadding=12] Espaçamento interno do container de alertas (quando aberto).
 * @param {string | number} [alertMargin=0] Margem do container de alertas (quando aberto).
 * @param {string} [alertBackground='transparent'] Cor de fundo do container de alertas (quando aberto).
 * @param {string} [alertColor='inherit'] Cor do texto dentro do container de alertas.
 * @param {string | number} [alertBorderRadius=0] Raio da borda do container de alertas (quando aberto).
 * @param {string} [alertBoxShadow='none'] Sombra do container de alertas (quando aberto).
 *
 * @example
 * ```tsx
 * import NotificationsIcon from '@mui/icons-material/Notifications';
 *
 * <DesktopDrawer
 *   // ...props do drawer
 *   alertIcon={<NotificationsIcon />}
 *   alertContent={<MyAlerts onOpenModal={() => setOpen(true)} />}
 *   onAlertIconClick={() => console.log('clicou no ícone')}
 * />
 * ```
 */
const DesktopDrawer: React.FC<DrawerProps> = ({
  endPointLogout,
  backgroundHeader,
  backgroundMenuAvatar,
  colorItemMenu,
  colorItemMenuSelected,
  idUsuarioLogado,
  nomeUsuarioLogado,
  emailUsuario,
  profileImage,
  menuItems,
  avatarMenuItems,
  activeTabIndex,
  defaultTabIndex = 0,
  onTabChange,
  onUnauthenticated,
  toolbarContent,
  loading,
  loadingBackgroundColor,
  loadingSpinnerSize,
  loadingMessage,
  loadingColor,
  titulo,
  subtitulo,
  menu_opened = true,
  alert
 
}) => {
  const theme = useTheme();
  const { confirm, ConfirmMessagePortal } = useConfirmMessage();

  const [open, setOpen] = React.useState(menu_opened);

  const isControlled = typeof activeTabIndex === 'number';
  const [internalIndex, setInternalIndex] = React.useState<number>(defaultTabIndex);

  React.useEffect(() => {
    if (!isControlled) {
      setInternalIndex(defaultTabIndex);
    }
  }, [defaultTabIndex, isControlled]);

  const currentIndex = isControlled ? activeTabIndex! : internalIndex;

  const hasFiredUnauth = React.useRef(false);

  React.useEffect(() => {
    if (!hasFiredUnauth.current && loading === false && idUsuarioLogado === null) {
      hasFiredUnauth.current = true;
      onUnauthenticated?.();
    }
  }, [loading, idUsuarioLogado, onUnauthenticated]);

  if (loading === false && idUsuarioLogado === null) {
    return null;
  }

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleClickLogout = async () => {
    const accepted = await confirm({
      message: 'Deseja realmente sair?',
      confirmLabel: 'Ok',
      cancelLabel: 'Cancelar',
      closeOnBackdropClick: true,
      closeOnEsc: true,
    });

    if (!accepted) return;
    window.location.href = endPointLogout;
  };

  const handleSelectTab = (index: number) => {
    onTabChange?.(index);
    if (!isControlled) setInternalIndex(index);
  };

  const handleAlertClick = () => {
    if (alert?.onAlertIconClick) {
      alert?.onAlertIconClick();
      return;
    }
    // Comportamento padrão: se estiver fechado, abre. Se estiver aberto, não faz nada.
    if (!open) setOpen(true);
  };

  const shouldRenderAlertArea = Boolean(alert?.alertIcon || alert?.alertContent);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" open={open} background={backgroundHeader}>
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                { marginRight: 5, color: colorItemMenu },
                open && { display: 'none' },
              ]}
            >
              <MenuIcon />
            </IconButton>

            <ToolbarContent>
              {toolbarContent && toolbarContent}

              <IconDrawerTrigger
                background={backgroundMenuAvatar}
                icon={
                  <Avatar
                    src={profileImage}
                    alt={`foto do perfil de ${nomeUsuarioLogado}`}
                    sx={{ width: 48, height: 48, cursor: 'pointer' }}
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
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <List>
            {open && titulo && (
              <CardAvatar>
                <Avatar
                  src={profileImage}
                  alt={`foto do perfil de ${nomeUsuarioLogado}`}
                  sx={{ width: 48, height: 48, cursor: 'pointer' }}
                />
                <Box display="flex" flexDirection="column">
                  <Typography variant="subtitle2" color={colorItemMenu}>
                    {titulo}
                  </Typography>
                  <Typography variant="caption" color={colorItemMenu}>
                    {subtitulo}
                  </Typography>
                </Box>
              </CardAvatar>
            )}

            {menuItems.map((item, index) => (
              <ListItem key={item.text ?? index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  selected={currentIndex === index}
                  onClick={() => handleSelectTab(index)}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? 'initial' : 'center',
                    color: currentIndex === index ? colorItemMenuSelected : colorItemMenu,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: open ? 3 : 'auto',
                      color: currentIndex === index ? colorItemMenuSelected : colorItemMenu,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}

            {/* Área de Alertas (substitui o menuContent). */}
            {shouldRenderAlertArea && (
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={handleAlertClick}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? 'initial' : 'center',
                    color: colorItemMenu,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: open ? 3 : 'auto',
                      color: colorItemMenu,
                    }}
                  >
                    {alert?.alertIcon ?? <></>}
                  </ListItemIcon>

                  {/* Quando fechado, não renderiza conteúdo (só ícone). */}
                  <AlertAreaWrapper
                    open={open}
                    width={alert?.alertWidth}
                    padding={alert?.alertPadding}
                    margin={alert?.alertMargin}
                    background={alert?.alertBackground}
                    color={alert?.alertColor}
                    borderRadius={alert?.alertBorderRadius}
                    boxShadow={alert?.alertBoxShadow}
                  >
                    {open && (
                      <Box>
                        {/* label apenas para acessibilidade (sem texto visual obrigatório) */}
                        <Typography
                          component="span"
                          sx={{
                            position: 'absolute',
                            width: 1,
                            height: 1,
                            p: 0,
                            m: -1,
                            overflow: 'hidden',
                            clip: 'rect(0, 0, 0, 0)',
                            whiteSpace: 'nowrap',
                            border: 0,
                          }}
                        >
                          {alert?.alertAriaLabel}
                        </Typography>

                        {alert?.alertContent}
                      </Box>
                    )}
                  </AlertAreaWrapper>
                </ListItemButton>
              </ListItem>
            )}

            <Box height="24px" />

            <ListItem key="logout" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleClickLogout}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center',
                  color: colorItemMenu,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    mr: open ? 3 : 'auto',
                    color: colorItemMenu,
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {menuItems[currentIndex]?.component ?? (
            <Typography>Selecione um item do menu.</Typography>
          )}
        </Box>

        {ConfirmMessagePortal}
      </Box>

      {loading && (
        <LoadingOverlay overlayBackground={loadingBackgroundColor} overlayColor={loadingColor}>
          <CircularProgress
            size={loadingSpinnerSize}
            sx={{ color: loadingColor, mb: loadingMessage ? 2 : 0 }}
          />
          {loadingMessage && (
            <Typography sx={{ mt: 2, color: loadingColor }}>{loadingMessage}</Typography>
          )}
        </LoadingOverlay>
      )}
    </>
  );
};

DesktopDrawer.displayName = 'DesktopDrawer';

export default DesktopDrawer;