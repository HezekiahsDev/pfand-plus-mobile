import "@/global.css";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";

const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(Platform.OS === "web");

  useEffect(() => {
    if (Platform.OS !== "web") {
      const loadFonts = async () => {
        await Font.loadAsync({
          Lato: require("@/fonts/Lato-Regular.ttf"),
          "Lato-Bold": require("@/fonts/Lato-Bold.ttf"),
        });
        setFontsLoaded(true);
      };

      loadFonts();
    }
  }, []);

  return fontsLoaded;
};

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: Platform.OS === "web" ? "Lato" : "Lato" }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="#00494f" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            paddingTop: 0,
            backgroundColor: "#00494f",
          },
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(dashboard)" />
      </Stack>
    </>
  );
}
