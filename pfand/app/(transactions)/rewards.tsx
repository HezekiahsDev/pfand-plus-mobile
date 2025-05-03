import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function RewardsHistory() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.text}>Reward history Screen</Text>
          {/* Add more content here if needed */}
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
    alignItems: "center",
    padding: 16,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 22,
    fontFamily: "Lato",
    color: "#00494f",
  },
});
