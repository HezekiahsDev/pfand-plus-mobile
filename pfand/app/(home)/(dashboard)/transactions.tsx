import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type Transaction = {
  id: string;
  type: "deposit" | "spend" | "reward" | "convert";
  title: string;
  description: string;
  amount: number;
  currency: "€" | "P";
  date: string;
};

type FilterType = "all" | "deposits" | "spending" | "rewards";

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    title: "Initial Deposit",
    description: "500 plastic bottles",
    amount: 125,
    currency: "€",
    date: "2024-06-28",
  },
  {
    id: "2",
    type: "reward",
    title: "Loyalty Bonus",
    description: "End-of-month reward",
    amount: 1500,
    currency: "P",
    date: "2024-06-28",
  },
  {
    id: "3",
    type: "spend",
    title: "Local Cafe",
    description: "Coffee and pastry",
    amount: -5.75,
    currency: "€",
    date: "2024-06-27",
  },
  {
    id: "4",
    type: "deposit",
    title: "Weekly Deposit",
    description: "60 glass bottles",
    amount: 15, // 60 * 0.25
    currency: "€",
    date: "2024-06-26",
  },
  {
    id: "5",
    type: "convert",
    title: "Token Conversion",
    description: "P Tokens to Euro",
    amount: -250,
    currency: "P",
    date: "2024-06-25",
  },
  {
    id: "6",
    type: "spend",
    title: "Grocery Store",
    description: "Weekly groceries",
    amount: -25.2,
    currency: "€",
    date: "2024-06-24",
  },
  {
    id: "7",
    type: "reward",
    title: "Welcome Bonus",
    description: "Initial app sign-up",
    amount: 800,
    currency: "P",
    date: "2024-06-23",
  },
  {
    id: "8",
    type: "deposit",
    title: "Weekend Collection",
    description: "80 plastic bottles",
    amount: 20,
    currency: "€",
    date: "2024-06-22",
  },
];

const ICONS: Record<Transaction["type"], React.ReactNode> = {
  deposit: <MaterialCommunityIcons name="recycle" size={24} color="#10B981" />,
  spend: <Feather name="shopping-cart" size={22} color="#EF4444" />,
  reward: <Feather name="star" size={22} color="#F59E0B" />,
  convert: <Feather name="repeat" size={22} color="#3B82F6" />,
};

const TransactionItem: React.FC<{ item: Transaction }> = ({ item }) => {
  const isCredit = item.amount > 0;
  const amountColor = isCredit ? "#10B981" : "#EF4444";
  const amountSign = isCredit ? "+" : "";

  const formattedAmount = item.amount.toFixed(2).replace(".", ",");

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemIconContainer}>{ICONS[item.type]}</View>
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <View style={styles.itemAmountContainer}>
        <Text style={[styles.itemAmount, { color: amountColor }]}>
          {`${amountSign}${formattedAmount} ${item.currency}`}
        </Text>
        <Text style={styles.itemDate}>
          {new Date(item.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
        </Text>
      </View>
    </View>
  );
};

export default function TransactionsScreen() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredTransactions = useMemo(() => {
    if (activeFilter === "all") return transactions;
    if (activeFilter === "deposits")
      return transactions.filter((t) => t.type === "deposit");
    if (activeFilter === "spending")
      return transactions.filter((t) => t.type === "spend");
    if (activeFilter === "rewards")
      return transactions.filter(
        (t) => t.type === "reward" || t.type === "convert"
      );
    return [];
  }, [transactions, activeFilter]);

  const euroBalance = useMemo(
    () =>
      transactions
        .filter((t) => t.currency === "€")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const pTokenBalance = useMemo(
    () =>
      transactions
        .filter((t) => t.currency === "P")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const FilterButton = ({
    filterType,
    label,
  }: {
    filterType: FilterType;
    label: string;
  }) => (
    <TouchableOpacity
      onPress={() => setActiveFilter(filterType)}
      style={[
        styles.filterButton,
        activeFilter === filterType && styles.activeFilterButton,
      ]}
    >
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === filterType && styles.activeFilterButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Balances Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Balances</Text>
          <View style={styles.balancesContainer}>
            <View style={styles.balance}>
              <Text style={styles.balanceAmount}>
                €{Math.max(0, euroBalance).toFixed(2).replace(".", ",")}
              </Text>
              <Text style={styles.balanceLabel}>Euros</Text>
            </View>
            <View style={styles.balanceDivider} />
            <View style={styles.balance}>
              <Text style={styles.balanceAmount}>
                {Math.max(0, pTokenBalance).toFixed(0)} Ᵽ
              </Text>
              <Text style={styles.balanceLabel}>Ᵽ Tokens</Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.historyTitle}>History</Text>
          <View style={styles.filtersContainer}>
            <FilterButton filterType="all" label="All" />
            <FilterButton filterType="deposits" label="Deposits" />
            <FilterButton filterType="spending" label="Spending" />
            <FilterButton filterType="rewards" label="P-Tokens" />
          </View>
        </View>

        {/* Transaction List */}
        <FlatList
          data={filteredTransactions}
          renderItem={({ item }) => <TransactionItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>
                No transactions for this filter.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

// --- StyleSheet for all components ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#00494f",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 16,
  },
  balancesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  balance: {
    alignItems: "center",
  },
  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  balanceLabel: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    marginTop: 4,
  },
  balanceDivider: {
    height: "70%",
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  filtersSection: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  filtersContainer: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
  },
  activeFilterButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  activeFilterButtonText: {
    color: "#00494f",
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
    shadowColor: "#4B5563",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  itemIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  itemDetailsContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  itemDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  itemAmountContainer: {
    alignItems: "flex-end",
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },
  emptyListContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyListText: {
    fontSize: 16,
    color: "#6B7280",
  },
});
