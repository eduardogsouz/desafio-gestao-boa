import React, { useEffect, useState } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import { useCharactersDatabase } from "@/database/useCharactersDatabase";

const { width, height } = Dimensions.get("window");

export default function CharacterEditingForm() {
  const [image, setImage] = useState<any>("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(0);
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [origin, setOrigin] = useState("");
  const [location, setLocation] = useState("");
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

  const genderOptions = ["Masculino", "Feminino", "Sem gênero", "Desconhecido"];

  const characterDatabase = useCharactersDatabase();
  const params = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      characterDatabase.showDetails(Number(params.id)).then((response) => {
        if (response) {
          setName(response.name),
            setStatus(Number(response.status)),
            setSpecies(response.species),
            setType(response.type),
            setGender(response.gender),
            setOrigin(response.origin_name),
            setLocation(response.location_name);
          setImage(response.image);
        }
      });
    }
  }, [params.id]);

  async function handleUpdate() {
    try {
      let tratedStatus;
      if (status == 1) {
        tratedStatus = true;
      } else {
        tratedStatus = false;
      }

      await characterDatabase.update({
        id: params.id,
        name: name,
        status: tratedStatus,
        species: species,
        type: type,
        gender: gender,
        location_name: location,
        origin_name: origin,
        image: image,
      });

      router.back();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={width * 0.06} color="#00b5cc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Personagem</Text>
      </View>
      <ScrollView style={styles.form}>
        <View style={styles.formContent}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={name}
          />

          <Text style={styles.label}>Status</Text>
          <View style={styles.radioGroup}>
            {["1", "0"].map((option: any) => (
              <TouchableOpacity
                key={option}
                style={styles.radioButton}
                onPress={() => setStatus(option)}
              >
                <View style={styles.radio}>
                  {status == option && <View style={styles.radioSelected} />}
                </View>
                {option == 1 ? (
                  <Text style={styles.radioLabel}> Vivo </Text>
                ) : (
                  <Text style={styles.radioLabel}> Morto </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Espécie</Text>
          <TextInput
            style={styles.input}
            value={species}
            onChangeText={setSpecies}
          />

          <Text style={styles.label}>Tipo</Text>

          <TextInput style={styles.input} value={type} onChangeText={setType} />

          <Text style={styles.label}>Gênero</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsGenderModalVisible(true)}
          >
            <Text style={styles.dropdownText}>{gender}</Text>
            <Ionicons name="chevron-down" size={width * 0.06} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.label}>Origem</Text>
          <TextInput
            style={styles.input}
            value={origin}
            onChangeText={setOrigin}
          />

          <Text style={styles.label}>Localização atual</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
            <Text style={styles.saveButtonText}>SALVAR ALTERAÇÕES</Text>
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
  saveButton: {
    backgroundColor: "#00b5cc",
    borderRadius: 8,
    padding: width * 0.04,
    alignItems: "center",
  },
  saveButtonText: {
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
