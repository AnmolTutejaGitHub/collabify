import { Link, useNavigate } from "react-router";
import NavBarSecondary from "../NavBar/NavBarSecondary";
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';

function Signup({toggleMode,userPreference}) {

   const [username,setUsername] = useState("");
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [confirm_password,setConfirmPassword] = useState("");

   const navigate = useNavigate();

   async function signup(){
    const id = toast.loading("Creating your account...");
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/signup`,{
            email : email,
            password : password,
            confirm_password : confirm_password,
            name : username
        })

        const data = response.data;
        console.log(data);
        localStorage.setItem('token',data.token);
        toast.success("Signup successful!");
        navigate("/verify");

    }catch(err){
        console.log(err);
        toast.error(err.response?.data?.message || err.response.data.error || err.response?.data || "some error occurred");
    }finally{
        toast.dismiss(id);
    }
   }

  return (
    <div className="flex h-screen">
        <div className="absolute top-0 right-0 w-1/2 max-lg:hidden">
            <NavBarSecondary toggleMode={toggleMode} userPreference={userPreference} />
        </div>
      <div className="w-1/2 flex items-center justify-center bg-[#F8F9FB] max-lg:w-full">
        <fieldset className="rounded-xl w-[24rem] h-[34rem] p-8 shadow-xl bg-white border border-gray-200">
          <legend className="text-2xl font-bold text-[#F75904]/60 mb-6">Sign Up</legend>

          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input 
            type="text" 
            className="input input-bordered w-full mt-1 rounded-lg bg-gray-100 text-black" 
            placeholder="Enter your name" 
            onChange={(e)=>setUsername(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-600 mt-4">Email</label>
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

          <label className="block text-sm font-medium text-gray-600 mt-4">Confirm Password</label>
          <input 
            type="password" 
            className="input input-bordered w-full mt-1 rounded-lg bg-gray-100 text-black" 
            placeholder="Confirm your password" 
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />

          <button className="btn mt-6 w-full bg-[#F75904]/60 hover:bg-[#F75904]/70 text-white rounded-lg text-lg font-semibold"
          onClick={signup} >
            Sign Up
          </button>

          <div className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-[#F75904]/60 hover:text-[#F75904]/80 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </fieldset>
      </div>

      <div
        className={`w-1/2 flex items-center justify-center bg-top bg-no-repeat transition-colors duration-300 ${
            userPreference.lightmode ? "bg-white text-black" : "bg-black text-white"
          } max-lg:hidden`}
        style={{ backgroundImage: "url('/circle.png')" }}
      >
        <img
          src="/illustration-Azuc-YCm.svg"
          className="max-h-[60%] object-contain drop-shadow-xl animate-float"
        />
      </div>
    </div>
  );
}

export default Signup;