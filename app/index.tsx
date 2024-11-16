import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import welcomeImage from "@/assets/images/welcome.png";
import Colors from "@/constants/Colors";
const welcome_image = Image.resolveAssetSource(welcomeImage).uri;

const Page = () => {
  const openLink = () => {
    Linking.openURL("https://galaxies.dev");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: welcome_image }} style={styles.welcome}></Image>
      <Text style={styles.headline}>Welcome to Whatsapp Clone</Text>

      <Text style={styles.description}>
        Read our{" "}
        <Text style={styles.link} onPress={openLink}>
          Privacy Policy
        </Text>
        . {'Tap "Agree & Continue" to accept the '}
        <Text style={styles.link} onPress={openLink}>
          Terms and Service
        </Text>
        .
      </Text>

      <Link href={"/otp"} replace asChild>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  welcome: {
    width: "100%",
    height: 300,
    borderRadius: 60,
    marginBottom: 80,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 80,
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: "500",
  },
});

export default Page;
