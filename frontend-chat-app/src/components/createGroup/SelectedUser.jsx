import { useSelector } from "react-redux";
import { images } from "../../constants";
import { IoTrashBinOutline } from "react-icons/io5";
import { useCreateGroupStates } from "../../contexts/useCreateGroupStates";

const SelectedUser = ({ userData }) => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { setSelectedUsers } = useCreateGroupStates();

  const removeUserFromList = () => {
    setSelectedUsers((prev) =>
      prev.filter((item) => item._id !== userData._id)
    );
  };

  return (
    <div
      onClick={() => {}}
      className={`flex items-center w-full gap-4 px-2 py-1 rounded-lg ${
        user?.darkTheme ? "bg-[#36373778]" : "bg-[#f2f2f2a8]"
      }`}
    >
      <img
        src={
          userData?.avatar
            ? import.meta.env.VITE_UPLOAD_FOLDER_URL + userData?.avatar
            : images.defaultAvatar
        }
        className="w-8 h-8 md:w-16 md:h-16 lg:w-14 lg:h-14 object-cover rounded-full shrink-0"
        alt=""
      />

      <div
        className={`flex flex-col md:gap-2 lg:gap-1 w-full overflow-hidden ${
          user?.darkTheme ? "text-[#DCDCDC]" : "text-[#636362]"
        }`}
      >
        <div className="font-medium md:text-2xl lg:text-xl text-start">
          {userData?.name}
        </div>
        <div className="w-full text-start text-sm md:text-xl lg:text-lg shrink text-nowrap truncate">
          {userData?.email}
        </div>
      </div>
      <button
        onClick={removeUserFromList}
        className={`rounded-md ${
          user?.darkTheme ? "hover:bg-[#b5737361]" : "hover:bg-[#fdb6b661]"
        } `}
      >
        <IoTrashBinOutline className="text-red-600 h-9 w-9 p-2" />
      </button>
    </div>
  );
};
export default SelectedUser;
