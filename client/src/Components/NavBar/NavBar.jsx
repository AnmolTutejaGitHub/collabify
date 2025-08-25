import { MdOutlineLightMode } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { useState } from "react";
import useUserStore from "../../store/userStore";

function NavBar({ toggleMode }) {
  const { username, isAuthenticated, clearUser } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    clearUser();
    setMenuOpen(false);
  }

  return (
    <div className="p-4 bg-transparent">
      <div className="flex md:hidden justify-between items-center">
        <div className="flex gap-2 items-center text-xl">
          <FaGithub />
          <Link to="https://github.com/AnmolTutejaGitHub/collabify">GitHub</Link>
        </div>
        <div className="text-xl font-semibold">Collabify</div>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 rounded-lg shadow p-4 text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/start" onClick={() => setMenuOpen(false)}>Start</Link>
          <a href="#company" onClick={() => setMenuOpen(false)}>Company & Community</a>
          <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <div className="flex gap-2 items-center">
            <Link to="https://www.npmjs.com/package/yjs" onClick={() => setMenuOpen(false)}>Docs</Link>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </div>

          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>{username}</Link>
              <div onClick={logout} className="cursor-pointer">Logout</div>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </>
          )}

          <div
            onClick={() => {
              toggleMode();
              setMenuOpen(false);
            }}
            className="cursor-pointer flex items-center gap-2"
          >
            <MdOutlineLightMode />
          </div>
        </div>
      )}

      <div className="hidden md:flex justify-between items-center">
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
          <div onClick={() => toggleMode()} className="cursor-pointer">
            <MdOutlineLightMode />
          </div>

          {isAuthenticated ? (
            <>
              <Link to="/profile">{username}</Link>
              <div onClick={logout} className="cursor-pointer">Logout</div>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;