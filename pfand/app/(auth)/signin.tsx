import Button from "@/components/ui/Button";
import TextField from "@/components/ui/Form";
import { useSession } from "@/context";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useSession();

  const handleSignIn = async () => {
    setError("");
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.header}>Sign In</Text>

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

          <TouchableOpacity
            onPress={() => router.push("/forgot-password")}
            accessibilityRole="link"
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

          <TouchableOpacity
            onPress={() => router.push("/signup")}
            accessibilityRole="link"
          >
            <Text style={styles.createAccount}>Create Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    textAlign: "left",
    marginBottom: verticalScale(24),
    textDecorationLine: "underline",
  },
  createAccount: {
    color: "#f4f4f4",
    fontSize: scale(14),
    textAlign: "center",
    marginTop: verticalScale(24),
    textDecorationLine: "underline",
  },
});
