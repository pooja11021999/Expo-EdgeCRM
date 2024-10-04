import { API_URL } from "@/constants/Api";
import axios, { AxiosResponse } from "axios";

interface ForgotPasswordData {
  email: string;
}

interface OTPData {
  data: object;
  url: string;
}

const forgotPassword = (
  data: ForgotPasswordData,
  url: string
): Promise<AxiosResponse> => {
  return axios({
    method: "POST",
    url: `${API_URL}${url}`,
    params: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

const verifyOTP = (data: object, url: string): Promise<AxiosResponse> => {
  return axios({
    method: "POST",
    url: `${API_URL}${url}`,
    params: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export { forgotPassword, verifyOTP };
