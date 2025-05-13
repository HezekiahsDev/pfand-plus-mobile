import HistoryItem from "@/components/ui/dashboard/transactions/History";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function RewardHistory() {
  const rewardIcon = (
    <MaterialIcons
      name="emoji-events"
      size={24}
      color="#2e8b57" // stylized green for Pfand rewards
      accessibilityLabel="Reward icon"
    />
  );

  const historyData = [
    {
      label: "Reward",
      description: "Bonus for 20 bottles returned",
      amount: 10,
    },
    {
      label: "Reward",
      description: "Loyalty milestone achieved",
      amount: 15,
    },
    {
      label: "Reward",
      description: "Referral program bonus",
      amount: 20,
    },
    {
      label: "Reward",
      description: "Extra credit for cleanup event",
      amount: 5,
    },
    {
      label: "Reward",
      description: "Weekly eco-challenge winner",
      amount: 30,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {historyData.map((item, index) => (
            <HistoryItem
              key={index}
              icon={rewardIcon}
              label={item.label}
              description={item.description}
              amount={item.amount}
              currency="Ᵽ"
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
