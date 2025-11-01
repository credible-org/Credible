import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import { useNavigate } from "react-router-dom";

const CustomButton = ({ type }) => {

    const { user, updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleUserType = () => {
        console.log(type);
        updateUser({ ...user, type: type });
        
        if (type === "Holder") {
            navigate('/holder-dashboard');
        } else if (type === "Issuer") {
            navigate("/issuer-dashboard");
        } else if(type === "Verifier") {
            navigate("/verifier-dashboard");
        }
    }

  return (
    <div
      className="border rounded-[7px] mt-5 p-7 flex justify-center hover:text-xl cursor-pointer"
      onClick={handleUserType}
    >
      Continue as {type}
    </div>
  );
};

export default CustomButton;
