import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetUserInfo, toggleUserTheme } from "../store/userSlice";
import { toast } from "react-toastify";
import { images } from "../constants";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import HoverDropdown from "./HoverDropdown";
import { useUpdateUser } from "../services/mutations/users";

const GeneralTopBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo: user } = useSelector((state) => state.user);

  const toggleTheme = () => {
    dispatch(toggleUserTheme());
    const fromLS = JSON.parse(localStorage.getItem("account"));
    fromLS.darkTheme = !fromLS.darkTheme;
    localStorage.removeItem("account");
    localStorage.setItem("account", JSON.stringify(fromLS));
  };

  const { mutate: updateUserMutate } = useUpdateUser();

  const dropdownList = [
    {
      title: "Go to chats",
      onClick: () => {
        navigate("/chats");
      },
    },
    {
      title: "Log out",
      onClick: () => {
        console.log("log out");
        updateUserMutate({
          changedData: { darkTheme: user?.darkTheme },
          token: user?.token,
        });
        dispatch(resetUserInfo());
        localStorage.removeItem("account");
        navigate("/");
        toast.success("You are logged out!");
      },
    },
  ];

  return (
    <div
      className={`flex flex-col px-2 py-2 md:px-4 md:py-4 lg:px-6 lg:py-0 border-b gap-3 md:gap-5 ${
        user?.darkTheme ? "border-b-[#9B9B9B]" : "border-b-[#DCDCDC]"
      }`}
    >
      <div className="flex justify-between items-center mx-2">
        <Link to={"/chats"} className="shrink-0">
          <img src={images.Logo} alt="logo" className="h-6 md:h-8 lg:h-6" />
        </Link>
        <div className="flex items-center gap-1 md:gap-4 lg:gap-1 shrink-0 text-primaryBlue">
          <button
            onClick={toggleTheme}
            className={`w-12 h-12 md:w-16 md:h-16 lg:w-12 lg:h-12 rounded-full p-2 ${
              user?.darkTheme ? "hover:bg-[#202C3A]" : "hover:bg-[#E8F3FF]"
            }`}
          >
            {user?.darkTheme ? (
              <IoSunnyOutline className="w-full h-full" />
            ) : (
              <IoMoonOutline className="w-full h-full" />
            )}
          </button>
          <HoverDropdown dropdownList={dropdownList}>
            <img
              src={
                user?.avatar
                  ? user?.avatar
                  : images.defaultAvatar
              }
              alt="profile"
              className="h-12 w-12 p-2 md:h-16 md:w-16 lg:h-14 lg:w-14 object-cover rounded-full"
            />
          </HoverDropdown>
        </div>
      </div>
    </div>
  );
};
export default GeneralTopBar;
