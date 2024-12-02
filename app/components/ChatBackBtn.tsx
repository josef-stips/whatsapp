import { TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const ChatBackBtn = () => {
  return (
    <Link href="/(tabs)/chats" asChild>
      <TouchableOpacity>
        <Ionicons
          name="chevron-back-outline"
          size={28}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </Link>
  );
};

export default ChatBackBtn;
