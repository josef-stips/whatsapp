import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import calls from "@/assets/data/calls.json";
import { defaultStyles } from "@/constants/Styles";
import { format } from "../../../node_modules/date-fns";
import { SegmentedControl } from "@/app/components/segmentedControl";
import Animated, {
  FadeInUp,
  FadeOutUp,
  CurvedTransition,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import SwipeableRow from "@/app/components/SwipeableRow";
import * as Haptics from "expo-haptics";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const transition = CurvedTransition.delay(100);

const Page = () => {
  const [isEditing, setisEditing] = useState(false);
  const [items, setItems] = useState(calls);
  const [selectedOption, setSelectedOption] = useState("All");
  const editing = useSharedValue(-30);

  const onEdit = () => {
    let editingNew = !isEditing;
    editing.value = editingNew ? 0 : -30;
    setisEditing(editingNew);
  };

  const onSegmentChange = (option: string) => {
    setSelectedOption(option);
    if (option === "All") {
      setItems(calls);
    } else {
      setItems(calls.filter((call) => call.missed));
    }
  };

  const removeCall = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems(items.filter((i) => i.id !== item.id));
  };

  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value) }],
  }));

  useEffect(() => {
    console.log("selectedOption", selectedOption);
  }, [selectedOption]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={["All", "Missed"]}
              selectedOption={selectedOption}
              onOptionPress={onSegmentChange}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                {isEditing ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Animated.View style={[defaultStyles.block]} layout={transition}>
          <Animated.FlatList
            skipEnteringExitingAnimations
            itemLayoutAnimation={transition}
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item, index }) => (
              <SwipeableRow onDelete={() => removeCall(item)}>
                <Animated.View
                  entering={FadeInUp.delay(index * 20)}
                  exiting={FadeOutUp}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <AnimatedTouchableOpacity
                    onPress={() => removeCall(item)}
                    style={[animatedRowStyles, { paddingLeft: 8 }]}
                  >
                    <Ionicons
                      name="remove-circle"
                      size={24}
                      color={Colors.red}
                    />
                  </AnimatedTouchableOpacity>

                  <Animated.View
                    style={[
                      defaultStyles.item,
                      animatedRowStyles,
                      { paddingLeft: 10 },
                    ]}
                  >
                    <Image
                      source={{ uri: item.img }}
                      style={styles.avatar}
                    ></Image>

                    <View style={{ flex: 1, gap: 2 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: item.missed ? Colors.red : "#000",
                        }}
                      >
                        {item.name}
                      </Text>

                      <View>
                        <Ionicons
                          name={item.video ? "videocam" : "call"}
                          size={16}
                          color={Colors.gray}
                        />
                        <Text style={{ color: Colors.gray, flex: 1 }}>
                          {item.incoming ? "Incoming" : "Outgoing"}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: Colors.gray }}>
                        {format(item.date, "MM.dd.yy")}
                      </Text>
                      <Ionicons
                        name="information-circle-outline"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                  </Animated.View>
                </Animated.View>
              </SwipeableRow>
            )}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Page;
