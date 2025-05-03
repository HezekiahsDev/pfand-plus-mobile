import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../../components/ui/Button";

const { width, height } = Dimensions.get("window");

const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;

const WelcomeScreen = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.header}>
            Welcome to Pfand
            <Text style={styles.superscript}>+</Text>
          </Text>
          <Text style={styles.subHeader}>
            The sustainable way to redeem bottle deposits and earn rewards
          </Text>
          <Text style={styles.getStarted}>Get Started</Text>
          <View style={styles.buttonGroup}>
            <Button label="Sign In" onPress={handleSignIn} variant="primary" />
            <Button
              label="Sign Up"
              onPress={handleSignUp}
              variant="secondary"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00494f",
    justifyContent: "center",
    paddingHorizontal: scale(24),
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(24),
  },
  content: {
    alignItems: "center",
    gap: verticalScale(24),
    maxWidth: scale(400),
    alignSelf: "center",
  },
  header: {
    fontSize: scale(32),
    fontWeight: "bold",
    color: "#fefbf9",
    textAlign: "center",
  },
  superscript: {
    fontSize: scale(32),
    color: "#3A7E1C",
    lineHeight: scale(32),
  },
  subHeader: {
    fontSize: scale(16),
    color: "#fefbf9",
    textAlign: "center",
    width: width * 0.8,
    paddingHorizontal: scale(10),
  },
  getStarted: {
    fontSize: scale(28),
    fontWeight: "600",
    color: "#fefbf9",
  },
  buttonGroup: {
    width: width * 0.8,
    alignSelf: "center",
    gap: verticalScale(16),
  },
});

export default WelcomeScreen;
