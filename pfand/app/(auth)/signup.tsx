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

const SignUpScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    setError("");
    // Handle Sign Up logic (e.g., API request, navigation)
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Sign Up</Text>

        <TextField
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          accessible
          accessibilityLabel="Full Name"
          accessibilityHint="Please enter your full name"
        />

        <TextField
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          accessible
          accessibilityLabel="Email"
          accessibilityHint="Please enter your email address"
        />

        <TextField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          accessible
          accessibilityLabel="Password"
          accessibilityHint="Please enter your password"
        />

        <TextField
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          accessible
          accessibilityLabel="Confirm Password"
          accessibilityHint="Please confirm your password"
        />

        {error && (
          <Text style={styles.errorText} accessibilityLiveRegion="assertive">
            {error}
          </Text>
        )}

        <Button
          label="Sign Up"
          onPress={handleSignUp}
          variant="secondary"
          accessibilityLabel="Sign up to create a new account"
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
    fontSize: scale(14),
    textAlign: "center",
    marginTop: verticalScale(10),
  },
  input: {
    padding: 14,
    borderRadius: 8,
    borderColor: "#fefbf9",
    borderWidth: 1,
    fontSize: 16,
    color: "#000",
  },
  focusedInput: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 8,
    borderColor: "#2f855a",
    borderWidth: 2,
    fontSize: 16,
    color: "#000",
  },
});

export default SignUpScreen;
