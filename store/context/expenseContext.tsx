import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of  shoes",
    amount: 90.55,
    date: new Date("2024-4-10"),
  },
  {
    id: "e2",
    description: "A pair of  glasses",
    amount: 30.55,
    date: new Date("2023-02-10"),
  },
  {
    id: "e3",
    description: "A book",
    amount: 30.55,
    date: new Date("2024-04-20"),
  },
  {
    id: "e4",
    description: "A Computer",
    amount: 30.55,
    date: new Date("2024-04-1"),
  },
];

export type expenseType = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

interface IExpenseCtx {
  expenses: expenseType[];
  addExpense: (expense: Omit<expenseType, "id">) => void;
  updateExpense: (expense: expenseType) => void;
  deleteExpense: (id: string) => void;
}

export const ExpenseCtx = createContext<IExpenseCtx>({
  expenses: [],
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
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
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
    default:
      return state;
  }
}

function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expense: Omit<expenseType, "id">) {
    dispatch({ type: "ADD", payload: expense });
  }

  function updateExpense(expnse: expenseType) {
    dispatch({ type: "UPDATE", payload: expnse });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: { id } });
  }

  const value = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
  return <ExpenseCtx.Provider value={value}>{children}</ExpenseCtx.Provider>;
}

export default ExpenseProvider;
