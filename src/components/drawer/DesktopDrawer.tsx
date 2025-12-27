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

/**
 * Layout desktop responsável por exibir:
 * - AppBar com botão de menu e informações do usuário;
 * - Drawer lateral (mini/expandido) com itens de navegação;
 * - Conteúdo principal à direita.
 *
 * Também suporta um estado de carregamento (`loading`) que exibe um overlay
 * escurecido com um spinner centralizado, desabilitando a interação com a página.
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
 *
 * Exibido apenas em `md` ou acima.
 *
 * @example
 * ```tsx
 * import DesktopDrawer from '@/components/DesktopDrawer';
 *
 * const Example = () => {
 *   return (
 *     <DesktopDrawer
 *       backgroundHeader="#ffffff"
 *       backgroundMenuAvatar="#f5f5f5"
 *       colorItemMenu="#000000"
 *       colorItemMenuSelected="#1976d2"
 *       idUsuarioLogado={1}
 *       nomeUsuarioLogado="John Doe"
 *       emailUsuario="john.doe@email.com"
 *       profileImage="/images/default-avatar.png"
 *       menuItems={menuItems}
 *       avatarMenuItems={avatarMenuItems}
 *       selectedIndex={0}
 *       onChangeIndex={(index) => console.log(index)}
 *       loading={true}
 *       loadingBackgroundColor="rgba(0, 0, 0, 0.6)"
 *       loadingSpinnerSize={64}
 *       loadingMessage="Carregando dados..."
 *       loadingColor="#ffffff"
 *     />
 *   );
 * };
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
  selectedIndex,
  onChangeIndex,
  onUnauthenticated,
  toolbarContent,
  loading,
  loadingBackgroundColor,
  loadingSpinnerSize,
  loadingMessage,
  loadingColor,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  //garante que só chamamos onUnauthenticated uma única vez
  const hasFiredUnauth = React.useRef(false);

  React.useEffect(() => {
    // só dispara quando já terminou o loading
    if (
      !hasFiredUnauth.current &&
      loading === false &&
      idUsuarioLogado === null
    ) {
      hasFiredUnauth.current = true;
      onUnauthenticated?.();
    }
  }, [loading, idUsuarioLogado]); 

  if (loading === false && idUsuarioLogado === null) {
    // enquanto o pai decide o que fazer (redirect, etc.), você não renderiza nada
    return null;
  }

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [, setErrorMsg] = React.useState<string | null>(null);

  const handleClickLogout = async () => {
    setErrorMsg(null);
    try {
      window.location.href = endPointLogout;
    } catch (e) {
      setErrorMsg('Ocorreu um erro no logout.');
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex'}} >
        
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
            {menuItems.map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={() => onChangeIndex(index)}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? 'initial' : 'center',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: open ? 3 : 'auto',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <Box height="24px" />

            {/* Botão logout */}
            <ListItem key="logout" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleClickLogout}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center',
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
          {menuItems[selectedIndex]?.component ?? (
            <Typography>Selecione um item do menu.</Typography>
          )}
        </Box>
      </Box>

      {loading && (
        <LoadingOverlay
          overlayBackground={loadingBackgroundColor}
          overlayColor={loadingColor}
        >
          <CircularProgress size={loadingSpinnerSize} sx={{ color: loadingColor, mb: loadingMessage ? 2 : 0 }} />
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

DesktopDrawer.displayName = 'DesktopDrawer';

export default DesktopDrawer;
