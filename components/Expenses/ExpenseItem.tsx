import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/styles";
import { getFormatterDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";
import { expenseType } from "../../store/context/expenseContext";

function ExpenseItem({ id, description, date, amount }: expenseType) {
  const navigation = useNavigation<any>();

  function handlePress() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }

  return (
    <View style={styles.root}>
      <Pressable
        style={styles.container}
        android_ripple={{ color: colors.primary400 }}
        onPress={handlePress}
      >
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormatterDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  root: {
    marginVertical: 8,
    backgroundColor: colors.primary500,
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  container: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  textBase: {
    color: colors.primary50,
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 6,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary500,
  },
});
