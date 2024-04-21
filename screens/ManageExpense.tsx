import { useContext, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { PropsManageExpense } from "../types/screenType";
import IconButton from "../components/UI/IconButton";
import { colors } from "../constants/styles";
import { ExpenseCtx, expenseType } from "../store/context/expenseContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { editExpense, postExpense, trashExpense } from "../utils/api";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ navigation, route }: PropsManageExpense) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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
            try {
              setLoading(true);
              await trashExpense(editedExpenseId);
              deleteExpense(editedExpenseId);
              navigation.goBack();
            } catch (err: any) {
              setLoading(false);
              setError(err.message);
            }
          },
        },
      ]);
    }
  }

  async function confirmHandler(expense: Omit<expenseType, "id">) {
    try {
      setLoading(true);
      if (isEdited) {
        updateExpense({ id: editedExpenseId, ...expense });
        await editExpense({ id: editedExpenseId, ...expense });
      } else {
        const id: string = await postExpense(expense);
        const expenseData = {
          id,
          ...expense,
        };
        addExpense(expenseData);
      }
      navigation.goBack();
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  if (error) {
    return <ErrorOverlay message={error} />;
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
