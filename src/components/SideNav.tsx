import { useEffect, useState, ReactNode } from "react";
import { Box, Divider, styled, TypographyVariant } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem } from "../types/NavItem";

interface SideNavProps {
  items: NavItem[];
  indexItemSelecionado?: number;
  menuWidth?: number | string;
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
  marginDivider?: string | number;
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
  borderRadius,
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
}>(
  ({
    contentGap = 2,
    contentBackground = "transparent",
    borderRadius = 2,
    height = "100%",
  }) => ({
    width: "auto",
    flex: 1,
    marginLeft: contentGap,
    padding: 16,
    backgroundColor: contentBackground,
    borderRadius,
    minHeight: height,
    maxHeight: height,
    position: "relative",
    overflowY: "auto",
  })
);

const getValidIndex = (index: number, itemsLength: number) => {
  if (index >= 0 && index < itemsLength) return index;
  return 0;
};

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
  marginDivider = "8px 0",
}: SideNavProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const [activeIndex, setActiveIndex] = useState(
    getValidIndex(indexItemSelecionado, items.length)
  );

  useEffect(() => {
    setActiveIndex(getValidIndex(indexItemSelecionado, items.length));
  }, [indexItemSelecionado, items.length]);

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
                  return (
                    <Divider
                      key={`divider-${idx}`}
                      sx={{ margin: marginDivider }}
                    />
                  );
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