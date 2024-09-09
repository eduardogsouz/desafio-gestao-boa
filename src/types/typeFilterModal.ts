import { ModalProps } from "react-native";

export type FilterModalProps = ModalProps & {
  isVisible: boolean;
  whichStatus: number;
  onClose: (isVisible: boolean) => void;
  onApply: (status: number) => void;
};
