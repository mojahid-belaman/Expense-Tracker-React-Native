import { FlatList } from "react-native";

import ExpenseItem from "./ExpenseItem";
import { expenseType } from "../../store/context/expenseContext";

function ExpenseList({ expenses }: { expenses: expenseType[] }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ExpenseItem {...item} />}
    />
  );
}

export default ExpenseList;
