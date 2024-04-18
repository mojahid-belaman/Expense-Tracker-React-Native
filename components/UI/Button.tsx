import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/styles";

interface IButton {
  children: React.ReactNode;
  style?: object;
  mode?: string;
  onPress: () => void;
}

function Button(props: IButton) {
  const { children, mode, style, onPress } = props;
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "fat" && styles.fat]}>
          <Text style={[styles.textButton, mode === "fat" && styles.textFat]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.primary500,
  },
  fat: {
    backgroundColor: "transparent",
  },
  textButton: {
    color: "white",
    textAlign: "center",
  },
  textFat: {
    color: colors.primary100,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: colors.primary100,
    borderRadius: 4,
  },
});
