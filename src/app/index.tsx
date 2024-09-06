import { StyleSheet, View, Text } from "react-native";

export default function App() {
  return (
    <View style={styles.startBox}>
      <Text>Teste</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  startBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
