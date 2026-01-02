// UserAvatarMenu.tsx
import React from 'react';
import { Box, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LogoutIcon } from './LogoutIcon';
import { AvatarMenuItem } from '@/types/Drawer';


export interface UserAvatarMenuProps {
  
  userName?: string;
  userEmail?: string;
  menuItems?: AvatarMenuItem[];
  endPointLogout: string;
  noUserLabel?: string;
  noEmailLabel?: string;
}

const Root = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hasMenuItems',
})<{
  hasMenuItems: boolean;
}>(({ hasMenuItems }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: hasMenuItems ? 16 : 12,
}));

const UserInfoWrapper = styled(Box)(() => ({
  padding: '16px 16px 24px 16px',
}));

const InfoText = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  ...theme.typography.caption,
}));

/**
 * Componente que renderiza um bloco de informações do usuário (nome e e-mail)
 * seguido por itens de menu opcionais e um item fixo de logout.
 *
 * Ele é ideal para ser usado dentro de um Menu, Popover ou Drawer quando o usuário
 * clica no avatar da aplicação.
 *
 * @param {string} [userName] Nome do usuário logado. Quando não informado, exibe `noUserLabel`. @default undefined
 * @param {string} [userEmail] E-mail do usuário logado. Quando não informado, exibe `noEmailLabel`. @default undefined
 * @param {AvatarMenuItem[]} [menuItems] Lista de itens de menu adicionais exibidos acima do item "Sair". @default undefined
 * @param {string} [endPointLogout] endpoint do Logout da secao.
 * @param {string} [noUserLabel="Nenhum usuário logado"] Texto exibido quando não há usuário logado. @default "Nenhum usuário logado"
 * @param {string} [noEmailLabel="Email não cadastrado"] Texto exibido quando não há e-mail cadastrado. @default "Email não cadastrado"
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { Menu, IconButton } from '@mui/material';
 * import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 * import { UserAvatarMenu, AvatarMenuItem } from '@/components/UserAvatarMenu';
 *
 * const avatarMenuItems: AvatarMenuItem[] = [
 *   { label: 'Meu Perfil', onClick: () => console.log('Ir para Meu Perfil') },
 *   { label: 'Configurações', onClick: () => console.log('Ir para Configurações') },
 * ];
 *
 * const Example = () => {
 *   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
 *
 *   const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
 *     setAnchorEl(event.currentTarget);
 *   };
 *
 *   const handleClose = () => {
 *     setAnchorEl(null);
 *   };
 *
 *   const handleLogout = () => {
 *     console.log('Logout acionado');
 *     handleClose();
 *   };
 *
 *   return (
 *     <>
 *       <IconButton onClick={handleOpen}>
 *         <AccountCircleIcon />
 *       </IconButton>
 *
 *       <Menu
 *         anchorEl={anchorEl}
 *         open={Boolean(anchorEl)}
 *         onClose={handleClose}
 *       >
 *         <UserAvatarMenu
 *           userName="Usuário Logado"
 *           userEmail="usuario@exemplo.com"
 *           menuItems={avatarMenuItems}
 *           onLogout={handleLogout}
 *         />
 *       </Menu>
 *     </>
 *   );
 * };
 * ```
 */


const UserAvatarMenu: React.FC<UserAvatarMenuProps> = ({
  userName,
  userEmail,
  menuItems,
  endPointLogout,
  noUserLabel = 'Nenhum usuário logado',
  noEmailLabel = 'Email não cadastrado',
}) => {
  const hasMenuItems = Boolean(menuItems && menuItems.length > 0);


  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const handleClickLogout = async () => {
    setErrorMsg(null);    
    try {
      window.location.href = endPointLogout      
    } catch (e) {
      setErrorMsg('Ocorreu um erro no logout.');
    }
  };

  return (
    <Root hasMenuItems={hasMenuItems}>
      <UserInfoWrapper>
        <InfoText>{userName ?? noUserLabel}</InfoText>
        <InfoText>{userEmail ?? noEmailLabel}</InfoText>
      </UserInfoWrapper>

      {hasMenuItems &&
        menuItems!.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              item.onClick?.();
            }}
          >
            {item.label}
          </MenuItem>
        ))}

      <MenuItem
        key="user-avatar-menu-logout"
        onClick={handleClickLogout}
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <LogoutIcon sx={{ fontSize: 20 }} /> Sair
      </MenuItem>
    </Root>
  );
};

UserAvatarMenu.displayName = 'UserAvatarMenu';

export default UserAvatarMenu;
