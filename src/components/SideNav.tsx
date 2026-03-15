"use client";

import { useState, ReactNode } from "react";
import { Box, styled } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem } from "../types/NavItem";

interface SideNavProps {
  
  items: NavItem[];  
  menuWidth?: number;  
  menuBackground?: string;  
  itemMenuBackgroundColor?: string;  
  itemMenuBackgroundColorSelected?: string;  
  itemMenuBackgroundColorHover?: string;  
  itemMenuColor?: string;  
  itemMenuColorSelected?: string;  
  borderRadius?: string;  
  itemMenuBorderRadius?: string;  
  contentBackground?: string;
  height?: string | number;  
  renderTopMenu?: ReactNode;  
  renderBottomMenu?: ReactNode;  
  contentGap?: number;
}

const Container = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  width: "100%",
  padding: 0,
}));

export const MenuItemBox = styled(Box, {
  shouldForwardProp: (prop) =>
    ![
      "active",
      "itemMenuBorderRadius",
      "itemMenuBackgroundColor",
      "itemMenuBackgroundColorSelected",
      "itemMenuBackgroundColorHover",
      "itemMenuColor",
      "itemMenuColorSelected",
    ].includes(prop as string),
})<{active?: boolean;
  itemMenuBorderRadius?: number | string;
  itemMenuBackgroundColor?: string;
  itemMenuBackgroundColorSelected?: string;
  itemMenuBackgroundColorHover?: string;
  itemMenuColor?: string;
  itemMenuColorSelected?: string;}>(
  ({
    active,
    itemMenuBorderRadius,
    itemMenuBackgroundColor,
    itemMenuBackgroundColorSelected,
    itemMenuBackgroundColorHover,
    itemMenuColor,
    itemMenuColorSelected,
  }) => ({
    cursor: "pointer",
    padding: "8px 16px",
    borderRadius: itemMenuBorderRadius,
    backgroundColor: active
      ? itemMenuBackgroundColorSelected
      : itemMenuBackgroundColor,
    color: active ? itemMenuColorSelected : itemMenuColor,
    width: "100%",
    transition: "all 0.2s ease",
    userSelect: "none",

    "&:hover": {
      backgroundColor: active
        ? itemMenuBackgroundColorSelected
        : itemMenuBackgroundColorHover,
    },
  })
);

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
        {renderTopMenu && <Box>{renderTopMenu}</Box>}


        {/* Bloco itens */}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, }}>
          {items.map((item, idx) => {            
            if (!item.label) return item.content;
            return (
                <MenuItemBox
                  itemMenuBorderRadius = {itemMenuBorderRadius}
                  itemMenuBackgroundColor = {itemMenuBackgroundColor}
                  itemMenuBackgroundColorHover = {itemMenuBackgroundColorHover}
                  itemMenuBackgroundColorSelected = {itemMenuBackgroundColorSelected}
                  itemMenuColor = {itemMenuColor}
                  itemMenuColorSelected = {itemMenuColorSelected}
                  key={`${item.label}-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  {item.label}
                </MenuItemBox>
            );
          })}
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
