import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { colors } from "../../constants/styles";

interface IErrorOverlay {
  message: string;
}

function ErrorOverlay(props: IErrorOverlay) {
  const { message } = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occured!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
