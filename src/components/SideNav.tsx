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
   * Altura do container de conteúdo (ex: '500px' ou '100%') 
   * @default '500px'
   */
  height?: string | number;
  /** 
   * Elemento(s) que serão renderizados no topo do menu lateral
   */
  renderTopMenu?: ReactNode;
}

const Container = styled('div')(() => ({                       
  display: 'grid',      
  gridTemplateColumns: 'auto 1fr',    
  width: "100%", 
  padding: '0',    
}));

/**
 * Componente SideNav
 * 
 * Um menu lateral com itens clicáveis que alteram o conteúdo exibido em um container ao lado.
 * Cada item possui um `label` e `content` que será renderizado no container.
 * 
 * O componente é totalmente customizável via props, incluindo cores, bordas, largura do menu e conteúdo, elementos extras, e altura do container.
 */
export default function SideNav({
  items,
  menuWidth = 180, 
  menuBackground = 'transparent',
  borderRadius = '0',
  itemMenuBorderRadius = '16px',
  itemMenuBackgroundColor = "transparent",
  itemMenuBackgroundColorHover = "grey.300",
  itemMenuBackgroundColorSelected="primary.main",
  itemMenuColor = 'black', 
  itemMenuColorSelected = 'black', 
  contentBackground="grey.50",  
  renderTopMenu,
  height = "500px", // altura padrão
}: SideNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Container>
     
      {/* Menu lateral */}
      <Box
        sx={{
          width: menuWidth,                   
          bgcolor: menuBackground,  
          borderRadius: borderRadius,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {renderTopMenu && renderTopMenu}
        {items.map((item, idx) => (
          <Box
            key={item.label}
            onClick={() => setActiveIndex(idx)}
            sx={{
              cursor: "pointer",
              px: 2,
              py: 1,
              borderRadius: itemMenuBorderRadius,
              bgcolor: activeIndex === idx ? itemMenuBackgroundColorSelected : itemMenuBackgroundColor,
              color: activeIndex === idx ? itemMenuColorSelected : itemMenuColor,
              "&:hover": {
                bgcolor: activeIndex === idx ? itemMenuBackgroundColorSelected : itemMenuBackgroundColorHover,
              },
              width: "100%",
            }}
          >
            {item.label}
          </Box>
        ))}
      </Box>

      {/* Container de conteúdo */}
      <Box
        sx={{
          width: "auto",
          flex: 1,
          ml: 2,
          p: 2,
          bgcolor: contentBackground,
          borderRadius: borderRadius,          
          minHeight: height,
          maxHeight: height,
          position: "relative",
          overflowY: "auto", // permite scroll caso o conteúdo seja maior que a altura
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
            {items[activeIndex].content}
          </motion.div>
        </AnimatePresence>
      </Box>

    </Container>
  );
}

SideNav.displayName = "SideNav";
