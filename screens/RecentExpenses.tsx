import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";

import Expenses from "../components/Expenses/Expenses";
import { ExpenseCtx } from "../store/context/expenseContext";
import { getDateLast7Days } from "../utils/date";
import { getExpenses } from "../utils/api";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { colors } from "../constants/styles";

function RecentExpenses() {
  const { expenses, setExpenses } = useContext(ExpenseCtx);
  const last7Days = getDateLast7Days(new Date(), 7);
  const recentExpenses = expenses.filter(
    (expense) => expense.date >= last7Days && expense.date <= new Date()
  );

  useEffect(() => {
    async function fetchExpenses() {
      const expenses = await getExpenses();
      setExpenses(expenses);
    }
    fetchExpenses();
  }, []);

  if (expenses.length === 0) {
    return (
      <LoadingOverlay
        styleContainer={styles.indicatorContainer}
        indicatorConfig={{ size: "large", color: "white" }}
      />
    );
  }

  return (
    <Expenses
      expenses={recentExpenses}
      period="Last 7 Days"
      fallBackText="No Expenses Registered in the Last 7 Days."
    />
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    backgroundColor: colors.primary700,
  },
});
