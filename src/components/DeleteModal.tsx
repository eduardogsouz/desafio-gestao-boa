import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ModalBaseProps,
} from "react-native";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

type DeleteModalProps = ModalBaseProps & {
  isVisible: boolean;
  onClose: (visibility: boolean) => void;
  onConfirm: (id: number) => void;
  itemName: string;
  itemID: string;
};

export default function DeleteModal({
  isVisible,
  onClose,
  onConfirm,
  itemName,
  itemID,
}: DeleteModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => onClose(false)}
      onBackButtonPress={() => onClose(false)}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}
    >
      <View style={styles.modalContent}>
        <Text style={styles.title}>Confirmar Exclusão</Text>
        <Text style={styles.message}>
          Tem certeza que deseja excluir "{itemName}"?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onClose(false)}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => (onConfirm(Number(itemID)), onClose(false))}
          >
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: width * 0.05,
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  message: {
    color: "#ffffff",
    fontWeight: "400",
    fontSize: width * 0.04,
    textAlign: "center",
    marginBottom: height * 0.03,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#374151",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.06,
    borderRadius: 5,
    marginRight: width * 0.02,
  },
  cancelButtonText: {
    color: "#ffffff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#dc2626",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.06,
    borderRadius: 5,
    marginLeft: width * 0.02,
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});
