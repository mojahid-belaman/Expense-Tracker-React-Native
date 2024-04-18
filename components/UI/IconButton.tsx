import { Pressable, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IIconButton {
  icon: keyof typeof Ionicons.glyphMap;
  color: string | undefined;
  size: number;
  onPress: () => void;
}

function IconButton(props: IIconButton) {
  const { icon, color, size, onPress } = props;
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Ionicons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  pressed: {
    opacity: 0.4,
  },
});
