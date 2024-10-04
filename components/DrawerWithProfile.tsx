import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { useTheme } from "@react-navigation/native";
import { useSession } from "@/context/ctx";

export default function CustomDrawerContent(props) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  const { colors } = useTheme(); // Access the current theme colors
  const { signOut } = useSession();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.drawerBackground }}>
      <View
        style={[styles.userCard, { backgroundColor: colors.drawerBackground }]}
      >
        <Image
          source={{
            uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
          }} // Replace with the actual image URL
          style={styles.avatar}
        />
        <View style={styles.userContent}>
          <Text
            style={[
              styles.userName,
              { fontFamily: "Poppins_400Regular", color: colors.text },
            ]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Himanshu Vishwakarma
          </Text>
          <Text
            style={[
              styles.userSubtitle,
              { fontFamily: "Poppins_400Regular", color: colors.text },
            ]}
            ellipsizeMode="middle"
            numberOfLines={1}
          >
            Himanshu.Vishwakarma@gmail.com
          </Text>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={[
          styles.drawerContent,
          { backgroundColor: colors.background },
        ]}
      >
        <View style={styles.menuItems}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={[styles.footer, { backgroundColor: colors.drawerBackground }]}
      >
        <Text
          style={[
            styles.footerText,
            { fontFamily: "Poppins_400Regular", color: colors.text },
          ]}
        >
          Version 5.6
        </Text>

        <Pressable onPress={signOut}>
          <AntDesign name="logout" size={24} color={colors.text} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: 10,
  },
  userCard: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  userContent: {
    width: "80%",
  },
  userName: {
    fontSize: 16,
    flexShrink: 1,
    width: "100%",
    marginBottom: 5,
  },
  userSubtitle: {
    fontSize: 12,
    flexShrink: 1,
    width: "100%",
  },
  menuItems: {
    flex: 1,
  },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
  },
});
