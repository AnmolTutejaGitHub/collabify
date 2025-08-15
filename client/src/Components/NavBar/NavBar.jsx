import { MdOutlineLightMode } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useNavigate,Link } from "react-router";

function NavBar({toggleMode}){
    const navigate = useNavigate();
    return (<div className="p-6 bg-transparent flex justify-between items-center">
        <div className="flex gap-4 items-center text-xl">
            <FaGithub />
            <div>GitHub</div>
        </div>
        <div className="flex gap-4 items-center text-xl absolute left-1/2 -translate-x-1/2">
            <div>Mission</div>
            <div>Company & Community</div>
            <div>Pricing</div>
            <div className="flex gap-2 items-center justify-center">
                <div>Docs</div>
                <ArrowTopRightOnSquareIcon className="w-6 h-6" />
            </div>
        </div>
        <div className="flex gap-4 items-center text-xl">
            <div onClick={()=>toggleMode()}><MdOutlineLightMode /></div>
            <Link to="/login">Log in</Link>
            <div>Get Started</div>
        </div>
    </div>)
}
export default NavBar;