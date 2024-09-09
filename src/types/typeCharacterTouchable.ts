import { TouchableOpacityProps } from "react-native";

export type CharacterTouchableProps = TouchableOpacityProps & {
  data: {
    id: string;
    name: string;
    status: boolean;
    species: string;
    image: string | null;
  };
};
