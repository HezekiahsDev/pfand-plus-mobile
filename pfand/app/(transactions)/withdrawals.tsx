import HistoryItem from "@/components/ui/dashboard/transactions/History";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function WithdrawalHistory() {
  const withdrawIcon = (
    <MaterialIcons
      name="account-balance-wallet"
      size={24}
      color="#8B0000" // deep red tone to reflect outflow
      accessibilityLabel="Wallet withdrawal icon"
    />
  );

  const historyData = [
    {
      label: "Withdrawal",
      description: "Funds transferred to bank",
      amount: 2.5,
    },
    {
      label: "Withdrawal",
      description: "Pfand balance withdrawn",
      amount: 1.8,
    },
    {
      label: "Withdrawal",
      description: "Transfer to savings account",
      amount: 3.2,
    },
    {
      label: "Withdrawal",
      description: "Balance sent to PayPal",
      amount: 0.9,
    },
    {
      label: "Withdrawal",
      description: "Funds used for purchases",
      amount: 4.0,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {historyData.map((item, index) => (
            <HistoryItem
              key={index}
              icon={withdrawIcon}
              label={item.label}
              description={item.description}
              amount={item.amount}
              currency="€"
              style={styles.itemSpacing}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fefbf9",
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  container: {
    flex: 1,
  },
  itemSpacing: {
    marginBottom: 8,
  },
});
