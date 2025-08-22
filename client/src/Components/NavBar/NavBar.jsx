import { MdOutlineLightMode } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link} from "react-router";
import useUserStore from "../../store/userStore";

function NavBar({ toggleMode }) {
  const {username,isAuthenticated,clearUser } = useUserStore();

  function logout(){
    clearUser();
  }

  return (
    <div className="p-6 bg-transparent flex justify-between items-center">
      <div className="flex gap-4 items-center text-xl">
        <FaGithub />
        <Link to="https://github.com/AnmolTutejaGitHub/collabify">GitHub</Link>
      </div>

      <div className="flex gap-6 items-center text-lg">
        <Link to="/">Home</Link>
        <Link to="/start">Start</Link>
        <a href="#company">Company & Community</a>
        <Link to="/pricing">Pricing</Link>
        <div className="flex gap-2 items-center">
          <Link to="https://www.npmjs.com/package/yjs">Docs</Link>
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex gap-4 items-center text-xl">
        <div onClick={() => toggleMode()}>
          <MdOutlineLightMode />
        </div>

        {isAuthenticated ? (
          <>
            <Link to="/profile">{username}</Link>
            <div onClick={logout}>Logout</div>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Get Started</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;