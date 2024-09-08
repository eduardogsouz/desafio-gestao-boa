import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function CharacterCreationForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Vivo");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [origin, setOrigin] = useState("");
  const [location, setLocation] = useState("");
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

  const genderOptions = ["Masculino", "Feminino", "Sem gênero", "Desconhecido"];

  const handleSubmit = () => {
    router.back();
    console.log({ name, status, species, type, gender, origin, location });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={width * 0.06} color="#00b5cc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Adicionar Personagem</Text>
      </View>
      <ScrollView style={styles.form}>
        <View style={styles.formContent}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do personagem"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Status</Text>
          <View style={styles.radioGroup}>
            {["Vivo", "Morto"].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioButton}
                onPress={() => setStatus(option)}
              >
                <View style={styles.radio}>
                  {status === option && <View style={styles.radioSelected} />}
                </View>
                <Text style={styles.radioLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Espécie</Text>
          <TextInput
            style={styles.input}
            placeholder="Espécie do personagem"
            placeholderTextColor="#666"
            value={species}
            onChangeText={setSpecies}
          />

          <Text style={styles.label}>Tipo</Text>
          <TextInput
            style={styles.input}
            placeholder="Tipo do personagem"
            placeholderTextColor="#666"
            value={type}
            onChangeText={setType}
          />

          <Text style={styles.label}>Gênero</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsGenderModalVisible(true)}
          >
            <Text style={gender ? styles.dropdownText : styles.placeholderText}>
              {gender || "Selecione o gênero"}
            </Text>
            <Ionicons name="chevron-down" size={width * 0.06} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.label}>Origem</Text>
          <TextInput
            style={styles.input}
            placeholder="Planeta de Origem"
            placeholderTextColor="#666"
            value={origin}
            onChangeText={setOrigin}
          />

          <Text style={styles.label}>Localização atual</Text>
          <TextInput
            style={styles.input}
            placeholder="Localização atual"
            placeholderTextColor="#666"
            value={location}
            onChangeText={setLocation}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.addButtonText}>ADICIONAR PERSONAGEM</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={isGenderModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Gênero</Text>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => {
                  setGender(option);
                  setIsGenderModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsGenderModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: width * 0.04,
    paddingTop: height * 0.06,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    padding: width * 0.02,
  },
  headerTitle: {
    color: "#00b5cc",
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginLeft: width * 0.04,
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: width * 0.04,
  },
  label: {
    color: "#fff",
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  input: {
    backgroundColor: "#2c2c2c",
    borderRadius: 8,
    padding: width * 0.03,
    color: "#fff",
    marginBottom: height * 0.02,
    fontSize: width * 0.04,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: height * 0.02,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: width * 0.08,
  },
  radio: {
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: width * 0.025,
    borderWidth: 2,
    borderColor: "#00b5cc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.02,
  },
  radioSelected: {
    width: width * 0.025,
    height: width * 0.025,
    borderRadius: width * 0.0125,
    backgroundColor: "#00b5cc",
  },
  radioLabel: {
    color: "#fff",
    fontSize: width * 0.035,
  },
  dropdown: {
    backgroundColor: "#2c2c2c",
    borderRadius: 8,
    padding: width * 0.03,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  dropdownText: {
    color: "#fff",
    fontSize: width * 0.04,
  },
  placeholderText: {
    color: "#666",
    fontSize: width * 0.04,
  },
  addButton: {
    backgroundColor: "#00b5cc",
    borderRadius: 8,
    padding: width * 0.04,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#2c2c2c",
    borderRadius: 8,
    padding: width * 0.04,
    width: width * 0.8,
  },
  modalTitle: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  modalOptionText: {
    color: "#fff",
    fontSize: width * 0.04,
  },
  modalCloseButton: {
    marginTop: height * 0.02,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "#00b5cc",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});
