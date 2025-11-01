import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { UserContext } from "../utils/userContext";

const ConnectWalletButton = () => {
  const { user, updateUser } = useContext(UserContext);

  const [signer, setSigner] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is required to connect to Ethereum!");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
      const address = await signer.getAddress();
      setUserAddress(address);
      updateUser({ type:user.type, address: address });
      console.log("Connected with address:", address);
      navigate("/user-select");
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        className="w-1/3 px-10 py-6 
      text-white font-semibold 
      bg-amber-500 rounded-lg 
      hover:bg-amber-600 
      transition duration-150 text-2xl cursor-pointer"
        onClick={connectWallet}
      >
        Connect to Wallet
      </button>
    </div>
  );
}

export default ConnectWalletButton