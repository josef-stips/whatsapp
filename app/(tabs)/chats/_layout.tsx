import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { Link } from "expo-router";
import ChatBackBtn from "@/app/components/ChatBackBtn";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "light",
          // headerStyle: {
          //   backgroundColor: "#fff",
          // },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                color={Colors.primary}
                size={30}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="camera-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              <Link href="/(modals)/new-chat" asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="add-circle"
                    color={Colors.primary}
                    size={30}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerBlurEffect: "regular",
          headerBackVisible: false,
          title: "",
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="videocam-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="call-outline"
                  color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => <ChatBackBtn />,
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                paddingBottom: 4,
                alignItems: "center",
                width: 225,
              }}
            >
              <Image
                source={{
                  uri: "https://pbs.twimg.com/profile_images/1564203599747600385/f6Lvcpcu_400x400.jpg",
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Simon Grimm
              </Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
