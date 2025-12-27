import ItemMenu from "@/components/ItemMenu";
import { Divider } from "@mui/material";
import { ReactElement } from "react";

export type ItemMenuConfig = {    
    component :ReactElement<typeof ItemMenu> | ReactElement<typeof Divider>;
};

