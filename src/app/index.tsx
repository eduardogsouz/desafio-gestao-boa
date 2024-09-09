import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

import Button from "@/components/Button";
import CharacterCard from "@/components/CharacterCard";
import CharacterList from "@/components/CharacterList";
import Input from "@/components/Input";
import FilterModal from "@/components/modalFilter";

import { CharactersDatabase } from "@/types/CharacterDataBase";
import { tranferData } from "@/database/APIFromDatabase";
import { useCharactersDatabase } from "@/database/useCharactersDatabase";

const heightScreen = Dimensions.get("screen").height;
const widthScreen = Dimensions.get("screen").width;

const App = () => {
  const [characters, setCharacters] = useState<CharactersDatabase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [whichStatus, setWhichStatus] = useState(2);
  const [search, setSearch] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const characterDatabase = useCharactersDatabase();

  async function list() {
    try {
      const response = await characterDatabase.searchByName(
        search,
        whichStatus
      );
      setCharacters(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function loading() {
    const dataLoading = await tranferData();
    setIsLoading(dataLoading);
  }

  useEffect(() => {
    loading();
    list();
  }, [search, isLoading, whichStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("@/assets/images/Logo.png")}
        />
        <Button
          style={styles.homebuttons}
          onPress={() => router.navigate("/forms/CharacterCreationForm")}
        >
          <Button.Icon icon="plus" size={30} />
        </Button>
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Digite o nome do personagem!"
          placeholderTextColor={"rgba(158, 187, 187, 0.5)"}
          textAlign="center"
          style={styles.searchinput}
          onChangeText={setSearch}
        />
        <Button
          style={styles.homebuttons}
          onPress={() => setIsFilterVisible(true)}
        >
          <Button.Icon icon="filter" size={30} />
        </Button>
      </View>

      <CharacterList
        isLoading={isLoading}
        data={characters}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CharacterCard
            onPress={() => router.navigate("/details/" + item.id)}
            data={item}
          />
        )}
        columnWrapperStyle={styles.listCards}
      />

      <FilterModal
        whichStatus={whichStatus}
        isVisible={isFilterVisible}
        onApply={(status) => setWhichStatus(status)}
        onClose={(visibility) => setIsFilterVisible(visibility)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    paddingTop: heightScreen * 0.03,
  },

  logo: {
    resizeMode: "contain",
    width: widthScreen * 0.4,
    height: heightScreen * 0.06,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: widthScreen * 0.3,
    alignItems: "center",
    marginVertical: heightScreen * 0.01,
  },

  homebuttons: {
    backgroundColor: "#11b0c8",
    justifyContent: "center",
    paddingBottom: "3%",
    paddingTop: "3%",
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 10,
  },

  searchContainer: {
    flexDirection: "row",
    marginLeft: widthScreen * 0.028,
    marginVertical: heightScreen * 0.02,
    gap: widthScreen * 0.03,
  },

  searchinput: {
    color: "#FFFFFF",
    fontSize: 17,
    width: widthScreen * 0.766,
    backgroundColor: "#374151",
    borderRadius: 10,
  },

  listCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default App;
