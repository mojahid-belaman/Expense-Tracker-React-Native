import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { colors } from "../../constants/styles";

interface IInput {
  label: string;
  inputConfig?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  isValid: boolean;
}

function Input({ label, inputConfig, style, isValid }: IInput) {
  const inputStyle: StyleProp<ViewStyle> = [styles.input];

  if (inputConfig && inputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }

  if (!isValid) {
    inputStyle.push(styles.inputError);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, !isValid && styles.labelError]}>{label}</Text>
      <TextInput style={inputStyle} {...inputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: colors.primary100,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    backgroundColor: colors.primary100,
    color: colors.primary700,
    borderRadius: 6,
    padding: 4,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  labelError: {
    color: colors.error500,
  },
  inputError: {
    backgroundColor: colors.error50,
  },
});
