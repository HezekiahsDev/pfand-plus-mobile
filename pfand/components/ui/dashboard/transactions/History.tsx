import React from "react";
import {
  AccessibilityRole,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface HistoryItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  currency: string;
  amount: number;
  accessibilityRole?: AccessibilityRole;
  style?: ViewStyle;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  icon,
  label,
  description,
  amount,
  currency,
  accessibilityRole = "button",
  style,
}) => {
  return (
    <View
      style={[styles.container, style]}
      accessible
      accessibilityRole={accessibilityRole}
      accessibilityLabel={`${label}, ${description}, amount: ${amount}`}
    >
      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.currency}>{currency}</Text>
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
};

export default HistoryItem;

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f1f2",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  description: {
    fontSize: 14,
    color: "#4f4f4f",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginLeft: 0,
  },
  currency: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginLeft: 0,
  },
});
