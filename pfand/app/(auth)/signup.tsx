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

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useSession();

  const handleSignUp = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const resp = await signUp(email, password);
      if (resp) {
        router.replace("/(home)/(dashboard)");
      } else {
        setError("Sign up failed. Please check your details.");
      }
    } catch (err) {
      console.log("[handleSignUp] ==>", err);
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
          <Text style={styles.header}>Sign Up</Text>

          <TextField
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextField
            label="Password"
            placeholder="Create a password"
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

          {error ? (
            <Text style={styles.errorText} accessibilityLiveRegion="assertive">
              {error}
            </Text>
          ) : null}

          <Button
            label="Sign Up"
            onPress={handleSignUp}
            variant="secondary"
            accessibilityLabel="Sign up for an account"
            accessibilityRole="button"
          />

          <TouchableOpacity
            onPress={() => router.push("/signin")}
            accessibilityRole="link"
          >
            <Text style={styles.signIn}>Already have an account? Sign In</Text>
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
    textAlign: "center",
    marginTop: verticalScale(24),
    textDecorationLine: "underline",
  },
  signIn: {
    color: "#f4f4f4",
    fontSize: scale(14),
    textAlign: "center",
    marginTop: verticalScale(24),
    textDecorationLine: "underline",
  },
});
