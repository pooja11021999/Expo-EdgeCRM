import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ColorPalette } from "@/constants/Colors";
import { scale } from "react-native-size-matters";
import { textStyle } from "@/helpers/globalstyles";

interface ToastProps {
  visible: boolean;
  message: string;
  status: "success" | "fail";
  onRightButtonPress: () => void;
}

const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  status,
  onRightButtonPress,
}) => {
  if (!visible) return null;

  return (
    <View
      style={[
        styles.toastContainer,
        {
          backgroundColor:
            status === "success" ? ColorPalette.green : ColorPalette.red,
        },
      ]}
    >
      <Text style={styles.toastTextStyle} ellipsizeMode="tail">
        {message}
      </Text>
      <TouchableOpacity
        onPress={onRightButtonPress}
        style={styles.rightButtonStyle}
      >
        <Text style={styles.toastButtonTextStyle}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    width: "100%",
    padding: scale(15),
    position: "absolute",
    bottom: scale(0),
    left: scale(0),
    right: scale(0),
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: scale(8),
  },
  toastTextStyle: {
    flex: 1,
    ...textStyle(ColorPalette.white, scale(14)),
  },
  rightButtonStyle: {
    paddingLeft: scale(10),
    paddingRight: scale(10),
  },
  toastButtonTextStyle: {
    ...textStyle(ColorPalette.white, scale(14)),
  },
});

export default Toast;
