import { useContext } from "react";

import Expenses from "../components/Expenses/Expenses";
import { ExpenseCtx } from "../store/context/expenseContext";
import { getDateLast7Days } from "../utils/date";

function RecentExpenses() {
  const { expenses } = useContext(ExpenseCtx);
  const last7Days = getDateLast7Days(new Date(), 7);
  const recentExpenses = expenses.filter(
    (expense) => expense.date >= last7Days && expense.date <= new Date()
  );

  return (
    <Expenses
      expenses={recentExpenses}
      period="Last 7 Days"
      fallBackText="No Expenses Registered in the Last 7 Days."
    />
  );
}

export default RecentExpenses;
