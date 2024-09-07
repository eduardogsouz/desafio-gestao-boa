import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function CharacterCard() {
  const [text, setText] = useState("Mythological Creature"); // Será substituido pelo banco de dados!
  const [isAlive, setIsAlive] = useState(true); // Será substituido pelo banco de dados!
  return (
    <View style={styles.card}>
      <View>
        <View style={{ height: 170 }}>
          <Image
            source={{
              uri: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            }}
            style={[styles.image]}
          />
        </View>
        <View
          style={[
            styles.IconContainer,
            isAlive == true
              ? { backgroundColor: "#48bb78" }
              : { backgroundColor: "#c80000" },
          ]}
        >
          <Image
            style={{ height: 28, width: 28, resizeMode: "contain" }}
            source={
              isAlive == true
                ? require("@/assets/images/Alive.png")
                : require("@/assets/images/tomb.png")
            }
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Rick Sanchez</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.categoryContainer,
            text.length < 10
              ? { marginHorizontal: 10 }
              : { marginHorizontal: 0 },
          ]}
        >
          <MaterialCommunityIcons name="alien-outline" size={25} />
          <Text allowFontScaling={true} style={[styles.category]}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "45%",
    backgroundColor: "#515152",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  IconContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 100,
    padding: "5%",
  },
  nameContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.68)",
    padding: 8,
  },
  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    height: 70,
    justifyContent: "center",
  },
  categoryContainer: {
    backgroundColor: "#a0aec0",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  category: {
    fontSize: 21,
    textAlign: "center",
  },
});
