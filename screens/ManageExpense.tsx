import { useContext, useLayoutEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { PropsManageExpense } from "../types/screenType";
import IconButton from "../components/UI/IconButton";
import { colors } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpenseCtx } from "../store/context/expenseContext";

const ManageExpense = ({ navigation, route }: PropsManageExpense) => {
  const { addExpense, updateExpense, deleteExpense } = useContext(ExpenseCtx);
  const editedExpenseId = route.params?.expenseId;
  const isEdited = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdited ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdited]);

  function deleteExpenseHandler() {
    if (editedExpenseId) {
      Alert.alert("Delete Expense", "Are you sure?", [
        {
          text: "CANCEL",
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress() {
            deleteExpense(editedExpenseId);
            navigation.goBack();
          },
        },
      ]);
    }
  }

  function confirmHandler() {
    if (isEdited)
      updateExpense({
        id: editedExpenseId,
        description: "test!!!",
        amount: 30.33,
        date: new Date("2024-01-1"),
      });
    else
      addExpense({
        description: "test",
        amount: 70.33,
        date: new Date("2024-01-18"),
      });
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="fat" style={styles.button} onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEdited ? "Update" : "Add"}
        </Button>
      </View>
      <View style={styles.deleteContainer}>
        {isEdited && (
          <IconButton
            icon="trash"
            color={colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        )}
      </View>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
  deleteContainer: {
    marginTop: 16,
    borderTopWidth: 2,
    borderTopColor: colors.primary50,
    alignItems: "center",
  },
});
