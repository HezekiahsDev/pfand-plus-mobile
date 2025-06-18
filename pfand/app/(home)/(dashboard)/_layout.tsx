import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// This CustomTabButton component is great, no changes needed here.
function CustomTabButton(props: any) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} {...props}>
      <Animated.View style={{ transform: [{ scale }] }}>
        {props.children}
      </Animated.View>
    </Pressable>
  );
}

export default function DashboardLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: insets.top,
      }}
    >
      <StatusBar
        barStyle={Platform.OS === "android" ? "light-content" : "light-content"}
        backgroundColor="#003a3f"
      />

      <Tabs
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: (props) => <CustomTabButton {...props} />,
          tabBarStyle: [
            styles.tabBarStyle,
            {
              paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
              height: 50 + insets.bottom,
            },
          ],
          // This is now the single source of truth for all icons
          tabBarIcon: ({ focused, color, size }) => {
            // Handle the special scan button first
            if (route.name === "scan") {
              return (
                <View
                  style={[
                    styles.scanIconWrapper,
                    focused && styles.scanIconFocused,
                  ]}
                >
                  {/* FIX: Changed the icon to "scan" */}
                  <Ionicons name="scan" size={24} color="white" />
                </View>
              );
            }

            // Handle all other regular tab icons
            switch (route.name) {
              case "index": // FIX: Added case for the main "index" route
                return (
                  <Ionicons
                    name={focused ? "grid" : "grid-outline"}
                    size={size}
                    color={color}
                  />
                );
              case "transactions":
                return <Feather name="credit-card" size={size} color={color} />;
              case "notifications":
                return (
                  <MaterialIcons
                    name={focused ? "notifications" : "notifications-none"}
                    size={size}
                    color={color}
                  />
                );
              case "profile":
                return <AntDesign name="user" size={size} color={color} />;
              default:
                return null;
            }
          },
          tabBarActiveTintColor: "#00494f",
          tabBarInactiveTintColor: "#999",
        })}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="transactions" />
        <Tabs.Screen name="scan" />
        <Tabs.Screen name="notifications" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#E5E5E5",
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 }, // Changed height to -10 for a top shadow effect
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scanIconWrapper: {
    backgroundColor: "#ccc",
    height: 48,
    width: 48,
    borderRadius: 24,
    transform: [{ translateY: -15 }],
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  scanIconFocused: {
    backgroundColor: "#00494f",
  },
});
