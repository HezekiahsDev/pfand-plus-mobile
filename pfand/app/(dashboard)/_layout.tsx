import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useRef } from "react";
import { Animated, Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
        backgroundColor: "#fefbf9",
        paddingTop: insets.top,
      }}
    >
      <Tabs
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: (props) => <CustomTabButton {...props} />,
          tabBarStyle: [
            styles.tabBarStyle,
            {
              paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
              height:
                Platform.OS === "ios" ? 50 + insets.bottom : 50 + insets.bottom,
            },
          ],
          tabBarIcon: ({ focused, color, size }) => {
            const isHome = route.name === "index";

            if (isHome) {
              return (
                <View
                  style={[
                    styles.homeIconWrapper,
                    focused && styles.homeIconFocused,
                  ]}
                >
                  <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={24}
                    color="white"
                  />
                </View>
              );
            }

            switch (route.name) {
              case "overview":
                return (
                  <Ionicons
                    name={focused ? "grid" : "grid-outline"}
                    size={size}
                    color={color}
                  />
                );
              case "wallet":
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
        <Tabs.Screen name="overview" />
        <Tabs.Screen name="wallet" />
        <Tabs.Screen name="index" />
        <Tabs.Screen name="notifications" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  homeIconWrapper: {
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
  homeIconFocused: {
    backgroundColor: "#00494f",
  },
});
