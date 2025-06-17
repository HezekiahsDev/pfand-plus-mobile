import { SessionProvider } from "@/context";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Import your global CSS file
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Example of loading fonts. Even if you don't have custom fonts now,
  // this is the correct pattern for handling any async loading.
  const [fontsLoaded, fontError] = useFonts({
    Lato: require("../fonts/Lato-Regular.ttf"),
    // Add any other fonts you use here
  });

  // useEffect will run when fontsLoaded or fontError value changes.
  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Your original layout structure
  return (
    <SessionProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Slot />
      </GestureHandlerRootView>
    </SessionProvider>
  );
}
