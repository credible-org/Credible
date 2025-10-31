import { useContext } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../utils/themeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed left-0 top-0 w-full bg-white h-20 px-4 flex items-center justify-end">
      <div
        className="border rounded-full p-2 text-xl cursor-pointer hover:scale-110"
        onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <FiMoon /> : <FiSun />}
        {console.log(theme)}
      </div>
    </div>
  );
};

export default Header;
