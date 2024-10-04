import { ColorPalette } from "@/constants/Colors";
import { useSession } from "@/context/ctx";
import { globalStyles, textStyle } from "@/helpers/globalstyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { scale } from "react-native-size-matters";

import AuthButton from "./AuthButton";
import { AuthStyle } from "./AuthStyle";

interface LoginFormInputs {
  email: string;
  password: string;
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  showToast: any;
  setLoginCredentials: React.Dispatch<React.SetStateAction<any>>;
  loginCredentials: object;
}

export const LoginForm: React.FC<AuthScreenProps> = ({
  setAuthScreen,
  setLoading,
  loading,
  showToast,
  setLoginCredentials,
  loginCredentials,
}) => {
  const { isLoading, signIn, session, loginData } = useSession();
  console.log("session-", session, loginData?.data?.role);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("credentials++", data);
    setLoginCredentials({ ...data });
    setLoading(isLoading);
    signIn(data.email, data.password);

    //for verifying user
    // const superAdmin = loginData?.data?.role?.filter((item: any) => {
    //   if (item.name == "super-admin") return true;
    // });
    // const is_superAdmin = superAdmin.length > 0 ? true : false;
    // if (!loginData?.data?.two_factor || is_superAdmin) {

    //   if (session) {
    //     showToast("Logged In Successfully!", "success");
    //   }
    // } else if (loginData?.data?.two_factor && !is_superAdmin) {
    //   setAuthScreen("OTPForm");
    // }

    setLoading(isLoading);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const onError = (errors: any) => {
    if (Object.keys(errors).length > 0) {
      showToast("Some problem logging in!", "fail");
    }
  };

  return (
    <View style={AuthStyle.AuthContainer}>
      <View style={{ flex: 0.1 }} />
      <Controller
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Email is invalid",
          },
        }}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[AuthStyle.input, errors.email && AuthStyle.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter Email"
            placeholderTextColor="#bbb"
            keyboardType="email-address"
            autoCapitalize="none"
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

      <View
        style={[
          AuthStyle.passwordContainer,
          errors.password && AuthStyle.errorInput,
        ]}
      >
        <Controller
          control={control}
          defaultValue=""
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                AuthStyle.input,

                {
                  borderBottomWidth: scale(0),
                  marginBottom: scale(0),
                  width: "85%",
                },
                errors.password && AuthStyle.errorInput,
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter Password"
              placeholderTextColor="#bbb"
              secureTextEntry={!isPasswordVisible}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="password"
        />
        <Pressable onPress={togglePasswordVisibility} style={styles.icon}>
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={ColorPalette.navyBlue}
          />
        </Pressable>
      </View>
      {errors.password && (
        <Text style={globalStyles.errorMessageText}>
          {errors.password.message}
        </Text>
      )}

      <Pressable
        style={styles.forgotPasswordTextBtn}
        onPress={() => setAuthScreen("ForgotPassword")}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
      </Pressable>

      <AuthButton
        title="Sign In"
        loadingTitle="Signing In"
        onPress={handleSubmit(onSubmit, onError)}
        isLoading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: scale(5),
  },
  forgotPasswordText: {
    textAlign: "right",
    ...textStyle(ColorPalette.navyBlue, scale(14)),
  },
  forgotPasswordTextBtn: {
    width: "100%",
    marginTop: scale(10),
  },
});
