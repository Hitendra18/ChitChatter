import { Link } from "react-router-dom";
import { images } from "../constants";
import { FiUserCheck } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSignInUser } from "../services/mutations/users";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../store/userSlice";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // user sign up mutation
  const { mutate } = useSignInUser((data) => {
    dispatch(setUserInfo(data));
    localStorage.setItem("account", JSON.stringify(data));
    navigate("/");
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const signInHandler = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center items-center gap-6">
          <div>
            <img src={images.Logo} className="w-48" />
          </div>
          <form
            onSubmit={handleSubmit(signInHandler)}
            className="flex flex-col items-center"
          >
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
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

                <p className="text-xs mt-2">
                  Do not have an account?{" "}
                  <Link className="text-primaryBlue font-bold" to={"/sign-up"}>
                    Sign Up
                  </Link>
                </p>

                <button
                  disabled={!isValid}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-indigo-500"
                >
                  <FiUserCheck className="text-xl" />
                  <span className="ml-3">Sign In</span>
                </button>
              </div>
            </div>
          </form>
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
export default SignInPage;
