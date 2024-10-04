import { ColorPalette, Colors } from "@/constants/Colors";
import { textStyle } from "@/helpers/globalstyles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { scale } from "react-native-size-matters";

interface AuthButtonProps {
  title: string;
  loadingTitle: string;
  isLoading: boolean;
  onPress: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  loadingTitle,
  isLoading,
  onPress,
}) => {
  return (
    <>
      {isLoading ? (
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>{loadingTitle}...</Text>
          <ActivityIndicator size={scale(25)} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.submitButton}>
          <Text style={styles.submitText}>{title}</Text>
          <Ionicons
            name="arrow-forward"
            size={scale(32)}
            color={Colors.light.primaryColor}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  submitButton: {
    width: "100%",
    paddingHorizontal: scale(10),
    paddingVertical: scale(20),
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scale(15),
    alignItems: "center",
  },
  submitText: {
    fontWeight: "500",
    ...textStyle(ColorPalette.navyBlue, scale(20)),
  },
});
