import { CharactersDatabase } from "@/types/CharacterDataBase";
import { useRef, useState } from "react";
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
  const ref = useRef<FlatList>(null);
  const [numberScroll, setNumberScroll] = useState(1);
  const [loadingCards, setLoadingCards] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(true);

  let sliceFinalNumber = 20 * numberScroll;
  let sliceInitialNumber = 0;

  sliceInitialNumber = sliceFinalNumber - 20;

  const renderData = data.slice(sliceInitialNumber, sliceFinalNumber);

  const renderFooter = () => {
    if (loadingCards == true) {
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

  const whenEndOfList = () => {
    ref.current?.scrollToOffset({ offset: 0, animated: true }),
      setNumberScroll(numberScroll + 1),
      setLoadingCards(true);
  };

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal isVisible={isModalVisible} style={{ alignItems: "center" }}>
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
        ref={ref}
        data={renderData}
        onEndReached={whenEndOfList}
        onEndReachedThreshold={0.1}
        refreshing={loading}
        onRefresh={() => (setNumberScroll(1), setLoading(false))}
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
