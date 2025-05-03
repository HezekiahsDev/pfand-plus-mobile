import { Slot, usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = [
  { label: "Deposits", route: "/" },
  { label: "Withdrawals", route: "/withdrawals" },
  { label: "Rewards", route: "/rewards" },
];

export default function TransactionLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: "#fefbf9",
      }}
    >
      {/* Top Tabs */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 12,
          backgroundColor: "transparent",
        }}
      >
        {TABS.map((tab) => {
          const isActive = pathname === tab.route;
          return (
            <TouchableOpacity
              key={tab.route}
              onPress={() => router.push(tab.route as any)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 12,
                paddingVertical: 10,
                minWidth: 48,
                minHeight: 48,
                borderBottomWidth: isActive ? 3 : 0,
                borderBottomColor: isActive ? "#00494f" : "transparent", // High-contrast underline
              }}
            >
              <Text
                style={{
                  color: isActive ? "#00494f" : "#333", // Better contrast
                  fontWeight: isActive ? "bold" : "normal",
                  fontSize: 16,
                  fontFamily: "Lato-medium",
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Render child screen */}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </View>
  );
}
