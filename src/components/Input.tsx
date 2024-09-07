import { TextInput, TextInputProps } from "react-native";

export default function Input({ ...rest }: TextInputProps) {
  return <TextInput {...rest} />;
}
