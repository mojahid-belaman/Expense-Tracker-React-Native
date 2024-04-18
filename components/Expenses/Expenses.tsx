import { StyleSheet, Text, View } from "react-native";

import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "./ExpenseList";
import { colors } from "../../constants/styles";
import { expenseType } from "../../store/context/expenseContext";

function Expenses({
  expenses,
  period,
  fallBackText,
}: {
  expenses: expenseType[];
  period: string;
  fallBackText: string;
}) {
  let content = <Text style={styles.emptyExpense}>{fallBackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpenseList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} period={period} />
      {content}
    </View>
  );
}

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary700,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
  },
  emptyExpense: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginTop: 24,
  },
});
