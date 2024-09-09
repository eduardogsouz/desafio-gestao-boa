import { FlatListProps } from "react-native";
import { CharactersDatabase } from "./CharacterDataBase";

export type CharacterListProps = FlatListProps<any> & {
  data: CharactersDatabase[];
  isLoading: boolean;
  hasTextSearch: string;
};
