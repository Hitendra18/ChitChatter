import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  signInUser,
  signUpUser,
  updateUser,
  updateUserAvatar,
} from "../api/users";
import { useSelector } from "react-redux";
import { setUserInfo } from "../../store/userSlice";

export const useSignUpUser = (executeOnSuccess) => {
  return useMutation({
    mutationFn: (data) => {
      return signUpUser(data);
    },
    onSuccess: (data) => {
      if (data) {
        executeOnSuccess(data);
        toast.success("Successfully registered");
      }
    },
  });
};

export const useSignInUser = (executeOnSuccess) => {
  return useMutation({
    mutationFn: (data) => {
      return signInUser(data);
    },
    onSuccess: (data) => {
      console.log("Success Sign In user");
      console.log("data", data);
      if (data) {
        executeOnSuccess(data);
        toast.success("Successfully logged in");
      }
    },
  });
};

export const useUpdateUser = (dispatch = undefined) => {
  const { userInfo: user } = useSelector((state) => state.user);

  return useMutation({
    mutationFn: ({ changedData, token }) => {
      return updateUser({ changedData, token });
    },
    onSuccess: (data) => {
      if (data && dispatch) {
        const prevTheme = user?.darkTheme;
        const prevToken = user?.token;

        const newData = data;
        newData.darkTheme = prevTheme;
        newData.token = prevToken;
        console.log("newData", newData);

        dispatch(setUserInfo(newData));
        localStorage.removeItem("account");
        localStorage.setItem("account", JSON.stringify(newData));

        toast.success("Successfully updated profile");
      }
    },
  });
};

export const useUpdateUserAvatar = (dispatch) => {
  const { userInfo: user } = useSelector((state) => state.user);

  return useMutation({
    mutationFn: ({ formData, token }) => {
      return updateUserAvatar({ formData, token });
    },
    onSuccess: (data) => {
      console.log("data", data);
      if (data) {
        const prevTheme = user?.darkTheme;
        const prevToken = user?.token;

        const newData = data;
        newData.darkTheme = prevTheme;
        newData.token = prevToken;

        dispatch(setUserInfo(newData));
        localStorage.removeItem("account");
        localStorage.setItem("account", JSON.stringify(newData));

        toast.success("Successfully updated avatar");
      }
    },
  });
};
