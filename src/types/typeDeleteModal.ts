import { ModalBaseProps } from "react-native";

export type DeleteModalProps = ModalBaseProps & {
  isVisible: boolean;
  onClose: (visibility: boolean) => void;
  onConfirm: (id: number) => void;
  itemName: string;
  itemID: string;
};
