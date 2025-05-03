import Button from "@/components/ui/Button";
import TextField from "@/components/ui/Form";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

const { width, height } = Dimensions.get("window");

const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = () => {
    if (!email) {
      setMessage("Email is required");
      return;
    }

    // Simulate API call
    setMessage("If your account exists, a reset link has been sent.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Forgot Password</Text>

        <TextField
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          accessible
          accessibilityLabel="Email input"
          accessibilityHint="Enter the email associated with your account"
        />

        {message && (
          <Text style={styles.errorText} accessibilityLiveRegion="polite">
            {message}
          </Text>
        )}

        <Button
          label="Send Reset Link"
          onPress={handleReset}
          variant="primary"
          accessibilityLabel="Send password reset instructions"
          accessibilityRole="button"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00494f",
    paddingHorizontal: scale(24),
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(24),
  },
  header: {
    fontSize: scale(28),
    fontWeight: "bold",
    color: "#fefbf9",
    textAlign: "center",
    marginBottom: verticalScale(20),
  },
  errorText: {
    color: "#ff4c4c",
    marginBottom: verticalScale(2),
    fontSize: scale(14),
    textAlign: "center",
    marginTop: verticalScale(10),
  },
});

export default ForgotPasswordScreen;
