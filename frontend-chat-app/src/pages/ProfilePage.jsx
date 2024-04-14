import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { images } from "../constants";
import { useForm } from "react-hook-form";
import {
  useUpdateUser,
  useUpdateUserAvatar,
} from "../services/mutations/users";
import { toast } from "react-toastify";
import GeneralTopBar from "../components/GeneralTopBar";

const ProfilePage = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/sign-up");
      return;
    }
    document.title = "ChitChatter | " + user?.name;
  }, [user, navigate]);

  const { mutate: updateUserMutate } = useUpdateUser(dispatch);
  const { mutate: updateUserAvatarMutate } = useUpdateUserAvatar(dispatch);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const handleFileChange = (e) => {
    console.log("handle file change called");
    const file = e.target.files[0];
    if (file && file.size && file.size > 1 * 1024 * 1024) {
      toast.error("Max file size should be 1MB");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);
    const token = user?.token;
    updateUserAvatarMutate({ formData, token });
  };

  const deletePhoto = () => {
    const formData = new FormData();
    formData.append("profilePicture", null);
    const token = user?.token;

    updateUserAvatarMutate({ formData, token });
  };

  const onSubmit = (data) => {
    console.log("form submitted");
    const changedData = {};

    for (const field in dirtyFields) {
      changedData[field] = data[field];
    }
    const token = user?.token;
    console.log("token to send", token);
    updateUserMutate({ changedData, token });

    setEditMode(false);
  };

  return (
    <div className="">
      {/* Top Navbar */}
      <GeneralTopBar />

      {/* Body */}
      <div
        className={`flex flex-col lg:flex-row lg:justify-center gap-4 md:gap-10 lg:gap-20 items-center mt-5 md:mt-10 lg:mt-20`}
      >
        {/* Profile Pic  */}
        <div className="shrink-0">
          <label htmlFor="profilePicture" className="cursor-pointer">
            <img
              src={
                user?.avatar
                  ? import.meta.env.VITE_UPLOAD_FOLDER_URL + user?.avatar
                  : images.defaultAvatar
              }
              className="rounded-full h-60 w-60 lg:h-64 lg:w-64 object-cover hover:brightness-50 transition-all duration-300"
              alt=""
            />
          </label>
          <input
            type="file"
            id="profilePicture"
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`text-xl md:text-2xl w-full px-4 flex flex-col gap-4 lg:gap-10 lg:w-auto ${
            user?.darkTheme ? "text-[#C7C7C7]" : "text-[#363636]"
          }`}
        >
          {/* Form Fields */}
          <div className="w-full flex flex-col gap-3 md:gap-5">
            {/* Name */}
            <div className="flex flex-col md:flex-row md:gap-5 md:items-center w-full">
              <label
                className="w-[100px] md:w-[150px] font-semibold"
                htmlFor="name"
              >
                Name
              </label>
              {editMode ? (
                <div className="flex flex-col">
                  <input
                    className={`w-full outline-none px-2 py-2 rounded-lg ${
                      user?.darkTheme
                        ? "bg-[#363737] text-[#DCDCDC]"
                        : "bg-[#F2F2F2] text-[#626262]"
                    }`}
                    type="text"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                    id="name"
                    defaultValue={user?.name}
                  />
                  {errors.name?.message && (
                    <p className="text-xs text-red-600">
                      {errors.name?.message}
                    </p>
                  )}
                </div>
              ) : (
                <p className="">{user?.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col md:flex-row md:gap-5 md:items-center w-full">
              <label
                className="w-[100px] md:w-[150px] font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              {editMode ? (
                <div className="">
                  <input
                    className={`w-full outline-none px-2 py-2 rounded-lg ${
                      user?.darkTheme
                        ? "bg-[#363737] text-[#DCDCDC]"
                        : "bg-[#F2F2F2] text-[#626262]"
                    }`}
                    type="email"
                    {...register("email", {
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Enter a valid email",
                      },
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                    })}
                    id="email"
                    defaultValue={user?.email}
                  />
                  {errors.email?.message && (
                    <p className="text-xs text-red-600">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
              ) : (
                <p className="">{user?.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col md:flex-row md:gap-5 md:items-center w-full">
              <label
                className="w-[100px] md:w-[150px] font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              {editMode ? (
                <div className="">
                  <input
                    className={`w-full outline-none px-2 py-2 rounded-lg ${
                      user?.darkTheme
                        ? "bg-[#363737] text-[#DCDCDC]"
                        : "bg-[#F2F2F2] text-[#626262]"
                    }`}
                    type="password"
                    {...register("password", {
                      minLength: {
                        value: isDirty ? 6 : 0,
                        message: "Password length must be at least 8 character",
                      },
                    })}
                    id="password"
                  />
                  {errors.password?.message && (
                    <p className="text-xs text-red-600">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
              ) : (
                <p className="">******</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="text-sm md:text-base flex gap-4">
            {user?.avatar && (
              <button
                onClick={deletePhoto}
                className="outline-none text-red-600"
                type="button"
              >
                Delete Photo
              </button>
            )}
            {editMode && (
              <button
                className="outline-none disabled:opacity-[40%] disabled:cursor-not-allowed"
                type="submit"
                disabled={!isDirty}
              >
                Update Profile
              </button>
            )}
            {editMode ? (
              <button
                onClick={() => setEditMode(!editMode)}
                className="outline-none"
                type="button"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setEditMode(!editMode)}
                className="outline-none"
                type="button"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProfilePage;
