import { Feather } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type Notification = {
  id: string;
  type: "deposit_success" | "reward_unlocked" | "spend_alert" | "general_info";
  title: string;
  message: string;
  date: string;
  isRead: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "deposit_success",
    title: "Deposit Successful",
    message: "Your deposit of €125,00 has been added to your wallet.",
    date: "2024-06-28T10:30:00Z",
    isRead: false,
  },
  {
    id: "2",
    type: "reward_unlocked",
    title: "New Reward Unlocked!",
    message: "You've earned 1500 Ᵽ for your loyalty this month. Keep it up!",
    date: "2024-06-28T09:00:00Z",
    isRead: false,
  },
  {
    id: "3",
    type: "spend_alert",
    title: "You spent €5,75",
    message: "A purchase was made at Local Cafe.",
    date: "2024-06-27T12:15:00Z",
    isRead: true,
  },
  {
    id: "4",
    type: "general_info",
    title: "Terms of Service Update",
    message: "We've updated our terms. Please review them at your convenience.",
    date: "2024-06-26T18:00:00Z",
    isRead: true,
  },
  {
    id: "5",
    type: "deposit_success",
    title: "Deposit Successful",
    message: "Your deposit of €15,00 has been added to your wallet.",
    date: "2024-06-26T11:45:00Z",
    isRead: true,
  },
  {
    id: "6",
    type: "reward_unlocked",
    title: "Welcome Bonus!",
    message: "Thanks for joining! We've credited your account with 800 Ᵽ.",
    date: "2024-06-23T14:20:00Z",
    isRead: true,
  },
];

const ICONS: Record<Notification["type"], React.ReactNode> = {
  deposit_success: <Feather name="check-circle" size={24} color="#10B981" />,
  reward_unlocked: <Feather name="star" size={24} color="#F59E0B" />,
  spend_alert: <Feather name="credit-card" size={24} color="#EF4444" />,
  general_info: <Feather name="info" size={24} color="#3B82F6" />,
};

const timeAgo = (dateString: string): string => {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return "Just now";
};

async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert(
      "Permission Denied",
      "To enable push notifications, please grant permission in your device settings."
    );
    return;
  }

  try {
    token = (await Notifications.getExpoPushTokenAsync()).data;

    console.log("Expo Push Token:", token);
  } catch (e) {
    console.error("Failed to get push token", e);
  }

  return token;
}

const NotificationItem: React.FC<{
  item: Notification;
  onPress: () => void;
}> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, !item.isRead && styles.unreadItem]}
    >
      {!item.isRead && <View style={styles.unreadDot} />}
      <View style={styles.itemIconContainer}>{ICONS[item.type]}</View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemMessage}>{item.message}</Text>
      </View>
      <Text style={styles.itemDate}>{timeAgo(item.date)}</Text>
    </TouchableOpacity>
  );
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setPushEnabled(status === "granted");
    };
    checkPermissions();
  }, []);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const togglePushNotifications = async () => {
    const newEnabledState = !pushEnabled;
    if (newEnabledState) {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setPushEnabled(true);

        Alert.alert("Success", "Push notifications have been enabled.");
      }
    } else {
      setPushEnabled(false);

      Alert.alert(
        "Notifications Disabled",
        "To re-enable, please visit your device's settings.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingRow}>
          <Feather name="bell" size={22} color="#4B5563" />
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Push Notifications</Text>
          </View>
          <Switch
            trackColor={{ false: "#D1D5DB", true: "#00494f" }}
            thumbColor={pushEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#E5E7EB"
            onValueChange={togglePushNotifications}
            value={pushEnabled}
          />
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listHeaderTitle}>Recent Activity</Text>
        <TouchableOpacity onPress={handleMarkAllRead}>
          <Text style={styles.headerActionText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={() => handleMarkAsRead(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="bell-off" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No notifications yet</Text>
            <Text style={styles.emptySubText}>
              We will let you know when something important happens.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },

  settingsContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
  },
  listHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  headerActionText: {
    fontSize: 14,
    color: "#00494f",
    fontWeight: "600",
  },

  listContentContainer: {
    paddingBottom: 24,
  },

  itemContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  unreadItem: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
    position: "absolute",
    left: 12,
    top: "50%",
  },
  itemIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  itemMessage: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  itemDate: {
    fontSize: 12,
    color: "#9CA3AF",
    alignSelf: "flex-start",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
});
