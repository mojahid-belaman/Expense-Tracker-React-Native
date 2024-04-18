import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};
export type RecentExpensesTabProps = BottomTabScreenProps<
  BottomTabParamList,
  "RecentExpenses"
>;
export type AllExpensesTabProps = BottomTabScreenProps<
  BottomTabParamList,
  "AllExpenses"
>;

export type RootStackParamList = {
  ManageExpense: {
    expenseId?: string;
  };
  ExpenseOverview: undefined;
};

export type PropsManageExpense = NativeStackScreenProps<RootStackParamList, "ManageExpense">;
