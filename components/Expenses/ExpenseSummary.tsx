import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/styles";
import { expenseType } from "../../store/context/expenseContext";

function ExpenseSummary({
  expenses,
  period,
}: {
  expenses: expenseType[];
  period: string;
}) {
  const totalExpenses = expenses.reduce((sum: number, expense: any) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.sum}>${totalExpenses.toFixed(2)}</Text>
    </View>
  );
}

export default ExpenseSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.primary50,
    borderRadius: 10,
  },
  period: {
    color: colors.primary500,
  },
  sum: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary500,
  },
});
