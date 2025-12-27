import { styled } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

/**
 * Ícone de logout estilizado para o Drawer.
 */
export const LogoutIcon = styled(ExitToAppIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '24px',
}));