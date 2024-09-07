import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  PressableProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = PressableProps & {
  data: {
    id: string;
    name: string;
    status: boolean;
    species: string;
    image: string | null;
  };
};

export default function CharacterCard({ data, ...rest }: Props) {
  return (
    <Pressable {...rest} style={styles.card}>
      <View>
        <View style={{ height: 170 }}>
          <Image
            source={{
              uri: `${data.image}`,
            }}
            style={[styles.image]}
          />
        </View>
        <View
          style={[
            styles.IconContainer,
            data.status == true
              ? { backgroundColor: "#48bb78" }
              : { backgroundColor: "#c80000" },
          ]}
        >
          <Image
            style={{ height: 28, width: 28, resizeMode: "contain" }}
            source={
              data.status == true
                ? require("@/assets/images/Alive.png")
                : require("@/assets/images/tomb.png")
            }
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{data.name}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.categoryContainer,
            data.species.length < 10
              ? { marginHorizontal: 10 }
              : { marginHorizontal: 0 },
          ]}
        >
          <MaterialCommunityIcons name="alien-outline" size={25} />
          <Text allowFontScaling={true} style={[styles.category]}>
            {data.species}
          </Text>
        </View>
      </View>
    </Pressable>
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
    fontSize: 19,
    textAlign: "center",
  },
});
