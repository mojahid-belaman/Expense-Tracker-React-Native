import { useContext } from "react";
import Expenses from "../components/Expenses/Expenses";
import { ExpenseCtx } from "../store/context/expenseContext";

function AllExpenses() {
  const { expenses } = useContext(ExpenseCtx);
  return (
    <Expenses
      expenses={expenses}
      period="Total"
      fallBackText="No Registered Expenses Found!"
    />
  );
}

export default AllExpenses;
