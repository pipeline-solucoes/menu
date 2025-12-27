// IconDrawerTrigger.tsx
import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';

export interface IconDrawerTriggerProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  /** @default 320 */
  width?: string | number;
  /** @default '100%' */
  height?: string | number;
  /** @default 16 */
  padding?: string | number;
  /** @default 0 */
  margin?: string | number;
  /** @default '#ffffff' */
  background?: string;
  /** @default 'inherit' */
  color?: string;
  /** @default 0 */
  borderRadius?: string | number;
  /** @default 'none' */
  boxShadow?: string;
  /** @default 'Open panel' */
  ariaLabel?: string;
  onOpenChange?: (open: boolean) => void;
}

type StyledMenuContentProps = Pick<
  IconDrawerTriggerProps,
  | 'width'
  | 'height'
  | 'padding'
  | 'margin'
  | 'background'
  | 'color'
  | 'borderRadius'
  | 'boxShadow'
>;

const StyledMenuContent = styled(Box, {
  shouldForwardProp: (prop) =>
    ![
      'width',
      'height',
      'padding',
      'margin',
      'background',
      'color',
      'borderRadius',
      'boxShadow',
    ].includes(prop as string),
})<StyledMenuContentProps>(
  ({ width, height, padding, margin, background, color, borderRadius, boxShadow }) => ({
    width: width ?? 320,
    height: height ?? '100%',
    padding: padding ?? 16,
    margin: margin ?? 0,
    background: background ?? '#ffffff',
    color: color ?? 'inherit',
    borderRadius: borderRadius ?? 0,
    boxShadow: boxShadow ?? 'none',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  }),
);

/**
 * Componente que renderiza um botão de ícone (IconButton) do Material UI
 * e, ao clicar, abre um Menu ancorado ao botão, com conteúdo customizável via children.
 * Ao clicar novamente no ícone, o Menu é fechado (comportamento de toggle).
 *
 * A prop `icon` aceita tanto:
 * - um ícone do Material UI (`<AccountCircleIcon />`, `<MenuIcon />`, etc.)
 * - quanto um componente de avatar, como `<Avatar />` do MUI.
 *
 * @param {React.ReactNode} icon Ícone ou avatar a ser exibido dentro do botão que abre/fecha o menu. Obrigatório.
 * @param {React.ReactNode} children Conteúdo que será exibido dentro do menu ao clicar no ícone. Obrigatório.
 * @param {string | number} [width=320] Largura do container interno do menu.
 * @param {string | number} [height='100%'] Altura do container interno do menu.
 * @param {string | number} [padding=16] Espaçamento interno do container interno do menu.
 * @param {string | number} [margin=0] Margem externa do container interno do menu.
 * @param {string} [background='#ffffff'] Cor de fundo do container interno do menu.
 * @param {string} [color='inherit'] Cor do texto dentro do container interno do menu.
 * @param {string | number} [borderRadius=0] Raio da borda do container interno do menu.
 * @param {string} [boxShadow='none'] Sombra do container interno do menu.
 * @param {(open: boolean) => void} [onOpenChange] Callback disparado sempre que o estado de aberto/fechado muda.
 * @param {string} [ariaLabel='Open panel'] Rótulo de acessibilidade para o botão do ícone.
 *
 * @example
 * ```tsx
 * import { IconDrawerTrigger } from '@/components/IconDrawerTrigger';
 * import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 * import Avatar from '@mui/material/Avatar';
 *
 * const Example = () => {
 *   return (
 *     <>
 *       Exemplo com ícone do Material UI
 *       <IconDrawerTrigger
 *         icon={<AccountCircleIcon />}
 *         position="right"
 *         ariaLabel="Abrir menu do usuário"
 *         width={360}
 *         padding="24px"
 *         background="#f5f5f5"
 *         borderRadius="12px"
 *         boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
 *         onOpenChange={(open) => console.log('Menu aberto?', open)}
 *       >
 *         <div>Conteúdo com ícone de usuário.</div>
 *       </IconDrawerTrigger>
 *
 *       Exemplo com Avatar do Material UI
 *       <IconDrawerTrigger
 *         icon={<Avatar alt="Usuário" src="/static/images/avatar/1.jpg" />}
 *         position="left"
 *         ariaLabel="Abrir painel do avatar"
 *       >
 *         <div>Conteúdo relacionado ao avatar (perfil, configurações, etc.).</div>
 *       </IconDrawerTrigger>
 *     </>
 *   );
 * };
 * ```
 */
const IconDrawerTrigger: React.FC<IconDrawerTriggerProps> = ({
  icon,
  children,
  width,
  height,
  padding,
  margin,
  background,
  color,
  borderRadius,
  boxShadow,
  onOpenChange,
  ariaLabel = 'Open panel',
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChangeOpen = (nextOpen: boolean, newAnchorEl: HTMLElement | null = null) => {
    if (nextOpen) {
      setAnchorEl(newAnchorEl);
    } else {
      setAnchorEl(null);
    }

    if (onOpenChange) {
      onOpenChange(nextOpen);
    }
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleChangeOpen(true, event.currentTarget);
  };

  const handleClose = () => handleChangeOpen(false);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      handleClose();
    } else {
      handleOpen(event);
    }
  };

  return (
    <>
      <IconButton
        aria-label={ariaLabel}
        onClick={handleToggle}
        size="large"
      >
        {icon}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
              paper: {
                elevation: 4,
                sx: {
                  mt: 1.5,
                  minWidth: 220,
                  borderRadius: '12px',
                   background: background,                                   
                },
              },
            }}
        anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
        keepMounted
      >
        <StyledMenuContent
          width={width}
          height={height}
          padding={padding}
          margin={margin}
          background={background}
          color={color}
          borderRadius={borderRadius}
          boxShadow={boxShadow}
        >
          {children}
        </StyledMenuContent>
      </Menu>
    </>
  );
};
          

IconDrawerTrigger.displayName = 'IconDrawerTrigger';

export default IconDrawerTrigger;
