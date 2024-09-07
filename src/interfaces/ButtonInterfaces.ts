import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export interface IIconProps {
  icon?: keyof typeof FontAwesome.glyphMap;
  size?: number;
  color?: string;
}
