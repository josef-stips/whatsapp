import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import contacts from "@/assets/data//contacts.json";
import { AlphabetList } from "react-native-section-alphabet-list";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Page = () => {
  const data = contacts.map((contact, index) => ({
    value: `${contact.first_name} ${contact.last_name}`,
    name: `${contact.first_name} ${contact.last_name}`,
    img: contact.img,
    desc: contact.desc,
    key: `${contact.first_name} ${contact.last_name}-${index}`,
  }));

  return (
    <View
      style={{ flex: 1, paddingTop: 110, backgroundColor: Colors.background }}
    >
      <AlphabetList
        data={data}
        stickySectionHeadersEnabled
        indexLetterStyle={{
          color: Colors.primary,
          fontSize: 12,
        }}
        indexContainerStyle={{
          width: 24,
          backgroundColor: Colors.background,
        }}
        renderCustomItem={(item: any) => (
          <>
            <View style={styles.listItemContainer}>
              <Image source={{ uri: item.img }} style={styles.listItemImage} />
              <View>
                <Text style={{ color: "#000", fontSize: 14 }}>
                  {item.value}
                </Text>
                <Text
                  style={{
                    color: Colors.gray,
                    fontSize: 12,
                    width: 250,
                  }}
                  numberOfLines={1}
                >
                  {item.desc}
                </Text>
              </View>
            </View>
            <View style={[defaultStyles.separator, { marginLeft: 50 }]} />
          </>
        )}
        renderCustomSectionHeader={(section) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={{ color: Colors.gray }}>{section.title}</Text>
          </View>
        )}
        style={{
          marginLeft: 14,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },

  listItemImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  sectionHeaderContainer: {
    height: 30,
    backgroundColor: "transparent",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
});

export default Page;
