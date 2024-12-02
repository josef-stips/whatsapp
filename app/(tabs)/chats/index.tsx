import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import chats from "@/assets/data/chats.json";
import { defaultStyles } from "@/constants/Styles";
import ChatRow from "@/app/components/ChatRow";

const Page = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <FlatList
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        scrollEnabled={false}
        data={chats}
        renderItem={({ item }) => <ChatRow {...item} />}
      />
    </ScrollView>
  );
};

export default Page;
