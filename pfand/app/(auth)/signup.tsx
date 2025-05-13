import Button from "@/components/ui/Button";
import TextField from "@/components/ui/Form";
import { useSession } from "@/context";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

/**
 * SignUpScreen component handles new user registration
 * @returns {JSX.Element} Sign-up form component
 */
export default function SignUpScreen() {
  // ============================================================================
  // Hooks & State
  // ============================================================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useSession();

  // ============================================================================
  // Handlers
  // ============================================================================
  const handleRegister = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return null;
    }

    try {
      setLoading(true);
      const user = await signUp(email, password, fullName);
      return user;
    } catch (err) {
      console.log("[handleRegister] ==>", err);
      setError("Registration failed. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    const user = await handleRegister();
    if (user) {
      router.replace("/(home)/(tabs)/(dashboard)");
    }
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Sign Up</Text>

        <TextField
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextField
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextField
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {error && (
          <Text style={styles.errorText} accessibilityLiveRegion="assertive">
            {error}
          </Text>
        )}

        <Button
          label={loading ? "Signing up..." : "Sign Up"}
          onPress={handleSignUp}
          variant="secondary"
          accessibilityLabel="Sign up to create a new account"
          accessibilityRole="button"
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================================
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
});
