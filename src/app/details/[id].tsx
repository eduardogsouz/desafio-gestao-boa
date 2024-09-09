import { useCharactersDatabase } from "@/database/useCharactersDatabase";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");
export default function Details() {
  const [data, setData] = useState({
    name: "",
    status: true,
    species: "",
    type: "",
    gender: "",
    origin_name: "",
    location_name: "",
  });
  const [imageData, setImageData] = useState<any>();

  const characterDatabase = useCharactersDatabase();
  const params = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      characterDatabase.showDetails(Number(params.id)).then((response) => {
        if (response) {
          setData({
            name: response.name,
            status: response.status,
            species: response.species,
            type: response.type,
            gender: response.gender,
            origin_name: response.origin_name,
            location_name: response.location_name,
          });

          setImageData(response.image);
        }
      });
    }
  }, [params.id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={width * 0.06} color="#00b5cc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
      </View>

      <View>
        {imageData == null ? (
          <Image
            source={{
              uri: "https://m.media-amazon.com/images/I/71Cd5DDnL4L._AC_SL1500_.jpg",
            }}
            style={styles.image}
          />
        ) : (
          <Image source={{ uri: `${imageData}` }} style={styles.image} />
        )}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={[styles.iconBackground, styles.deleteIcon]}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={width * 0.06}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconBackground, styles.editIcon]}
            onPress={() => router.navigate("/edit_form/" + params.id)}
          >
            <MaterialCommunityIcons
              name="pencil"
              size={width * 0.06}
              color="#1c1c1c"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.characterName}>{data.name}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Informações</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Status:</Text>
          {Number(data.status) == 1 ? (
            <View
              style={[styles.statusContainer, { backgroundColor: "#307848" }]}
            >
              <FontAwesome5 name="heartbeat" size={width * 0.05} />
              <Text style={[styles.infoText, { color: "#50c878" }]}>Vivo</Text>
            </View>
          ) : (
            <View
              style={[styles.statusContainer, { backgroundColor: "#4C0000" }]}
            >
              <Image
                source={require("@/assets/images/tomb.png")}
                style={{ height: height * 0.026, width: width * 0.05 }}
              />
              <Text style={[styles.infoText, { color: "#000000" }]}>Morto</Text>
            </View>
          )}
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Espécie:</Text>
          <View style={styles.infoValue}>
            <FontAwesome5 name="user" size={width * 0.04} color="#FFFFFF" />
            <Text style={styles.infoText}>{data.species}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Tipo:</Text>
          <View style={styles.infoValue}>
            {data.type != "" || null ? (
              <Text style={styles.infoText}>{data.type}</Text>
            ) : (
              <Text style={styles.infoText}>None</Text>
            )}
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Gênero:</Text>
          <View style={styles.infoValue}>
            <Text style={styles.infoText}>{data.gender}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Origem:</Text>
          <View style={styles.infoValue}>
            <Entypo name="globe" size={width * 0.04} color="#FFFFFF" />
            <Text style={styles.infoText}>{data.origin_name}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Localização:</Text>
          <View style={styles.infoValue}>
            <Entypo name="location-pin" size={width * 0.04} color="#FFFFFF" />
            <Text style={styles.infoText}>{data.location_name}</Text>
          </View>
        </View>
      </View>
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
  },

  headerTitle: {
    color: "#00b5cc",
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginLeft: width * 0.02,
  },

  image: {
    width: "100%",
    height: height * 0.4,
    resizeMode: "cover",
  },

  iconContainer: {
    position: "absolute",
    top: height * 0.02,
    left: width * 0.04,
    right: width * 0.04,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconBackground: {
    borderRadius: width * 0.03,
    padding: width * 0.035,
  },

  deleteIcon: {
    backgroundColor: "#ff0000",
  },

  editIcon: {
    backgroundColor: "#ffd700",
  },

  nameContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: width * 0.04,
  },

  characterName: {
    color: "#ffffff",
    fontSize: width * 0.06,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  infoContainer: {
    padding: width * 0.04,
  },

  infoTitle: {
    color: "#ffffff",
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },

  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.015,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: width * 0.02,
    padding: width * 0.03,
  },

  infoLabel: {
    color: "#888",
    fontSize: width * 0.04,
  },

  infoValue: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: width * 0.03,
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.02,
  },

  infoText: {
    color: "#ffffff",
    fontSize: width * 0.04,
    marginLeft: width * 0.02,
  },
});
