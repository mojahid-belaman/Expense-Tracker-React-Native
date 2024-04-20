import { createContext, useReducer } from "react";

export type expenseType = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

interface IExpenseCtx {
  expenses: expenseType[];
  setExpenses: (expenses: expenseType[]) => void;
  addExpense: (expense: Omit<expenseType, "id">) => void;
  updateExpense: (expense: expenseType) => void;
  deleteExpense: (id: string) => void;
}

export const ExpenseCtx = createContext<IExpenseCtx>({
  expenses: [],
  setExpenses: (expenses: expenseType[]) => {},
  addExpense: (expnse: Omit<expenseType, "id">) => {},
  updateExpense: (expnse: expenseType) => {},
  deleteExpense: (id: string) => {},
});

function expenseReducer(
  state: expenseType[],
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const findIndexExpense = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[findIndexExpense];
      const updatedItem = { ...updatableExpense, ...action.payload };
      const updatedExpenses = [...state];
      updatedExpenses[findIndexExpense] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload.id);
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    default:
      return state;
  }
}

function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, dispatch] = useReducer(expenseReducer, []);

  function addExpense(expense: Omit<expenseType, "id">) {
    dispatch({ type: "ADD", payload: expense });
  }

  function updateExpense(expnse: expenseType) {
    dispatch({ type: "UPDATE", payload: expnse });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: { id } });
  }

  function setExpenses(expenses: expenseType[]) {
    dispatch({ type: "SET", payload: expenses });
  }

  const value = {
    expenses,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
  return <ExpenseCtx.Provider value={value}>{children}</ExpenseCtx.Provider>;
}

export default ExpenseProvider;
