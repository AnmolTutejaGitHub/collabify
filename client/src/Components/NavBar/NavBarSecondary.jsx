import { MdOutlineLightMode } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

function NavBarSecondary({ toggleMode, userPreference }) {
  return (
    <div
      className={`p-6 flex items-center justify-between w-full transition-colors duration-300 ${
        userPreference.lightmode ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="flex gap-2 items-center text-xl">
        <FaGithub />
        <span>GitHub</span>
      </div>

      <div className="flex gap-6 items-center text-lg">
        <Link to="/">Home</Link>
        <Link to="/start">Start</Link>
        <Link to="/company">Company & Community</Link>
        <Link to="/pricing">Pricing</Link>
        <div className="flex gap-2 items-center">
          <Link to="/docs">Docs</Link>
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <MdOutlineLightMode
          className="w-6 h-6 cursor-pointer"
          onClick={toggleMode}
        />
      </div>
    </div>
  );
}

export default NavBarSecondary;