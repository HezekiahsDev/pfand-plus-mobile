import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type CardProps = {
  title: string;
  content: string | React.ReactNode;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  title,
  content,
  onPress,
  variant = "primary",
  icon,
}) => {
  let baseClasses = "m-2 p-4 rounded-2xl shadow";

  let variantClasses = "bg-white border border-gray-200";
  switch (variant) {
    case "primary":
      variantClasses = "bg-green-100 border-green-300";
      break;
    case "secondary":
      variantClasses = "bg-blue-100 border-blue-300";
      break;
    case "outline":
      variantClasses = "bg-transparent border-gray-400";
      break;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className={`${baseClasses} ${variantClasses}`.trim()}
    >
      <View className="flex-row items-center mb-2">
        {icon && <View className="mr-2">{icon}</View>}
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
      </View>

      <View>
        {typeof content === "string" ? (
          <Text className="text-base text-gray-600">{content}</Text>
        ) : (
          content
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
