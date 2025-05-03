import Button from "@/components/ui/Button";
import TextField from "@/components/ui/Form";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    // if (!email || !password) {
    //   setError("Email and password are required");
    //   return;
    // }
    // setError("");
    router.replace("/(dashboard)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Sign In</Text>

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
        <TouchableOpacity
          onPress={() => router.push("/forgot-password")}
          accessibilityRole="link"
          accessibilityLabel="Forgot Password?"
          accessibilityHint="Navigates to password reset screen"
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {error && (
          <Text style={styles.errorText} accessibilityLiveRegion="assertive">
            {error}
          </Text>
        )}

        <Button
          label="Sign In"
          onPress={handleSignIn}
          variant="primary"
          accessibilityLabel="Sign in to your account"
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
    marginBottom: verticalScale(2),
    marginTop: verticalScale(10),
  },

  forgotText: {
    color: "#00bcd4",
    fontSize: scale(14),
    textAlign: "right",

    marginTop: verticalScale(0),
    marginBottom: verticalScale(24),
    textDecorationLine: "underline",
  },
});

export default SignInScreen;
