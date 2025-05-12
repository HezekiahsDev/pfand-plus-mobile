import Button from "@/components/ui/Button"; // Make sure this exists
import TextField from "@/components/ui/Form"; // Make sure this exists
import { useSession } from "@/context";
import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters"; // Assuming you're using this lib

/**
 * SignInScreen component handles user authentication through email and password
 * @returns {JSX.Element} Sign-in form component
 */
export default function SignInScreen() {
  // ============================================================================
  // Hooks & State
  // ============================================================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useSession();

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Handles the sign-in process
   */
  const handleSignIn = async () => {
    setError(""); // Clear previous error
    try {
      const resp = await signIn(email, password);
      if (resp) {
        router.replace("/(home)/(dashboard)");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.log("[handleSignIn] ==>", err);
      setError("Something went wrong. Please try again.");
    }
  };

  // ============================================================================
  // Render
  // ============================================================================

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

        {error ? (
          <Text style={styles.errorText} accessibilityLiveRegion="assertive">
            {error}
          </Text>
        ) : null}

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
}

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
    marginBottom: verticalScale(24),
    textDecorationLine: "underline",
  },
});
