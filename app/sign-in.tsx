import { ForgotPassword } from "@/components/auth/ForgotPassword";
import { LoginForm } from "@/components/auth/LoginForm";
import { OTPForm } from "@/components/auth/OTPForm";
import { ResetPassword } from "@/components/auth/ResetPassword";
import CustomToast from "@/components/commonComponents/Toast";
import { API_URL } from "@/constants/Api";
import { ColorPalette } from "@/constants/Colors";
import { textStyle } from "@/helpers/globalstyles";
import React from "react";
import {
  Animated,
  Easing,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";

import { get } from "../helpers/axioscall";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/commonComponents/Toast";
import { useSession } from "@/context/ctx";
import axios from "axios";

const Logo = require("@/assets/images/logo.png");

const startRotationAnimation = (
  durationMs: number,
  rotationDegree: Animated.Value
) => {
  Animated.loop(
    Animated.timing(rotationDegree, {
      toValue: 360,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();
};

interface LoadingSpinnerProps {
  height?: number;
  color: string;
  durationMs?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  height = 24,
  color,
  durationMs = 1000,
}) => {
  const rotationDegree = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree);
  }, [durationMs, rotationDegree]);

  return (
    <View
      style={{
        width: height,
        height: height,
        justifyContent: "center",
        alignItems: "center",
      }}
      accessibilityRole="button"
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          borderRadius: height / 2,
          borderWidth: 4,
          borderColor: color,
          opacity: 0.25,
        }}
      />
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          borderRadius: height / 2,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderWidth: 4,
          position: "absolute",
          borderColor: color,
          transform: [
            {
              rotateX: rotationDegree.interpolate({
                inputRange: [0, 360],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        }}
      />
    </View>
  );
};

export default function SignIn() {
  const { session, signIn } = useSession();
  const [versionNumber, setVersionNumber] = React.useState(null);
  const [emailToResetPassword, setEmailToResetPassword] = React.useState("");
  const [versionNumberLoading, setVersionNumberLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [OTPScreenType, setOTPScreenType] = React.useState(1);
  const [OTPDetails, setOTPDetails] = React.useState({});
  const [loginCredentials, setLoginCredentials] = React.useState({
    email: "",
    password: "",
  });

  const [authScreen, setAuthScreen] = React.useState<
    | "Login"
    | "ForgotPassword"
    | "OTPForm"
    | "ResetPassword"
    | "OTPFormForForgotPassword"
  >("Login");

  const {
    toastMessage,
    toastStatus,
    toastVisible,
    showToast,
    onRightButtonPress,
  } = useToast();

  const slideValue = React.useRef(new Animated.Value(0)).current;
  const slideVal = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  React.useEffect(() => {
    Animated.timing(slideValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    getVersionNumber();
  }, []);

  const resendOTPForLogin = () => {
    axios({
      method: "GET",
      url:
        OTPScreenType == 1
          ? `${API_URL}/resend`
          : OTPScreenType == 2
          ? `${API_URL}/api/resend-sms`
          : "",
      params: { api_token: session },
    })
      .then((res) => {
        if (OTPScreenType == 2) {
          setOTPDetails(res.data.otp_details);
        }

        showToast("OTP sent successfully!", "success");
      })
      .catch((error) => {
        showToast("Some problem while sending OTP!", "fail");
      });
  };

  const handleOTPForLogin = (data: object) => {
    setLoading(true);

    axios({
      method: "POST",
      url:
        OTPScreenType == 1
          ? `${API_URL}/verify`
          : OTPScreenType == 2
          ? `${API_URL}/verify-sms`
          : "",
      data:
        OTPScreenType == 1
          ? { api_token: session, ...data }
          : OTPScreenType == 2 && {
              otp_details: OTPDetails,
              api_token: session,
              ...data,
            },
    })
      .then((response) => {
        // this.props.screenProps.authenticateUser({
        //   ...this.state.user,
        //   api_token: this.state.api_token,
        // });
        signIn(loginCredentials?.email, loginCredentials?.password);
      })
      .catch((error) => {
        setLoading(false);

        showToast(
          "The two factor code you have entered does not match.",
          "fail"
        );
      });
  };

  const getVersionNumber = () => {
    get({
      url: `${API_URL}/mobile/version-details`,
    })
      .then((response) => {
        setTimeout(() => {
          setVersionNumber(response.data.versionNo),
            setVersionNumberLoading(false);
        }, 400);
      })
      .catch((error) => {
        setTimeout(() => {
          setVersionNumber(null), setVersionNumberLoading(false);
        }, 400);
      });
  };

  const renderAuthScreen = (): JSX.Element | null => {
    if (authScreen === "Login") {
      return (
        <LoginForm
          setAuthScreen={setAuthScreen}
          loading={loading}
          setLoading={setLoading}
          showToast={showToast}
          loginCredentials={loginCredentials}
          setLoginCredentials={setLoginCredentials}
        />
      );
    } else if (authScreen === "ForgotPassword") {
      return (
        <ForgotPassword
          setAuthScreen={setAuthScreen}
          setEmailToResetPassword={setEmailToResetPassword}
          setLoading={setLoading}
          loading={loading}
          showToast={showToast}
        />
      );
    } else if (
      authScreen === "OTPForm" ||
      authScreen === "OTPFormForForgotPassword"
    ) {
      //after forgot password
      return (
        <OTPForm
          OTPScreenType={OTPScreenType}
          emailToResetPassword={emailToResetPassword}
          forgotOtp={false}
          setAuthScreen={setAuthScreen}
          loading={loading}
          setLoading={setLoading}
          showToast={showToast}
          resendOTPForLogin={resendOTPForLogin}
          handleOTPForLogin={handleOTPForLogin}
          authScreen={authScreen}
        />
      );
    } else if (authScreen === "ResetPassword") {
      return (
        <ResetPassword
          emailToResetPassword={emailToResetPassword}
          loading={loading}
          authScreen={authScreen}
          setAuthScreen={setAuthScreen}
          showToast={showToast}
          setLoading={setLoading}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            { transform: [{ translateY: slideVal }] },
          ]}
        >
          <Image source={Logo} style={styles.image} />
          {authScreen === "Login" &&
            (versionNumberLoading ? (
              <LoadingSpinner height={30} color={ColorPalette.white} />
            ) : (
              <Text style={styles.versionTextStyle}>
                Version - {versionNumber}
              </Text>
            ))}
        </Animated.View>
        <View
          style={[
            styles.formContainer,
            {
              flex: authScreen === "ResetPassword" ? 2 : 1.2,
            },
          ]}
        >
          {renderAuthScreen()}
        </View>
        <Toast
          visible={toastVisible}
          message={toastMessage}
          status={toastStatus}
          onRightButtonPress={onRightButtonPress}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003366",
  },
  logoContainer: {
    flex: 1.8,
    justifyContent: "center",
    alignItems: "center",
    gap: scale(30),
  },
  formContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop: scale(40),
    paddingHorizontal: scale(20),
  },
  image: {
    width: scale(230),
    height: scale(108),
  },
  versionTextStyle: {
    ...textStyle(),
    color: ColorPalette.white,
    fontSize: scale(16),
    height: scale(30),
  },
});
