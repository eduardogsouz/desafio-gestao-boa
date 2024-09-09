import {
  Modal,
  ModalProps,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import { FilterModalProps } from "@/types/TypeFilterModal";

const { width, height } = Dimensions.get("window");

const statusOptions = [
  { value: 1, label: "Alive" },
  { value: 0, label: "Death" },
  { value: 2, label: "None" },
];

export default function FilterModal({
  isVisible,
  whichStatus,
  onClose,
  onApply,
}: FilterModalProps) {
  const handleApply = () => {
    onApply(whichStatus);
    onClose(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Filtros Avançados!</Text>

          <Text style={styles.filterLabel}>Status:</Text>
          <View style={styles.statusOptions}>
            {statusOptions.map((status) => (
              <TouchableOpacity
                key={status.value}
                style={[
                  styles.statusButton,
                  whichStatus === status.value && styles.selectedStatusButton,
                ]}
                onPress={() => onApply(status.value)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    whichStatus === status.value &&
                      styles.selectedStatusButtonText,
                  ]}
                >
                  {status.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#1c1c1c",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: width * 0.05,
    alignItems: "center",
  },

  title: {
    color: "#ffffff",
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },

  filterLabel: {
    color: "#ffffff",
    fontSize: width * 0.04,
    alignSelf: "flex-start",
    marginBottom: height * 0.01,
  },

  statusOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: height * 0.03,
  },

  statusButton: {
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00b5cc",
  },

  selectedStatusButton: {
    backgroundColor: "#00b5cc",
  },

  statusButtonText: {
    color: "#ffffff",
    fontSize: width * 0.04,
  },

  selectedStatusButtonText: {
    color: "#1c1c1c",
  },

  applyButton: {
    backgroundColor: "#00b5cc",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 5,
  },

  applyButtonText: {
    color: "#ffffff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});
