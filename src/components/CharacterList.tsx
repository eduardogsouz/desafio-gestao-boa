import { CharactersDatabase } from "@/types/CharacterDataBase";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

type CharacterListProps = FlatListProps<any> & {
  data: CharactersDatabase[];
  isLoading: boolean;
};

export default function CharacterList({
  data,
  isLoading,
  ...rest
}: CharacterListProps) {
  const [numberCards, setNumberCards] = useState(10);
  const [loadingCards, setLoadingCards] = useState(false);
  const [isModalVisible, setModalVisible] = useState(true);

  const renderData = data.slice(numberCards - 10, numberCards);

  const renderFooter = () => {
    if (loadingCards == false) {
      return null;
    } else {
      return (
        <View
          style={{
            alignSelf: "center",
            paddingBottom: "10%",
            paddingTop: "5%",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal
          isVisible={isModalVisible}
          style={{ alignItems: "center" }}
          swipeDirection={["up", "left", "right", "down"]}
        >
          <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text style={styles.text}>Carregando...</Text>
          </View>
        </Modal>
      </View>
    );
  } else {
    return (
      <FlatList
        data={renderData}
        onEndReached={() => (
          setNumberCards(numberCards + 20), setLoadingCards(true)
        )}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        {...rest}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333333",
    borderRadius: 20,
    padding: "10%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 15,
  },

  firsttimetext: {
    color: "#e4b363",
    fontWeight: "bold",
    fontSize: 11,
  },
});
