import { useSelector } from "react-redux";
import { images } from "../../constants";
import { useCreateGroupStates } from "../../contexts/useCreateGroupStates";

const CreateGroupUserTile = ({ userData }) => {
  const { userInfo: user } = useSelector((state) => state.user);
  const { setSelectedUsers } = useCreateGroupStates();

  const addToSelectedUsers = () => {
    setSelectedUsers((prev) => [...prev, userData]);
  };

  return (
    <button
      onClick={addToSelectedUsers}
      className={`flex items-center w-full gap-4 px-4 py-1 hover:cursor-pointer transition-colors duration-100 ${
        user?.darkTheme ? "hover:bg-[#363737]" : "hover:bg-[#F2F2F2]"
      }`}
    >
      <img
        src={
          userData?.avatar
            ? userData?.avatar
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
    </button>
  );
};
export default CreateGroupUserTile;
