import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const signUpUser = async ({ name, email, password }) => {
  try {
    const { data } = await axiosInstance.post("/api/users/sign-up", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    console.log(error);
  }
};

export const signInUser = async ({ email, password }) => {
  try {
    const { data } = await axiosInstance.post("/api/users/sign-in", {
      email,
      password,
    });
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    console.log(error);
  }
};

export const getUsers = async ({ token, searchKeyword }) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("get all users called");

    const { data } = await axiosInstance.get(
      `/api/users/get-all-users?search=${searchKeyword}`,
      config
    );
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    console.log(error);
  }
};

export const updateUser = async ({ changedData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    // console.log("data sending", userData, token);
    const { data } = await axiosInstance.patch(
      "/api/users/update-user",
      changedData,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserAvatar = async ({ formData, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axiosInstance.patch(
      "/api/users/update-avatar",
      formData,
      config
    );

    return data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    console.log(error);
  }
};
