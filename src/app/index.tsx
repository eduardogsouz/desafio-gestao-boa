import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useEffect } from "react";

import { globalStyles } from "@/styles/globalStyles";
import Button from "@/components/Button";
import Input from "@/components/Input";
import CharacterCard from "@/components/CharacterCard";
import { tranferData } from "@/database/APIFromDatabase";

const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;

const App = () => {
  useEffect(() => {
    tranferData();
  }, []);

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
        />
        <Button style={styles.homebuttons}>
          <Button.Icon icon="filter" size={30} />
        </Button>
      </View>

      <View style={styles.listCards}>
        <CharacterCard />
      </View>
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
