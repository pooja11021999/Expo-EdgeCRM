import { ColorPalette } from "@/constants/Colors";
import { useSession } from "@/context/ctx";
import { textStyle } from "@/helpers/globalstyles";
import React, { useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";

import AuthButton from "./AuthButton";
import { forgotPassword, verifyOTP } from "./services";

interface OTPFormProps {
  OTPScreenType: number;
  loading: boolean;
  emailToResetPassword: string;
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
  showToast: any;
  forgotOtp: boolean;
  resendOTPForLogin: () => void;
  handleOTPForLogin: (data: object) => void;
  authScreen: string;
}

const seconds = 60;

export const OTPForm: React.FC<OTPFormProps> = ({
  setAuthScreen,
  OTPScreenType,
  forgotOtp = false,
  emailToResetPassword,
  loading,
  setLoading,
  resendOTPForLogin,
  handleOTPForLogin,
  showToast,
  authScreen,
}) => {
  const { isLoading, signIn, session, loginData } = useSession();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [count, setCount] = React.useState(seconds);

  const inputRefs = React.useRef<(TextInput | null)[]>(Array(6).fill(null));

  const url = `/api/mobile/forgot-password-mobile`;
  const otpUrl = `/api/mobile/verify-otp-mobile`;

  React.useEffect(() => {
    const backAction = () => {
      setAuthScreen("ForgotPassword");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const CountDown = () => {
    React.useEffect(() => {
      const timerId = setInterval(() => {
        const val = count - 1;
        setCount(val);
      }, 1000);
      return () => clearInterval(timerId);
    });
    return <Text>{`in ${count} seconds.`}</Text>;
  };

  const validateOTP = (data: object) => {
    const otpData = { ...data, email: emailToResetPassword };
    setLoading(true);
    verifyOTP(otpData, otpUrl)
      .then((res) => {
        showToast("OTP Verified Successfully!", "success");
        setLoading(false);

        setAuthScreen("ResetPassword");
      })
      .catch((err) => {
        setLoading(false);
        showToast("The OTP you have entered does not match.", "fail");
      });
  };

  const resendOTP = () => {
    forgotPassword({ email: emailToResetPassword }, url)
      .then((res) => {
        showToast("OTP Sent Successfully!", "success");
        setLoading(false);
      })
      .catch((err) => {
        showToast("Some problem while sending OTP!", "fail");
        setLoading(false);
      });
  };

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (newOtp[index] && index < newOtp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!newOtp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <Text style={styles.heading}>OTP Verification</Text>
      <Text style={styles.noteStyle}>
        {`You would have received an ${
          OTPScreenType == 1 ? "email" : "SMS"
        } that contains the OTP for ${
          forgotOtp ? "resetting password" : "Login"
        }. If you haven't received it, you can `}
        <TouchableWithoutFeedback
          // disabled={count > 0 ? true : false}
          onPress={() => {
            if (count <= 0) {
              authScreen === "OTPFormForForgotPassword"
                ? resendOTP()
                : resendOTPForLogin();
              setCount(seconds);
            }
          }}
        >
          <Text
            style={{
              color: count <= 0 ? ColorPalette.blue : ColorPalette.black,
            }}
          >
            Resend it {count <= 0 ? "." : <CountDown />}
          </Text>
        </TouchableWithoutFeedback>
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((digit: string, index: number) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            keyboardType="numeric"
            maxLength={1}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <AuthButton
        title="Verify"
        loadingTitle="Verifying"
        onPress={() =>
          authScreen === "OTPFormForForgotPassword"
            ? validateOTP({ two_factor_code: otp })
            : handleOTPForLogin({ two_factor_code: otp })
        }
        isLoading={loading}
      />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginBottom: 10,
    ...textStyle(ColorPalette.navyBlue, scale(20)),
  },
  noteStyle: textStyle(ColorPalette.black, scale(14)),
  otpContainer: {
    flexDirection: "row",
    gap: scale(12),
    marginBottom: scale(20),
    marginTop: scale(15),
    justifyContent: "center",
  },
  otpInput: {
    width: scale(30),
    height: scale(40),
    borderBottomWidth: scale(1),
    borderColor: ColorPalette.gray,
    textAlign: "center",
    ...textStyle(ColorPalette.black, scale(18)),
  },
});
