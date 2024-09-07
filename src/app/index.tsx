import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import CharacterCard from "@/components/CharacterCard";
import CharacterList from "@/components/CharacterList";
import Input from "@/components/Input";

import { CharactersDatabase } from "@/types/CharacterDataBase";
import { globalStyles } from "@/styles/globalStyles";
import { tranferData } from "@/database/APIFromDatabase";
import { useCharactersDatabase } from "@/database/useCharactersDatabase";

const heightScreen = Dimensions.get("screen").height;
const widthScreen = Dimensions.get("screen").width;

const App = () => {
  const [characters, setCharacters] = useState<CharactersDatabase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const characterDatabase = useCharactersDatabase();

  async function list() {
    try {
      const response = await characterDatabase.searchByName(search);
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
  }, [search, isLoading]);

  return (
    <ScrollView
      style={globalStyles.background}
      contentContainerStyle={[styles.container]}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("@/assets/images/Logo.png")}
        />
        <Button style={styles.homebuttons}>
          <Button.Icon icon="plus" size={30} />
        </Button>
      </View>

      <View style={{ flex: 1, flexDirection: "row", marginTop: "8%", gap: 10 }}>
        <Input
          placeholder="Digite o nome do personagem!"
          placeholderTextColor={"rgba(158, 187, 187, 0.5)"}
          textAlign="center"
          style={styles.searchinput}
          onChangeText={setSearch}
        />
        <Button style={styles.homebuttons}>
          <Button.Icon icon="filter" size={30} />
        </Button>
      </View>

      <CharacterList
        isLoading={isLoading}
        data={characters}
        scrollEnabled={false}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CharacterCard data={item} />}
        columnWrapperStyle={styles.listCards}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "9%",
    marginLeft: "4%",
  },

  logo: {
    resizeMode: "contain",
    width: widthScreen * 0.4,
    height: heightScreen * 0.06,
  },

  header: {
    flex: 1,
    flexDirection: "row",
    gap: widthScreen * 0.39,
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

  searchinput: {
    color: "#FFFFFF",
    fontSize: 17,
    width: widthScreen * 0.766,
    backgroundColor: "#374151",
    borderRadius: 10,
    height: "100%",
  },

  listCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 23,
    marginTop: 20,
  },
});

export default App;
