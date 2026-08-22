import { styled } from "@mui/material";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

/**
 * Ícone de logout estilizado para o Drawer.
 */
export const SupportIcon = styled(SupportAgentIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '24px',
}));