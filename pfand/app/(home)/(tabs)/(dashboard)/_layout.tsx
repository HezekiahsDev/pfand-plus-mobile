import { Stack } from "expo-router";
import { View } from "react-native";

export default function DashboardLayout() {
  return (
    <View
      style={{
        flex: 1,
        // paddingTop: insets.top,
        backgroundColor: "00494f",
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: {
            backgroundColor: "#00494f",
          },
        }}
      />
      <Stack.Screen name="index" />
      <Stack.Screen name="(transaction)" />
    </View>
  );
}
