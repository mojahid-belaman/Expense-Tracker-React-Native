import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import ManageExpense from "./screens/ManageExpense";
import { screenOptions } from "./constants/styles";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screens = [
  {
    name: "RecentExpenses",
    component: RecentExpenses,
    options: {
      title: "Recent Expenses",
      tabBarLabel: "Recent",
      tabBarIcon: ({ color, size }: { color: string; size: number }) => (
        <Ionicons name="hourglass" color={color} size={size} />
      ),
    },
  },
  {
    name: "AllExpenses",
    component: AllExpenses,
    options: {
      title: "All Expenses",
      tabBarLabel: "All Expenses",
      tabBarIcon: ({ color, size }: { color: string; size: number }) => (
        <Ionicons name="calendar" color={color} size={size} />
      ),
    },
  },
  // Add more screens as needed
];

function ExpensesOverview() {
  return (
    <Tab.Navigator
      screenOptions={{
        ...screenOptions,
      }}
    >
      {screens.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpenseOverview"
            component={ExpensesOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
