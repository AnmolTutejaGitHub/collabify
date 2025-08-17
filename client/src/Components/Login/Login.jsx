import {Link,useNavigate} from "react-router";
import NavBarSecondary from "../NavBar/NavBarSecondary";
import { useState,useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import useUserStore from "../../store/userStore";

function Login({toggleMode,userPreference}) {
    const navigate = useNavigate();
    const {isAuthenticated,setUser} = useUserStore();

    useEffect(() => {
        if (isAuthenticated) {
          navigate("/");
        }
      },[isAuthenticated]);

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function login(){
        const id = toast.loading("trying to login...");
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`,{
                email : email,
                password : password,
            })
            console.log(response.data);
            toast.success("login successfull");
            const {token , username,user_id} = response.data;
            setUser(username,user_id);
            localStorage.setItem("token",token);
        }catch(err){
            console.log(err);
            toast.error(err.response?.data?.message || err.response?.data?.error || "some error occurred");
        }finally{
            toast.dismiss(id);
        }
    }
    return (
      <div className="relative flex h-screen">
        <div className="absolute top-0 left-0 w-1/2">
            <NavBarSecondary toggleMode={toggleMode} userPreference={userPreference} />
        </div>

        <div
            className={`w-1/2 flex items-center justify-center bg-top ${
                userPreference.lightmode ? "bg-white text-black" : "bg-black text-white"
              }`}
            style={{ backgroundImage: "url('/circle.png')" }}
        >
        <img
         src="/illustration-Azuc-YCm.svg"
        className="max-h-[60%] object-contain drop-shadow-xl animate-float"
        />
        </div>
  
        <div className="w-1/2 flex items-center justify-center bg-[#F8F9FB]">
          <fieldset className="rounded-xl w-[24rem] h-[30rem] p-8 shadow-xl bg-white border border-gray-200">
            <legend className="text-2xl font-bold text-[#F75904]/60 mb-6">Login</legend>
  

            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input 
              type="email" 
              className="input input-bordered w-full mt-1 rounded-lg bg-gray-100 text-black" 
              placeholder="Enter your email" 
              onChange={(e)=>setEmail(e.target.value)}
            />
  
            <label className="block text-sm font-medium text-gray-600 mt-4">Password</label>
            <input 
              type="password" 
              className="input input-bordered w-full mt-1 rounded-lg bg-gray-100 text-black" 
              placeholder="Enter your password" 
              onChange={(e)=>setPassword(e.target.value)}
            />
  
            <div className="text-right mt-2">
              <Link to="/forget-password"  className="text-sm text-[#F75904]/60 hover:text-[#F75904]/80 hover:underline font-medium">Forgot Password?</Link>
            </div>
  
            <button className="btn mt-6 w-full bg-[#F75904]/60 hover:bg-[#F75904]/70 text-white rounded-lg text-lg font-semibold"
                onClick={login}>
              Login
            </button>
  
            <div className="text-sm text-gray-500 mt-6 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#F75904]/60 hover:text-[#F75904]/80 font-semibold hover:underline">Sign up</Link>
            </div>
          </fieldset>
        </div>
      </div>
    )
  }
  
  export default Login;