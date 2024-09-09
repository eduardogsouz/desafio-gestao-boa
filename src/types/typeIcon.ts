import { FontAwesome } from "@expo/vector-icons";

export type IIconProps = {
  icon?: keyof typeof FontAwesome.glyphMap;
  size?: number;
  color?: string;
};
