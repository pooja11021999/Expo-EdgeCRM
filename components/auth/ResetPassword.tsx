import { ColorPalette, Colors } from "@/constants/Colors";
import { globalStyles, textStyle } from "@/helpers/globalstyles";
import React, { useState } from "react";
import {
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";
import { forgotPassword, verifyOTP } from "./services";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { API_URL } from "@/constants/Api";
import axios from "axios";
import AuthButton from "./AuthButton";
import { AuthStyle } from "./AuthStyle";
import { useSession } from "@/context/ctx";

interface PasswordCheckProps {
  isPasswordLength: boolean;
  haveUppercase: boolean;
  haveLowercase: boolean;
  haveNumeric: boolean;
  haveSpecialCharacters: boolean;
}

export const Done: React.FC = () => {
  return (
    <View
      style={[styles.ruleValueContainer, { borderColor: ColorPalette.green }]}
    >
      <AntDesign name="check" size={scale(16)} color={ColorPalette.green} />
    </View>
  );
};

export const NotDone: React.FC = () => {
  return (
    <View
      style={[styles.ruleValueContainer, { borderColor: ColorPalette.red }]}
    >
      <MaterialIcons name="close" size={scale(18)} color={ColorPalette.red} />
    </View>
  );
};

export const PasswordCheck: React.FC<PasswordCheckProps> = ({
  isPasswordLength,
  haveUppercase,
  haveLowercase,
  haveNumeric,
  haveSpecialCharacters,
}) => {
  const PASSWORD_RULES = [
    {
      id: 1,
      label: "Min 8 and Max 16 characters",
      value: isPasswordLength,
    },
    { id: 2, label: "A Capital letter", value: haveUppercase },
    { id: 3, label: "A Small letter", value: haveLowercase },
    { id: 4, label: "A Number", value: haveNumeric },
    { id: 5, label: "A special character", value: haveSpecialCharacters },
  ];

  return (
    <View>
      {PASSWORD_RULES.map((rule, ind) => (
        <View
          key={ind}
          style={{
            flexDirection: "row",
            marginBottom: 5,
          }}
        >
          {rule?.value ? <Done /> : <NotDone />}
          <Text style={styles.ruleTextStyle}>{rule?.label || ""}</Text>
        </View>
      ))}
    </View>
  );
};

interface ResetPasswordInputs {
  email: "";
  current_password: "";
  password: "";
  password_confirmation: "";
}

interface ResetPasswordProps {
  emailToResetPassword: string;
  loading: boolean;
  authScreen: string;
  setAuthScreen: React.Dispatch<
    React.SetStateAction<
      | "Login"
      | "ForgotPassword"
      | "OTPForm"
      | "ResetPassword"
      | "OTPFormForForgotPassword"
    >
  >;
  showToast: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  emailToResetPassword,
  loading,
  authScreen,
  setAuthScreen,
  showToast,
  setLoading,
}) => {
  const { session } = useSession();

  React.useEffect(() => {
    const backAction = () => {
      setAuthScreen("OTPForm");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const [isPasswordVisible, setPasswordVisible] = React.useState(false);
  const [passwordRuleLengthInfo, setPasswordRuleLengthInfo] = React.useState({
    checkRulePassedLength: 0,
    passwordRuleLength: [1, 2, 3, 4, 5],
  });
  const [passwordValidations, setPasswordValidations] = React.useState({
    isPasswordLength: false,
    haveLowercase: false,
    haveUppercase: false,
    haveNumeric: false,
    haveSpecialCharacters: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();

  const onSubmit = (data: ResetPasswordInputs) => {
    console.log("passworkds--", {
      ...data,
      email: emailToResetPassword,
      current_password: "",
    });
    handleResetPassword({
      ...data,
      email: emailToResetPassword,
      current_password: "",
    });
  };

  const checkPasswordConditions = (password: string) => {
    let isPasswordLength = false,
      haveLowercase = false,
      haveUppercase = false,
      haveNumeric = false,
      haveSpecialCharacters = false,
      checkRulePassedLength = 0,
      passwordRuleLength = [1, 2, 3, 4, 5];
    if (password && password.length >= 8 && password.length <= 16) {
      isPasswordLength = true;
      checkRulePassedLength += 1;
    } else {
      isPasswordLength = false;
    }

    if (/(?=.*[a-z])\w+/g.test(password)) {
      haveLowercase = true;
      checkRulePassedLength += 1;
    } else {
      haveLowercase = false;
    }

    if (/(?=.*[A-Z])\w+/g.test(password)) {
      haveUppercase = true;
      checkRulePassedLength += 1;
    } else {
      haveUppercase = false;
    }

    if (/(?=.*[0-9])\w+/g.test(password)) {
      haveNumeric = true;
      checkRulePassedLength += 1;
    } else {
      haveNumeric = false;
    }

    if (/(?=.*[-+_!@#$%^&*., ?])\w+/g.test(password)) {
      haveSpecialCharacters = true;
      checkRulePassedLength += 1;
    } else {
      haveSpecialCharacters = false;
    }

    setPasswordValidations({
      isPasswordLength,
      haveLowercase,
      haveUppercase,
      haveNumeric,
      haveSpecialCharacters,
    });
    setPasswordRuleLengthInfo({ checkRulePassedLength, passwordRuleLength });
  };

  const handleResetPassword = (data: object) => {
    setLoading(true);
    const resetUrl =
      authScreen === "ResetPassword"
        ? `${API_URL}/mobile/change-password-mobile`
        : `${API_URL}/reset-expired-password`;

    const resetData =
      authScreen === "ResetPassword"
        ? {
            email: true,
            ...data,
          }
        : {
            api_token: session,
            ...data,
          };
    axios({
      method: "POST",
      url: resetUrl,
      data: resetData,
    })
      .then((response) => {
        setLoading(false);

        if (authScreen === "ResetPassword") {
          setAuthScreen("Login");
        } else {
          //   handleResetPassword();
        }

        showToast("Password Reset Successfully!", "success");
      })
      .catch((error) => {
        console.log("urlrllr-", resetUrl, resetData);
        console.log("error of reset pass-", error);
        showToast("Some problem while resetting password!", "fail");
        setLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Set new password.</Text>
      <Text style={styles.emailStyle}>{emailToResetPassword}</Text>
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
              onChangeText={(text) => {
                onChange(text);
                checkPasswordConditions(text);
              }}
              value={value}
              placeholder="Password"
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
      <View style={styles.ruleProgressBar}>
        {passwordRuleLengthInfo.passwordRuleLength.map((val, ind) => (
          <View
            key={ind}
            style={[
              styles.ruleProgress,
              {
                backgroundColor:
                  passwordRuleLengthInfo.checkRulePassedLength < val
                    ? "#d4d5d6"
                    : "#73AF55",
              },
            ]}
          ></View>
        ))}
      </View>
      <PasswordCheck
        isPasswordLength={passwordValidations.isPasswordLength}
        haveLowercase={passwordValidations.haveLowercase}
        haveUppercase={passwordValidations.haveUppercase}
        haveNumeric={passwordValidations.haveNumeric}
        haveSpecialCharacters={passwordValidations.haveSpecialCharacters}
      />
      <View
        style={[
          AuthStyle.passwordContainer,
          errors.password && AuthStyle.errorInput,
        ]}
      >
        <Controller
          control={control}
          defaultValue=""
          rules={{ required: "Confirm password is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                AuthStyle.input,

                {
                  borderBottomWidth: scale(0),
                  marginBottom: scale(0),
                  width: "85%",
                },
                errors.password_confirmation && AuthStyle.errorInput,
              ]}
              onBlur={onBlur}
              onChangeText={(text) => {
                onChange(text);
                checkPasswordConditions(text);
              }}
              value={value}
              placeholder="Confirm Password"
              placeholderTextColor="#bbb"
              secureTextEntry={!isPasswordVisible}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="password_confirmation"
        />
        <Pressable onPress={togglePasswordVisibility} style={styles.icon}>
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={ColorPalette.navyBlue}
          />
        </Pressable>
      </View>
      {errors.password_confirmation && (
        <Text style={globalStyles.errorMessageText}>
          {errors.password_confirmation.message}
        </Text>
      )}

      <AuthButton
        title="Reset"
        loadingTitle="Resetting"
        onPress={handleSubmit(onSubmit)}
        isLoading={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    ...textStyle(ColorPalette.navyBlue, scale(23)),
  },
  emailStyle: {
    marginVertical: 20,
    ...textStyle(ColorPalette.darkGray, scale(15)),
  },
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
  ruleProgress: {
    height: 6,
    width: "17%",
    borderRadius: 5,
  },
  ruleProgressBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: scale(20),
  },
  ruleTextStyle: {
    marginLeft: 10,
    ...textStyle(ColorPalette.black, scale(14)),
  },
  ruleValueContainer: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: scale(1),
  },
});
