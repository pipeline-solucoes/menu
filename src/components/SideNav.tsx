"use client";

import { useState, ReactNode } from "react";
import { Box, Divider, styled, TypographyVariant } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem } from "../types/NavItem";

interface SideNavProps {
  items: NavItem[];
  indexItemSelecionado?: number;
  menuWidth?: number;
  itemMenuBackgroundColorSemContent?: string;
  itemMenuColorSemContent?: string;
  itemMenuVariantSemContent?: TypographyVariant;
  menuBackground?: string;
  itemMenuBackgroundColor?: string;
  itemMenuBackgroundColorSelected?: string;
  itemMenuBackgroundColorHover?: string;
  itemMenuColor?: string;
  itemMenuColorSelected?: string;
  itemMenuVariant?: TypographyVariant;
  borderRadius?: string | number;
  itemMenuBorderRadius?: string | number;
  contentBackground?: string;
  height?: string | number;
  renderTopMenu?: ReactNode;
  renderBottomMenu?: ReactNode;
  contentGap?: number | string;
}

const Container = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  width: "100%",
  padding: 0,
}));

const SideNavContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !["menuWidth", "height", "menuBackground", "borderRadius"].includes(
      prop as string
    ),
})<{
  menuWidth?: number | string;
  height?: number | string;
  menuBackground?: string;
  borderRadius?: number | string;
}>(({ menuWidth, height, menuBackground, borderRadius }) => ({
  width: menuWidth,
  minHeight: height,
  maxHeight: height,
  backgroundColor: menuBackground,
  borderRadius: borderRadius,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
}));

const MenuItemBox = styled(Box, {
  shouldForwardProp: (prop) =>
    ![
      "active",
      "itemMenuBorderRadius",
      "itemMenuBackgroundColor",
      "itemMenuBackgroundColorSelected",
      "itemMenuBackgroundColorHover",
      "itemMenuColor",
      "itemMenuColorSelected",
      "typographyVariant",
    ].includes(prop as string),
})<{
  active?: boolean;
  itemMenuBorderRadius?: number | string;
  itemMenuBackgroundColor?: string;
  itemMenuBackgroundColorSelected?: string;
  itemMenuBackgroundColorHover?: string;
  itemMenuColor?: string;
  itemMenuColorSelected?: string;
  typographyVariant?: TypographyVariant;
}>(
  ({
    theme,
    active,
    itemMenuBorderRadius,
    itemMenuBackgroundColor,
    itemMenuBackgroundColorSelected,
    itemMenuBackgroundColorHover,
    itemMenuColor,
    itemMenuColorSelected,
    typographyVariant,
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
    ...(typographyVariant && theme.typography[typographyVariant]),

    "&:hover": {
      backgroundColor: active
        ? itemMenuBackgroundColorSelected
        : itemMenuBackgroundColorHover,
    },
  })
);

const SideNavContent = styled(Box, {
  shouldForwardProp: (prop) =>
    !["contentGap", "contentBackground", "borderRadius", "height"].includes(
      prop as string
    ),
})<{
  contentGap?: number | string;
  contentBackground?: string;
  borderRadius?: number | string;
  height?: number | string;
}>(({ contentGap = 2, contentBackground = "transparent", borderRadius = 2, height = "100%" }) => ({
  width: "auto",
  flex: 1,
  marginLeft: contentGap,
  padding: 16,
  backgroundColor: contentBackground,
  borderRadius: borderRadius,
  minHeight: height,
  maxHeight: height,
  position: "relative",
  overflowY: "auto",
}));

/**
 * Componente de navegação lateral com área de conteúdo associada.
 *
 * Permite alternar entre diferentes seções de conteúdo através de um menu
 * vertical. Cada item do menu pode possuir um conteúdo associado que será
 * exibido na área principal ao ser selecionado.
 *
 * O componente também suporta:
 * - Itens estáticos sem conteúdo
 * - Divisores visuais no menu
 * - Conteúdo customizado no topo e na base do menu
 * - Animação de transição entre conteúdos com `framer-motion`
 *
 * ---
 *
 * Funcionalidades principais
 *
 * - Navegação lateral baseada em lista de itens (`items`)
 * - Controle interno de item ativo
 * - Suporte a itens sem conteúdo
 * - Suporte a divisores no menu (`label === "DIVIDER"`)
 * - Área de conteúdo com transição animada
 * - Customização completa de cores, tipografia e layout
 * - Suporte a conteúdo customizado no topo e rodapé do menu
 *
 * ---
 *
 * Tokens de estilo (ordem de prioridade)
 *
 * Menu lateral:
 * `prop` → `theme.pipelinesolucoes.forms.field` → fallback interno
 *
 * - menuWidth → 180
 * - menuBackground → transparent
 * - borderRadius → 0
 * - height → 500px
 *
 * Itens com conteúdo:
 *
 * - itemMenuBackgroundColor → transparent
 * - itemMenuBackgroundColorHover → grey.300
 * - itemMenuBackgroundColorSelected → primary.main
 * - itemMenuColor → black
 * - itemMenuColorSelected → black
 * - itemMenuBorderRadius → 16px
 *
 * Itens sem conteúdo:
 *
 * - itemMenuBackgroundColorSemContent → transparent
 * - itemMenuColorSemContent → black
 *
 * Área de conteúdo:
 *
 * - contentBackground → grey.50
 * - contentGap → 2
 * - borderRadius → 0
 * - height → 500px
 *
 * ---
 *
 * Tipografia
 *
 * O componente utiliza variantes tipográficas do Material UI através das props:
 *
 * - `itemMenuVariant`
 * - `itemMenuVariantSemContent`
 *
 * Ordem de prioridade:
 *
 * `prop` → `theme.typography[variant]` → `theme.typography.body1`
 *
 * Quando informada, a variante é aplicada diretamente utilizando os estilos
 * definidos em `theme.typography`.
 *
 * ---
 *
 * @param {import("../types/NavItem").NavItem[]} items
 * Lista de itens exibidos no menu lateral.
 *
 * Cada item pode conter:
 *
 * - `label` → texto exibido no menu
 * - `content` → conteúdo renderizado na área principal
 *
 * Regras especiais:
 *
 * - Itens sem `content` são renderizados como rótulos estáticos
 * - Quando `label === "DIVIDER"` será renderizado um divisor visual
 *
 * ---
 *
 * @param {number} [indexItemSelecionado=0]
 * Índice do item inicialmente selecionado.
 *
 * Caso o valor informado esteja fora do intervalo válido da lista de `items`,
 * o componente utiliza automaticamente o índice `0`.
 *
 * @param {number} [menuWidth=180]
 * Largura do menu lateral.
 *
 * @param {string} [itemMenuBackgroundColorSemContent="transparent"]
 * Cor de fundo aplicada aos itens do menu que não possuem conteúdo.
 *
 * @param {string} [itemMenuColorSemContent="black"]
 * Cor de texto aplicada aos itens do menu que não possuem conteúdo.
 *
 * @param {import("@mui/material").TypographyVariant} [itemMenuVariantSemContent="body1"]
 * Variante tipográfica aplicada aos itens do menu sem conteúdo.
 *
 * @param {string} [menuBackground="transparent"]
 * Cor de fundo do container do menu lateral.
 *
 * @param {string} [itemMenuBackgroundColor="transparent"]
 * Cor de fundo padrão dos itens do menu que possuem conteúdo.
 *
 * @param {string} [itemMenuBackgroundColorSelected="primary.main"]
 * Cor de fundo aplicada ao item atualmente selecionado.
 *
 * @param {string} [itemMenuBackgroundColorHover="grey.300"]
 * Cor de fundo aplicada ao passar o cursor sobre itens não selecionados.
 *
 * @param {string} [itemMenuColor="black"]
 * Cor de texto padrão dos itens selecionáveis.
 *
 * @param {string} [itemMenuColorSelected="black"]
 * Cor de texto aplicada ao item atualmente selecionado.
 *
 * @param {import("@mui/material").TypographyVariant} [itemMenuVariant="body1"]
 * Variante tipográfica aplicada aos itens selecionáveis do menu.
 *
 * @param {string | number} [borderRadius="0"]
 * Raio de borda aplicado ao menu lateral e à área de conteúdo.
 *
 * @param {string | number} [itemMenuBorderRadius="16px"]
 * Raio de borda aplicado individualmente aos itens do menu.
 *
 * @param {string} [contentBackground="grey.50"]
 * Cor de fundo da área onde o conteúdo do item selecionado é exibido.
 *
 * @param {string | number} [height="500px"]
 * Altura do componente aplicada tanto ao menu quanto à área de conteúdo.
 *
 * @param {React.ReactNode} [renderTopMenu]
 * Conteúdo opcional renderizado no topo do menu lateral.
 *
 * Pode ser utilizado para:
 *
 * - Títulos
 * - Botões
 * - Filtros
 * - Informações adicionais
 *
 * @param {React.ReactNode} [renderBottomMenu]
 * Conteúdo opcional renderizado no rodapé do menu lateral.
 *
 * Útil para:
 *
 * - Ações secundárias
 * - Informações complementares
 * - Links auxiliares
 *
 * @param {number | string} [contentGap=2]
 * Espaçamento horizontal entre o menu lateral e a área de conteúdo.
 *
 * @example
 * Uso básico
 *
 * ```tsx
 * const items = [
 *   { label: "Visão geral", content: <div>Conteúdo da visão geral</div> },
 *   { label: "Configurações", content: <div>Conteúdo de configurações</div> },
 *   { label: "DIVIDER" },
 *   { label: "Informações" },
 *   { label: "Usuários", content: <div>Conteúdo de usuários</div> }
 * ]
 *
 * <SideNav
 *   items={items}
 *   menuWidth={220}
 *   contentBackground="white"
 *   itemMenuBackgroundColorSelected="primary.main"
 * />
 *
 * @example
 * Uso com conteúdo customizado no menu
 *
 * ```tsx
 * <SideNav
 *   items={items}
 *   renderTopMenu={<Box p={2}>Menu</Box>}
 *   renderBottomMenu={<Box p={2}>Rodapé</Box>}
 * />
 * ```
 */

export default function SideNav({
  items,
  indexItemSelecionado = 0,
  menuWidth = 180,
  itemMenuBackgroundColorSemContent = "transparent",
  itemMenuColorSemContent = "black",
  itemMenuVariantSemContent = "body1",
  menuBackground = "transparent",
  borderRadius = "0",
  itemMenuBorderRadius = "16px",
  itemMenuBackgroundColor = "transparent",
  itemMenuBackgroundColorHover = "grey.300",
  itemMenuBackgroundColorSelected = "primary.main",
  itemMenuColor = "black",
  itemMenuColorSelected = "black",
  itemMenuVariant = "body1",
  contentBackground = "grey.50",
  renderTopMenu,
  renderBottomMenu,
  height = "500px",
  contentGap = 2,
}: SideNavProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const initialIndex =
    indexItemSelecionado >= 0 && indexItemSelecionado < items.length
      ? indexItemSelecionado
      : 0;

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <Container>
      <SideNavContainer
        height={height}
        menuWidth={menuWidth}
        menuBackground={menuBackground}
        borderRadius={borderRadius}
      >
        <Box>
          {renderTopMenu && <Box>{renderTopMenu}</Box>}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {items.map((item, idx) => {
              if (!item.content) {
                if (item.label?.toUpperCase() === "DIVIDER") {
                  return <Divider key={`divider-${idx}`} />;
                }

                return (
                  <MenuItemBox
                    key={`${item.label}-${idx}`}
                    typographyVariant={itemMenuVariantSemContent}
                    itemMenuBorderRadius={itemMenuBorderRadius}
                    itemMenuBackgroundColor={itemMenuBackgroundColorSemContent}
                    itemMenuColor={itemMenuColorSemContent}
                    sx={{ cursor: "default" }}
                  >
                    {item.label}
                  </MenuItemBox>
                );
              }

              return (
                <MenuItemBox
                  key={`${item.label}-${idx}`}
                  active={activeIndex === idx}
                  typographyVariant={itemMenuVariant}
                  itemMenuBorderRadius={itemMenuBorderRadius}
                  itemMenuBackgroundColor={itemMenuBackgroundColor}
                  itemMenuBackgroundColorHover={itemMenuBackgroundColorHover}
                  itemMenuBackgroundColorSelected={
                    itemMenuBackgroundColorSelected
                  }
                  itemMenuColor={itemMenuColor}
                  itemMenuColorSelected={itemMenuColorSelected}
                  onClick={() => setActiveIndex(idx)}
                >
                  {item.label}
                </MenuItemBox>
              );
            })}
          </Box>
        </Box>

        {renderBottomMenu && (
          <Box sx={{ mt: 2, pt: 2, flexShrink: 0 }}>
            {renderBottomMenu}
          </Box>
        )}
      </SideNavContainer>

      <SideNavContent
        contentBackground={contentBackground}
        contentGap={contentGap}
        height={height}
        borderRadius={borderRadius}
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
      </SideNavContent>
    </Container>
  );
}

SideNav.displayName = "SideNav";