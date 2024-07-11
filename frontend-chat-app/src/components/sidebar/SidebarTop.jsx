import { useSelector, useDispatch } from "react-redux";
import images from "../../constants/images";
import {
  IoMoonOutline,
  IoSearchOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { resetUserInfo, toggleUserTheme } from "../../store/userSlice";
import { useChatState } from "../../contexts/useChatState";
import HoverDropdown from "../HoverDropdown";
import { toast } from "react-toastify";
import { useUpdateUser } from "../../services/mutations/users";

const SidebarTop = () => {
  const { userInfo: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    showSearchBar,
    setShowSearchBar,
    searchInput,
    setSearchInput,
    setShowCreateGroup,
  } = useChatState();
  // const [searchInput, setSearchInput] = useState("");

  const handleSearchUsers = (e) => {
    if (e.target.value.trim() === "") {
      setSearchInput("");
      return;
    }
    setSearchInput(e.target.value);
  };

  const toggleTheme = () => {
    dispatch(toggleUserTheme());
    const fromLS = JSON.parse(localStorage.getItem("account"));
    fromLS.darkTheme = !fromLS.darkTheme;
    localStorage.removeItem("account");
    localStorage.setItem("account", JSON.stringify(fromLS));
  };

  const toggleSearchBarVisibility = () => {
    setShowSearchBar(!showSearchBar);
  };

  const { mutate: updateUserMutate } = useUpdateUser();

  const dropdownList = [
    {
      title: "View profile",
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      title: "Create new group",
      onClick: () => {
        setShowCreateGroup(true);
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
      className={`flex flex-col px-2 py-2 md:px-4 md:py-4 lg:px-2 lg:py-0 border-b gap-3 md:gap-5 lg:gap-3 ${
        user?.darkTheme ? "border-b-[#9B9B9B]" : "border-b-[#DCDCDC]"
      }`}
    >
      <div className="flex justify-between items-center mx-2">
        <Link to={"/chats"} className="shrink-0">
          <img
            src={images.LogoIcon}
            alt="logo"
            className="h-8 md:h-10 lg:h-8"
          />
        </Link>
        <div className="flex items-center gap-1 md:gap-4 lg:gap-1 shrink-0 text-primaryBlue">
          <button
            onClick={toggleSearchBarVisibility}
            className={`w-12 h-12 md:w-16 md:h-16 lg:w-12 lg:h-12  rounded-full p-2 ${
              user?.darkTheme ? "hover:bg-[#202C3A]" : "hover:bg-[#E8F3FF]"
            }`}
          >
            <IoSearchOutline className="w-full h-full" />
          </button>
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

      {showSearchBar && (
        <div
          className={`w-full flex rounded-2xl mb-2 md:mb-0 lg:mb-3 overflow-hidden items-stretch ${
            user?.darkTheme
              ? "bg-[#363737] text-[#DCDCDC]"
              : "bg-[#F2F2F2] text-[#626262]"
          }`}
        >
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchUsers}
            name=""
            id=""
            placeholder="Search people..."
            className="text-xl w-full pl-4 py-3 md:pl-6 md:py-4 lg:py-3 outline-none bg-transparent"
          />
          <div className="flex items-center px-4 text-[#9B9B9B]">
            <IoSearchOutline className="h-8 w-8 md:h-10 md:w-10 lg:h-8 lg:w-8" />
          </div>
        </div>
      )}
    </div>
  );
};
export default SidebarTop;
