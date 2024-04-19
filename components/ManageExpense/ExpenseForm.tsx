import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import Input from "./Input";
import { colors } from "../../constants/styles";
import Button from "../UI/Button";
import { expenseType } from "../../store/context/expenseContext";
import { getFormatterDate } from "../../utils/date";

interface IExpenseState {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
}

interface IExpenseForm {
  submitLabel: string;
  fillField: expenseType | undefined;
  onSubmit: (expense: Omit<expenseType, "id">) => void;
  onCancel: () => void;
}

function ExpenseForm(props: IExpenseForm) {
  const { onCancel, submitLabel, onSubmit, fillField } = props;
  const [expenseState, setExpenseState] = useState<IExpenseState>({
    amount: { value: fillField?.amount.toString() || "", isValid: true },
    date: {
      value: (fillField && getFormatterDate(fillField?.date)) || "",
      isValid: true,
    },
    description: { value: fillField?.description || "", isValid: true },
  });

  function expenseChangeHandler(identifier: string, enteredValue: string) {
    setExpenseState((currExpense) => ({
      ...currExpense,
      [identifier]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +expenseState.amount.value,
      date: new Date(expenseState.date.value),
      description: expenseState.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 1;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setExpenseState((currExpense) => ({
        amount: { value: currExpense.amount.value, isValid: amountIsValid },
        date: { value: currExpense.date.value, isValid: dateIsValid },
        description: {
          value: currExpense.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  const formIsNotValid =
    !expenseState.amount.isValid ||
    !expenseState.date.isValid ||
    !expenseState.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.subContainer}>
        <Input
          label="Amount"
          inputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: expenseChangeHandler.bind(null, "amount"),
            value: expenseState.amount.value,
          }}
          style={styles.outerStyleInput}
          isValid={expenseState.amount.isValid}
        />
        <Input
          label="Date"
          inputConfig={{
            placeholder: "YYYY-MM-DD",
            placeholderTextColor: colors.primary200,
            maxLength: 10,
            onChangeText: expenseChangeHandler.bind(null, "date"),
            value: expenseState.date.value,
          }}
          style={styles.outerStyleInput}
          isValid={expenseState.date.isValid}
        />
      </View>
      <Input
        label="Description"
        inputConfig={{
          multiline: true,
          onChangeText: expenseChangeHandler.bind(null, "description"),
          value: expenseState.description.value,
        }}
        isValid={expenseState.description.isValid}
      />
      {formIsNotValid && (
        <Text style={styles.textError}>
          Invalid Input Value - Please Check Your Entered Data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="fat" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 10,
    letterSpacing: 2,
  },
  subContainer: {
    flexDirection: "row",
  },
  outerStyleInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 10,
  },
  textError: {
    color: colors.error500,
    marginVertical: 6,
    textAlign: "center",
    fontWeight: "bold",
  },
});
