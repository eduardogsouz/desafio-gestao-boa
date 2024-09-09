import { Pressable, PressableProps, Text, TextProps } from "react-native";

import { IIconProps } from "@/types/TypeIcon";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

function Button({ ...restProps }: PressableProps) {
  return <Pressable {...restProps}></Pressable>;
}

function Icon({ icon, size, color }: IIconProps) {
  return <FontAwesome name={icon} size={size} color={color} />;
}

function Title({ ...rest }: TextProps) {
  return <Text {...rest} />;
}

Button.Icon = Icon;
Button.Title = Title;

export default Button;
