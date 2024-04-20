import { useContext, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { PropsManageExpense } from "../types/screenType";
import IconButton from "../components/UI/IconButton";
import { colors } from "../constants/styles";
import { ExpenseCtx, expenseType } from "../store/context/expenseContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { editExpense, postExpense, trashExpense } from "../utils/api";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const ManageExpense = ({ navigation, route }: PropsManageExpense) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenseCtx);
  const editedExpenseId = route.params?.expenseId;
  const getExpenseEdit = expenses.find(
    (expense) => expense.id === editedExpenseId
  );
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
          async onPress() {
            setLoading(true);
            await trashExpense(editedExpenseId);
            deleteExpense(editedExpenseId);
            navigation.goBack();
          },
        },
      ]);
    }
  }

  async function confirmHandler(expense: Omit<expenseType, "id">) {
    if (isEdited) {
      setLoading(true);
      updateExpense({ id: editedExpenseId, ...expense });
      await editExpense({ id: editedExpenseId, ...expense });
    } else {
      setLoading(true);
      const id: string = await postExpense(expense);
      const expenseData = {
        id,
        ...expense,
      };
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitLabel={isEdited ? "Update" : "Add"}
        fillField={getExpenseEdit}
        loading={loading}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />
      <View style={styles.deleteContainer}>
        {loading ? (
          <LoadingOverlay
            styleContainer={styles.indicatorContainer}
            indicatorConfig={{ size: "small", color: "white" }}
          />
        ) : (
          isEdited && (
            <IconButton
              icon="trash"
              color={colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          )
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
  deleteContainer: {
    marginTop: 16,
    borderTopWidth: 2,
    borderTopColor: colors.primary50,
    alignItems: "center",
  },
  indicatorContainer: {
    padding: 24,
  },
});
