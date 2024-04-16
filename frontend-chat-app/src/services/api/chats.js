import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getAllChats = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("get all chats called");

    const { data } = await axiosInstance.get(
      "/api/chats/get-all-chats",
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const accessRegularChat = async ({ token, receiverId }) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("access regular called", { token, receiverId });

    const { data } = await axiosInstance.post(
      "/api/chats",
      { receiverId },
      config
    );
    console.log("access regular returned", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRegularChat = async ({ token, receiverId }) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("get regular called", { token, receiverId });

    const { data } = await axiosInstance.get(
      "/api/chats",
      { receiverId },
      config
    );
    console.log("get regular returned", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createGroupChat = async ({ users, chatName, token }) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axiosInstance.post(
      "/api/chats/create-group-chat",
      { users, chatName },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateGroupAvatar = async ({ formData, token, chatId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axiosInstance.patch(
      `/api/chats/update-group-avatar/${chatId}`,
      formData,
      config
    );

    return data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    console.log(error);
  }
};
