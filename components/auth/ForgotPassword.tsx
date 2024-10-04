import { ColorPalette } from "@/constants/Colors";
import { globalStyles, textStyle } from "@/helpers/globalstyles";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";

import AuthButton from "./AuthButton";
import { AuthStyle } from "./AuthStyle";
import { forgotPassword } from "./services";

interface ForgotPasswordInput {
  email: string;
}

interface AuthScreenProps {
  setAuthScreen: React.Dispatch<
    React.SetStateAction<
      | "Login"
      | "ForgotPassword"
      | "OTPForm"
      | "ResetPassword"
      | "OTPFormForForgotPassword"
    >
  >;
  setEmailToResetPassword: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  showToast: any;
}

export const ForgotPassword: React.FC<AuthScreenProps> = ({
  setAuthScreen,
  setEmailToResetPassword,
  loading,
  setLoading,
  showToast,
}) => {
  const url = `/api/mobile/forgot-password-mobile`;

  React.useEffect(() => {
    const backAction = () => {
      setAuthScreen("Login");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordInput>();

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPasswordSubmit(data.email, setError);
  };

  const forgotPasswordSubmit = (email: string, setError: any) => {
    setEmailToResetPassword(email);
    const url = `/mobile/forgot-password-mobile`;

    forgotPassword({ email: email }, url)
      .then((res) => {
        setLoading(true);
        setAuthScreen("OTPFormForForgotPassword");
        showToast("OTP Sent Successfully!", "success");
        setLoading(false);
      })
      .catch((err) => {
        setError("email", {
          type: "manual",
          message:
            "This email id is not added in CRM, please contact admin for the same.",
        });
      });
  };

  return (
    <View style={AuthStyle.AuthContainer}>
      <Pressable
        style={styles.backButtonContainer}
        onPress={() => setAuthScreen("Login")}
      >
        <Entypo name="chevron-thin-left" size={18} color={ColorPalette.white} />
      </Pressable>

      <View style={{ flex: 0.1 }} />
      <Controller
        control={control}
        rules={{
          required: "The email field is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "The email must be a valid email address.",
          },
        }}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[AuthStyle.input, errors.email && AuthStyle.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your email id"
            placeholderTextColor="#bbb"
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={handleSubmit(onSubmit)}
            autoFocus
          />
        )}
        name="email"
      />

      {errors.email && (
        <Text style={globalStyles.errorMessageText}>
          {errors.email.message}
        </Text>
      )}

      <AuthButton
        title="Next"
        loadingTitle="Next"
        onPress={handleSubmit(onSubmit)}
        isLoading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: scale(5),
  },
  errorText: {
    color: "red",
    ...textStyle(),
  },
  backButtonContainer: {
    height: scale(36),
    width: scale(36),
    borderRadius: scale(10),
    backgroundColor: ColorPalette.navyBlue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(15),
  },
});
