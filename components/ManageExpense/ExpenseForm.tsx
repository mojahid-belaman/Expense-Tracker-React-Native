import { StyleSheet, View } from "react-native";

import Input from "./Input";

function ExpenseForm() {
  function amountChangeHandler() {}

  function dateChangeHandler() {}

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Input
          label="Amount"
          inputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler,
          }}
          style={styles.outerStyleInput}
        />
        <Input
          label="Date"
          inputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: dateChangeHandler,
          }}
          style={styles.outerStyleInput}
        />
      </View>
      <Input
        label="Description"
        inputConfig={{
          multiline: true,
        }}
      />
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  subContainer: {
    flexDirection: "row",
  },
  outerStyleInput: {
    flex: 1,
  },
});
