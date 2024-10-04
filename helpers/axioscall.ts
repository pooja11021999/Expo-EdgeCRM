import axios, { CancelToken } from "axios";

// Define the interface for request options
interface RequestOptions {
  url: string;
  params?: Record<string, any>;
  cancelToken?: CancelToken;
  data?: any;
  type?: "POST" | "PUT";
}

// GET request
const get = ({ url, params, cancelToken }: RequestOptions) => {
  return axios({
    method: "GET",
    url,
    params,
    cancelToken,
  });
};

// POST/PUT request
const post = ({ url, params, cancelToken, data, type }: RequestOptions) => {
  return axios({
    method: type === "PUT" ? "PUT" : "POST",
    url,
    params,
    data,
    cancelToken,
  });
};

// Multipart POST/PUT request
const multiPartPost = ({
  url,
  params,
  cancelToken,
  data,
  type,
}: RequestOptions) => {
  return axios({
    method: type === "PUT" ? "PUT" : "POST",
    url,
    params,
    data,
    cancelToken,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// PUT request
const put = ({ url, params, cancelToken, data }: RequestOptions) => {
  return axios({
    method: "PUT",
    url,
    params,
    data,
    cancelToken,
  });
};

// DELETE request
const deletereq = ({ url, params, cancelToken, data }: RequestOptions) => {
  return axios({
    method: "DELETE",
    url,
    params,
    data,
    cancelToken,
  });
};

export { deletereq, get, multiPartPost, post, put };
