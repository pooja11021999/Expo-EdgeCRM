import { useState } from "react";

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastStatus, setToastStatus] = useState<"success" | "fail">("success");
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const showToast = (
    message: string,
    status: "success" | "fail",
    duration?: number
  ) => {
    setToastMessage(message);
    setToastStatus(status);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, duration || 3000);
  };

  const onRightButtonPress = () => {
    setToastVisible(false);
  };

  return {
    toastMessage,
    toastStatus,
    toastVisible,
    showToast,
    onRightButtonPress,
  };
};
