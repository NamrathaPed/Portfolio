// NavigationButtons.jsx
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiArrowLeftWideLine } from "react-icons/ri";

export const NavigationButtons = ({ type }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-5 left-10 right-7 flex justify-between text-[#00e5b0] z-50">
      {/* Back button (show if type is "back" or no type passed) */}
      {(type === "back" || !type) && (
        <RiArrowLeftWideLine
          size={32}
          className="cursor-pointer hover:text-[#00c49a]"
          onClick={() => navigate(-1)}
        />
      )}

      {/* Home button (show if type is "home" or no type passed) */}
      {(type === "home" || !type) && (
        <AiFillHome
          size={28}
          className="cursor-pointer hover:text-[#00c49a] ml-auto"
          onClick={() => navigate("/")}
        />
      )}
    </div>
  );
};
