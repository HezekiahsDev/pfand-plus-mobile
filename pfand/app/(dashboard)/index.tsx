import Button from "@/components/ui/Button";
import BalanceCard from "@/components/ui/dashboard/BalanceCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 24) / 2; // 8 padding + 8 padding + 8 gap

export default function HomeScreen() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    const fetchBalances = () => {
      setTimeout(() => {
        setWalletBalance(parseFloat((Math.random() * 100).toFixed(2)));
        setTokenBalance(parseFloat((Math.random() * 200).toFixed(2)));
      }, 1000);
    };

    fetchBalances();
  }, []);

  const handleWithdraw = () => {
    console.log("Withdraw clicked");
  };

  const handleContinue = () => {
    console.log("Continue button pressed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          <Text style={styles.welcomeText}>Welcome!</Text>

          <View style={styles.rowContainer}>
            <View style={styles.cardWrapper}>
              <BalanceCard
                title="Wallet Balance"
                balance={walletBalance}
                currency="€"
                actionButton={{
                  label: "Withdraw",
                  onPress: handleWithdraw,
                  accessibilityHint: "Withdraw from your wallet balance",
                  disabled: true,
                }}
              />
            </View>

            <View style={[styles.cardWrapper, styles.rightCard]}>
              <BalanceCard
                title="Token Balance"
                balance={tokenBalance}
                currency="₮"
                actionButton={{
                  label: "Convert",
                  onPress: () => console.log("Convert clicked"),
                  accessibilityHint: "Convert your tokens to wallet balance",
                  variant: "secondary",
                  disabled: true,
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.fullWidthCard}>
          <Button
            label="Scan Deposit Reciept"
            textBelow="Scan reciept from store"
            onPress={handleContinue}
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
            onPress={() => router.push("/(transactions)")}
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
            onPress={() => router.push("/(transactions)")}
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
    backgroundColor: "#fefbf9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 8,
  },
  cardContainer: {
    backgroundColor: "transparent",
    borderRadius: 0,
    padding: 0,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: Platform.select({ ios: "Lato", android: "sans-serif-medium" }),
    marginBottom: 4,
    marginTop: 0,
    marginLeft: 0,
    color: "#000",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  cardWrapper: {
    flex: 1,
  },
  rightCard: {
    marginLeft: 8,
  },
  fullWidthCard: {
    marginTop: 12,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
});
