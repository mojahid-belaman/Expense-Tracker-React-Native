import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import Expenses from "../components/Expenses/Expenses";
import { ExpenseCtx } from "../store/context/expenseContext";
import { getDateLast7Days } from "../utils/date";
import { getExpenses } from "../utils/api";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { colors } from "../constants/styles";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const { expenses, setExpenses } = useContext(ExpenseCtx);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const last7Days = getDateLast7Days(new Date(), 7);
  const recentExpenses = expenses.filter(
    (expense) => expense.date >= last7Days && expense.date <= new Date()
  );

  useEffect(() => {
    async function fetchExpenses() {
      try {
        setLoading(true);
        const expenses = await getExpenses();
        setExpenses(expenses);
      } catch (error: any) {
        setError(error.message);
      }
      setLoading(false);
    }
    fetchExpenses();
  }, []);

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  if (loading) {
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
