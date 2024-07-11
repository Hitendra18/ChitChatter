import { images } from "../constants";

const IncomingCallToast = ({
  name,
  avatar,
  email,
  groupChatName,
  onJoin,
  onReject,
}) => {
  return (
    <div>
      <div className="flex items-center">
        <img
          src={
            avatar
              ? avatar
              : images.defaultAvatar
          }
          alt="User"
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="ml-4">
          <div className="text-lg font-semibold">
            {groupChatName ? name + " in " + groupChatName : name}
          </div>
          <div className="text-gray-500">{email}</div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={onJoin}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2"
        >
          Join
        </button>
        <button
          onClick={onReject}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
};
export default IncomingCallToast;
