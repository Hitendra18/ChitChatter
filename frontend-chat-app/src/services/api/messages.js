import axios from "axios";
// import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getAllMessages = async ({ token, chatId }) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("get all messages called");

    const { data } = await axiosInstance.get(`/api/messages/${chatId}`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async ({ token, chatId, content }) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("send message called");

    const { data } = await axiosInstance.post(
      `/api/messages/${chatId}`,
      { content },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSeenBy = async ({ token, chatId }) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("request updateSeenBy sent with data", token, chatId);

    const { data } = await axiosInstance.patch(
      `/api/messages/${chatId}`,
      {},
      config
    );
    console.log("response updateSeenBy received", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
