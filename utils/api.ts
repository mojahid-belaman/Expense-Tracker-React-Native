import { expenseType } from "../store/context/expenseContext";

const API = "https://expense-tracker-8e4e8-default-rtdb.firebaseio.com";

export async function postExpense(expenseData: Omit<expenseType, "id">) {
  const response = await fetch(`${API}/expense.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  });

  const data = await response.json();

  return data["name"];
}

export async function getExpenses() {
  const response = await fetch(`${API}/expense.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  const expenses: expenseType[] = [];

  for (const key in data) {
    const expenseData = {
      id: key,
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description,
    };
    expenses.push(expenseData);
  }

  return expenses;
}

export function trashExpense(id: string) {
  return fetch(`${API}/expense/${id}.json`, {
    method: "DELETE",
  });
}

export function editExpense(expense: expenseType) {
  return fetch(`${API}/expense/${expense.id}.json`, {
    method: "PUT",
    body: JSON.stringify(expense),
  });
}
