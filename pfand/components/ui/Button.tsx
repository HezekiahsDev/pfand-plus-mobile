import React from "react";
import {
  AccessibilityRole,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "top" | "bottom";
  height?: number;
  width?: number;
  textBelow?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
  icon,
  iconPosition = "left",
  height = 48,
  width,
  textBelow,
}) => {
  let buttonStyle = { ...styles.button, height, width };
  let textStyle = styles.text;

  if (variant === "primary")
    buttonStyle = { ...buttonStyle, ...styles.primary };
  else if (variant === "secondary")
    buttonStyle = { ...buttonStyle, ...styles.secondary };
  else if (variant === "outline")
    buttonStyle = { ...buttonStyle, ...styles.outline };

  if (disabled) {
    buttonStyle = { ...buttonStyle, ...styles.disabled };
    textStyle = { ...textStyle, ...styles.disabledText };
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={buttonStyle}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <View
        style={[
          styles.content,
          icon && (iconPosition === "top" || iconPosition === "bottom")
            ? styles.verticalContent
            : styles.horizontalContent,
        ]}
      >
        {icon && iconPosition === "top" && (
          <View style={styles.icon}>{icon}</View>
        )}
        <View style={styles.textContainer}>
          <Text style={textStyle} allowFontScaling maxFontSizeMultiplier={2}>
            {label}
          </Text>
          {textBelow && (
            <Text
              style={styles.textBelow}
              allowFontScaling
              maxFontSizeMultiplier={2}
            >
              {textBelow}
            </Text>
          )}
        </View>
        {icon && iconPosition === "bottom" && (
          <View style={styles.icon}>{icon}</View>
        )}
        {icon && iconPosition === "left" && (
          <View style={[styles.icon, styles.leftIcon]}>{icon}</View>
        )}
        {icon && iconPosition === "right" && (
          <View style={[styles.icon, styles.rightIcon]}>{icon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  verticalContent: {
    flexDirection: "column", // Stack vertically if the icon is at top or bottom
  },
  horizontalContent: {
    flexDirection: "row", // Keep horizontally for left or right icons
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "-medium",
  },
  textBelow: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 12,
    color: "#4a5568",
  },
  icon: {
    marginHorizontal: 4,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8, // Add space between the icon and text on the right
  },
  primary: {
    backgroundColor: "#42f575",
  },
  secondary: {
    backgroundColor: "#f69c42",
  },
  outline: {
    borderWidth: 2,
    borderColor: "#2f855a",
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: "#cbd5e0",
  },
  disabledText: {
    color: "#4a5568",
  },
});

export default Button;
