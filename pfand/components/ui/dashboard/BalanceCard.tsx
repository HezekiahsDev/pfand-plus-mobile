import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Button";

interface ButtonConfig {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  variant?: "primary" | "secondary" | "outline";
}

interface BalanceProps {
  title?: string;
  balance: number;
  currency?: string;
  actionButton?: ButtonConfig;
}

const BalanceCard: React.FC<BalanceProps> = ({
  title = "Current Balance",
  balance,
  currency = "€",
  actionButton,
}) => {
  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityRole="summary"
      accessibilityLabel={`${title}, ${currency}${balance.toFixed(2)}`}
      testID="balance-card"
    >
      <Text style={styles.label} accessibilityRole="text">
        {title}
      </Text>
      <Text
        style={styles.amount}
        accessibilityLabel={`Balance amount: ${currency}${balance.toFixed(2)}`}
        accessibilityRole="text"
      >
        {currency}
        {balance.toFixed(2)}
      </Text>

      {actionButton && (
        <View style={styles.buttonContainer}>
          <Button
            label={actionButton.label}
            onPress={actionButton.onPress}
            disabled={actionButton.disabled}
            variant={actionButton.variant}
            accessibilityLabel={
              actionButton.accessibilityLabel || `${actionButton.label} button`
            }
            accessibilityHint={actionButton.accessibilityHint}
            accessibilityRole="button"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#00494f",
    padding: 14,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    width: "100%",
    alignSelf: "center",
  },
  label: {
    color: "#cbd5e1",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  amount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
});

export default BalanceCard;
