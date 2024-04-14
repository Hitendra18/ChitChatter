import { Link } from "react-router-dom";
import { images } from "../constants";
import { FiUserPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useSignUpUser } from "../services/mutations/users";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../store/userSlice";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // user sign up mutation
  const { mutate } = useSignUpUser((data) => {
    dispatch(setUserInfo(data));
    localStorage.setItem("account", JSON.stringify(data));
    navigate("/");
  });

  // Handling form submission
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  const signUpHandler = (data) => {
    delete data.confirmPassword;
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center items-center gap-6">
          <div>
            <img src={images.Logo} className="w-48" />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
            <div className="w-full flex-1 mt-8">
              <form
                onSubmit={handleSubmit(signUpHandler)}
                className="mx-auto max-w-xs"
              >
                <input
                  className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Name"
                  {...register("name", {
                    minLength: {
                      value: 1,
                      message: "Name should be at least one character",
                    },
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                {errors.name?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {"* "}
                    {errors.name?.message}
                  </p>
                )}
                <input
                  className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Email"
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
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {"* "}
                    {errors.email?.message}
                  </p>
                )}
                <input
                  className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 character",
                    },
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
                {errors.password?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {"* "}
                    {errors.password?.message}
                  </p>
                )}
                <input
                  className="w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Please confirm your password",
                    },
                    validate: (value) => {
                      if (value !== password) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                />
                {errors.confirmPassword?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {"* "}
                    {errors.confirmPassword?.message}
                  </p>
                )}
                <p className="text-xs mt-2">
                  Already have an account?{" "}
                  <Link className="text-primaryBlue font-bold" to={"/sign-in"}>
                    Sign In
                  </Link>
                </p>

                <button
                  disabled={!isValid}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-indigo-500"
                >
                  <FiUserPlus className="text-xl" />
                  <span className="ml-3">Sign Up</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${images.backgroundIllustration})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
