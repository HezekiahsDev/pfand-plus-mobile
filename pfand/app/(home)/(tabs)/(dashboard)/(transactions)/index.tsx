import HistoryItem from "@/components/ui/dashboard/transactions/History";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function DepositHistory() {
  const bottleIcon = (
    <MaterialIcons
      name="recycling"
      size={24}
      color="#00494f"
      accessibilityLabel="Bottle deposit icon"
    />
  );

  const historyData = [
    {
      label: "Bottle Deposit",
      description: "5 plastic bottles returned",
      amount: 1.5,
    },
    {
      label: "Bottle Deposit",
      description: "3 glass bottles returned",
      amount: 0.9,
    },
    {
      label: "Bottle Deposit",
      description: "10 plastic bottles returned",
      amount: 3.0,
    },
    {
      label: "Bottle Deposit",
      description: "7 mixed bottles returned",
      amount: 2.1,
    },
    {
      label: "Bottle Deposit",
      description: "8 plastic bottles returned",
      amount: 2.4,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {historyData.map((item, index) => (
            <HistoryItem
              key={index}
              icon={bottleIcon}
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
    marginBottom: 12,
  },
});
