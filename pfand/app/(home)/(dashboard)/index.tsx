import Button from "@/components/ui/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 24) / 2;
export default function HomeScreen() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchBalances = () => {
      setTimeout(() => {
        setWalletBalance(parseFloat((Math.random() * 100).toFixed(2)));
        setTokenBalance(parseFloat((Math.random() * 200).toFixed(2)));
        setLoading(false);
      }, 1000);
    };

    fetchBalances();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.welcomeText}>Welcome!</Text>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Balances</Text>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#FFFFFF"
              style={{ minHeight: 85, justifyContent: "center" }}
            />
          ) : (
            <View style={styles.balancesContainer}>
              <View style={styles.balance}>
                <Text style={styles.balanceAmount}>
                  €{walletBalance?.toFixed(2)}
                </Text>
                <Text style={styles.balanceLabel}>Wallet Balance</Text>
              </View>
              <View style={styles.balanceDivider} />
              <View style={styles.balance}>
                <Text style={styles.balanceAmount}>
                  {tokenBalance?.toFixed(0)} Ᵽ
                </Text>
                <Text style={styles.balanceLabel}>Token Balance</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.fullWidthCard}>
          <Button
            label="Scan Deposit Reciept"
            textBelow="Scan reciept from store"
            onPress={() => router.push("/(home)/(dashboard)/scan")}
            variant="secondary"
            icon={
              <MaterialCommunityIcons
                name="barcode-scan"
                size={50}
                color="white"
              />
            }
            iconPosition="top"
            height={94}
          />
        </View>

        <View style={styles.gridContainer}>
          <Button
            label="Transaction"
            textBelow="View transaction"
            onPress={() => router.push("/(home)/(dashboard)/transactions")}
            variant="primary"
            icon={
              <MaterialCommunityIcons name="history" size={50} color="green" />
            }
            iconPosition="top"
            height={180}
            width={cardWidth}
          />
          <Button
            label="Rewards"
            textBelow="Claim token rewards"
            onPress={() => console.log("Button 2 pressed")}
            variant="secondary"
            icon={
              <MaterialCommunityIcons
                name="gift-outline"
                size={50}
                color="gold"
              />
            }
            iconPosition="top"
            height={180}
            width={cardWidth}
          />
        </View>

        <View style={styles.gridContainer}>
          <Button
            label="Offer"
            textBelow="Promotional offers"
            onPress={() => console.log("Button 3 pressed")}
            variant="outline"
            icon={
              <MaterialCommunityIcons name="offer" size={50} color="green" />
            }
            iconPosition="top"
            height={180}
            width={cardWidth}
          />
          <Button
            label="Pfand+ Token"
            textBelow="Coming soon"
            onPress={() => router.push("/(home)/(dashboard)/transactions")}
            variant="secondary"
            disabled
            icon={
              <MaterialCommunityIcons
                name="hand-coin-outline"
                size={50}
                color="black"
              />
            }
            iconPosition="top"
            height={180}
            width={cardWidth}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: Platform.select({ ios: "Lato", android: "sans-serif-medium" }),
    marginBottom: 8,
    marginTop: 0,
    marginLeft: 8,
    color: "#000",
  },

  header: {
    backgroundColor: "#00494f",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 24,
    marginBottom: 8,
  },
  headerTitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 8,
  },
  balancesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  balance: {
    alignItems: "center",
    flex: 1,
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

  fullWidthCard: {
    marginTop: 8,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
});
