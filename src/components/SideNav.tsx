"use client";

import { useState, ReactNode } from "react";
import { Box, styled } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem } from "../types/NavItem";

/**
 * Props do componente SideNav
 */
interface SideNavProps {
  /**
   * Lista de itens do menu lateral. Cada item possui `label` e `content`
   */
  items: NavItem[];
  /**
   * Largura do menu lateral em pixels
   * @default 180
   */
  menuWidth?: number;
  /**
   * Cor de fundo do menu lateral
   * @default 'transparent'
   */
  menuBackground?: string;
  /**
   * Cor de fundo padrão dos itens do menu
   * @default 'transparent'
   */
  itemMenuBackgroundColor?: string;
  /**
   * Cor de fundo do item selecionado
   * @default 'primary.main'
   */
  itemMenuBackgroundColorSelected?: string;
  /**
   * Cor de fundo do item ao passar o mouse (hover)
   * @default 'grey.300'
   */
  itemMenuBackgroundColorHover?: string;
  /**
   * Cor do texto dos itens do menu
   * @default 'black'
   */
  itemMenuColor?: string;
  /**
   * Cor do texto do item selecionado
   * @default 'black'
   */
  itemMenuColorSelected?: string;
  /**
   * Border radius do menu e do container de conteúdo
   * @default '0'
   */
  borderRadius?: string;
  /**
   * Border radius de cada item do menu
   * @default '16px'
   */
  itemMenuBorderRadius?: string;
  /**
   * Cor de fundo do container de conteúdo
   * @default 'grey.50'
   */
  contentBackground?: string;
  /**
   * Altura do container de conteúdo e da navegação
   * @default '500px'
   */
  height?: string | number;
  /**
   * Elemento(s) que serão renderizados no topo do menu lateral
   */
  renderTopMenu?: ReactNode;
  /**
   * Elemento(s) que serão renderizados na base do menu lateral
   */
  renderBottomMenu?: ReactNode;
  /**
   * Espaçamento entre menu e conteúdo
   * @default 2
   */
  contentGap?: number;
}

const Container = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  width: "100%",
  padding: 0,
}));

/**
 * Componente SideNav
 *
 * Um menu lateral com itens clicáveis que alteram o conteúdo exibido em um container ao lado.
 * Cada item possui um `label` e `content` que será renderizado no container.
 *
 * Agora suporta:
 * - conteúdo no topo do menu (`renderTopMenu`)
 * - conteúdo fixado na base do menu (`renderBottomMenu`)
 */
export default function SideNav({
  items,
  menuWidth = 180,
  menuBackground = "transparent",
  borderRadius = "0",
  itemMenuBorderRadius = "16px",
  itemMenuBackgroundColor = "transparent",
  itemMenuBackgroundColorHover = "grey.300",
  itemMenuBackgroundColorSelected = "primary.main",
  itemMenuColor = "black",
  itemMenuColorSelected = "black",
  contentBackground = "grey.50",
  renderTopMenu,
  renderBottomMenu,
  height = "500px",
  contentGap = 2,
}: SideNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Container>
      {/* Menu lateral */}
      <Box
        sx={{
          width: menuWidth,
          minHeight: height,
          maxHeight: height,
          bgcolor: menuBackground,
          borderRadius: borderRadius,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {/* Bloco superior: topo + itens */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {renderTopMenu && <Box>{renderTopMenu}</Box>}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {items.map((item, idx) => (
              <Box
                key={`${item.label}-${idx}`}
                onClick={() => setActiveIndex(idx)}
                sx={{
                  cursor: "pointer",
                  px: 2,
                  py: 1,
                  borderRadius: itemMenuBorderRadius,
                  bgcolor:
                    activeIndex === idx
                      ? itemMenuBackgroundColorSelected
                      : itemMenuBackgroundColor,
                  color:
                    activeIndex === idx
                      ? itemMenuColorSelected
                      : itemMenuColor,
                  "&:hover": {
                    bgcolor:
                      activeIndex === idx
                        ? itemMenuBackgroundColorSelected
                        : itemMenuBackgroundColorHover,
                  },
                  width: "100%",
                  transition: "all 0.2s ease",
                  userSelect: "none",
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Bloco inferior */}
        {renderBottomMenu && (
          <Box
            sx={{
              mt: 2,
              pt: 2,
              flexShrink: 0,
            }}
          >
            {renderBottomMenu}
          </Box>
        )}
        
      </Box>

      {/* Container de conteúdo */}
      <Box
        sx={{
          width: "auto",
          flex: 1,
          ml: contentGap,
          p: 2,
          bgcolor: contentBackground,
          borderRadius: borderRadius,
          minHeight: height,
          maxHeight: height,
          position: "relative",
          overflowY: "auto",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ width: "100%" }}
          >
            {items[activeIndex]?.content}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Container>
  );
}

SideNav.displayName = "SideNav";
