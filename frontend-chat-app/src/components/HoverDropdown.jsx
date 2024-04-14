import { useState } from "react";
import { useSelector } from "react-redux";

const HoverDropdown = ({ dropdownList, children }) => {
  const { userInfo: user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  return (
    <div className={`flex justify-center`}>
      <div onMouseLeave={() => setOpen(false)} className="relative">
        <button
          onMouseOver={() => setOpen(true)}
          className="flex items-center p-2 rounded-md"
        >
          {children}
        </button>

        <ul
          className={`absolute right-0 w-max py-2 border rounded-lg shadow-xl ${
            user?.darkTheme
              ? "bg-[#1A1B1B] border-[#9B9B9B]"
              : "bg-white border-[#DCDCDC]"
          } ${open ? "block" : "hidden"}`}
        >
          {/* Map over dropdownList */}
          {dropdownList &&
            dropdownList.length > 0 &&
            dropdownList.map((item) => {
              return (
                <li
                  key={item?.title}
                  className={`flex w-full items-center px-3 py-2 text-sm md:text-xl lg:text-sm ${
                    user?.darkTheme
                      ? "text-[#DCDCDC] hover:bg-[#363737] active:bg-[#202D3B]"
                      : "text-[#636362] hover:bg-[#F2F2F2] active:bg-[#E8F3FF]"
                  }`}
                >
                  <button onClick={item?.onClick} className="w-full text-start">
                    {item?.title}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default HoverDropdown;
