import { ColorPalette } from "@/constants/Colors";
import { textStyle } from "@/helpers/globalstyles";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { scale } from "react-native-size-matters";

interface MenuHeaderProps {
  leftButton?: "menu" | "back";
  title: string;
  navigation: any;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({
  leftButton = "menu",
  title,
  navigation,
}) => {
  const handleLeftButtonPress = () => {
    return leftButton === "menu"
      ? navigation.toggleDrawer()
      : navigation.goBack();
  };

  return (
    <View style={styles.main}>
      <View style={styles.leftButtonContainer}>
        <TouchableOpacity onPress={handleLeftButtonPress}>
          {leftButton === "menu" ? (
            <Entypo name="menu" size={scale(22)} color={ColorPalette.white} />
          ) : (
            <AntDesign
              name="arrowleft"
              size={scale(21)}
              color={ColorPalette.white}
            />
          )}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      </View>

      <View style={styles.rightButtonContainer}>
        <TouchableOpacity onPress={() => console.log("sorting clicked")}>
          <MaterialCommunityIcons
            name="sort-variant"
            color={ColorPalette.white}
            size={scale(23)}
            style={{ marginRight: scale(22) }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("filter clicked")}>
          <MaterialIcons
            name="filter-list"
            color={ColorPalette.white}
            size={scale(23)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuHeader;

const styles = StyleSheet.create({
  main: {
    height: scale(54),
    flexDirection: "row",
    backgroundColor: ColorPalette.navyBlue,
    alignItems: "center",
    paddingHorizontal: scale(15),
  },
  leftButtonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  titleStyle: textStyle(ColorPalette.white),
  titleContainer: {
    marginLeft: scale(10),
  },
  rightButtonContainer: {
    flexDirection: "row",
  },
});
