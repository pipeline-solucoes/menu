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
    !['background', 'color', 'colorSelected'].includes(prop as string),
})<{
  background: string;
  color: string;
  colorSelected: string;
}>(({ theme, background, color, colorSelected }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: background,
  borderTop: `1px solid ${theme.palette.divider}`,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.caption?.fontWeight,
  fontStyle: theme.typography.caption?.fontStyle,
  lineHeight: theme.typography.caption?.lineHeight,
  letterSpacing: theme.typography.caption?.letterSpacing,
  fontSize: theme.typography.caption?.fontSize,

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
  flexDirection: 'row',
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
  pointerEvents: 'auto',
  color: overlayColor || '#ffffff',
}));

/**
 * Layout mobile responsável por exibir:
 * - AppBar fixo com avatar e nome do usuário;
 * - Conteúdo principal com scroll interno;
 * - BottomNavigation fixo na parte inferior.
 *
 * Também suporta um estado de carregamento (`loading`) que exibe um overlay
 * escurecido com um spinner centralizado, desabilitando a interação com a página.
 *
 * Exibido apenas em `xs` e `sm`.
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
 * @example
 * ```tsx
 * import MobileDrawer from '@/components/MobileDrawer';
 *
 * const Example = () => {
 *   return (
 *     <MobileDrawer
 *       backgroundHeader="#ffffff"
 *       backgroundMenuAvatar="#f5f5f5"
 *       colorItemMenu="#999999"
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
const MobileDrawer: React.FC<DrawerProps> = ({
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
  selectedIndex,
  onChangeIndex,
  onUnauthenticated,
  toolbarContent,
  loading = false,
  loadingBackgroundColor = 'rgba(0, 0, 0, 0.4)',
  loadingSpinnerSize = 48,
  loadingMessage,
  loadingColor = '#ffffff',
}) => {
  
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

  return (
    <>
      <Box
        sx={{
          height: '100vh', // trava o layout na altura da viewport
          overflow: 'hidden', // evita scroll no container inteiro
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <StyledHeader position="fixed" backgroundHeader={backgroundHeader}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              {/* Título da aplicação (opcional) */}
            </Typography>

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
        </StyledHeader>

        {/* Spacer do AppBar */}
        <Toolbar />

        {/* Conteúdo principal (mobile) com scroll interno */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            mb: '74px', // espaço para o BottomNavigation
            overflowY: 'auto', // <- scroll fica só aqui
          }}
        >
          {menuItems[selectedIndex]?.component ?? (
            <Typography variant="body1">Selecione um item do menu.</Typography>
          )}
        </Box>

        {/* Bottom Navigation */}
        <StyledBottomBar
          background={backgroundHeader}
          color={colorItemMenu}
          colorSelected={colorItemMenuSelected}
          showLabels
          value={selectedIndex}
          onChange={(_, newValue: number) => onChangeIndex(newValue)}
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
            sx={{ color: loadingColor, mb: loadingMessage ? 2 : 0 }}
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
