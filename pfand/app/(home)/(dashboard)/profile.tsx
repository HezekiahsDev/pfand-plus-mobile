import Button from "@/components/ui/Button";
import { useSession } from "@/context";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user, signOut, isLoading } = useSession();

  // Display a loading indicator while the session is being checked
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00494f" />
      </View>
    );
  }

  // Handle the case where there is no user
  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>No user profile found.</Text>
      </View>
    );
  }

  // Get user initials for the avatar
  const getInitials = (email: string | null) => {
    if (!email) return "?";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(user.email)}</Text>
          </View>

          <Text style={styles.email}>{user.email}</Text>

          {user.displayName && (
            <Text style={styles.displayName}>{user.displayName}</Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              label="Sign Out"
              onPress={signOut}
              variant="outline"
              accessibilityLabel="Sign out of your account"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fefbf9",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefbf9",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#00494f",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarText: {
    color: "white",
    fontSize: 40,
    fontFamily: "Lato",
  },
  email: {
    fontSize: 22,
    fontFamily: "Lato",
    fontWeight: "600",
    color: "#00494f",
    marginBottom: 8,
  },
  displayName: {
    fontSize: 16,
    color: "#4a5568",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "80%",
  },
  text: {
    fontSize: 22,
    fontFamily: "Lato",
    color: "#00494f",
  },
});
