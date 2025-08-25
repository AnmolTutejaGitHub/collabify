import { Link } from "react-router";
import NavBarSecondary from "../NavBar/NavBarSecondary";
import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

function GetVerified({ toggleMode, userPreference }) {
  const [email,setEmail] = useState("");
  const token = localStorage.getItem("token");

  async function sendVerfificationEmail(){
    const id = toast.loading("sending verfication mail");
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/generate-Verification-Token`,
            {email},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
    toast.success("check your inbox");
    }catch(err){
        toast.error(err.response?.data?.message || err.response?.data?.error || "error sending mail");
    }finally{
        toast.dismiss(id);
    }
  }
  return (
    <div className="relative flex h-screen">

      <div className="w-1/2 flex items-center justify-center bg-[#F8F9FB] max-lg:w-full">
        <fieldset className="rounded-xl w-[24rem] h-[22rem] p-8 shadow-xl bg-white border border-gray-200">
          <legend className="text-2xl font-bold text-[#F75904]/60 mb-6">
            Get Verified
          </legend>

          <p className="text-sm text-gray-500 mb-4">
            Enter your email to get verified.
          </p>

          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            className="input input-bordered w-full mt-1 rounded-lg bg-gray-100 text-black"
            placeholder="Enter your email"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <button className="btn mt-6 w-full bg-[#F75904]/60 hover:bg-[#F75904]/70 text-white rounded-lg text-lg font-semibold"
          onClick={sendVerfificationEmail}>
            Send Verification Token
          </button>

          <div className="text-sm text-gray-500 mt-6 text-center">
            Already verified?{" "}
            <Link
              to="/login"
              className="text-[#F75904]/60 hover:text-[#F75904]/80 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </fieldset>
      </div>

    
      <div className="absolute top-0 right-0 w-1/2 z-10 max-lg:hidden">
        <NavBarSecondary toggleMode={toggleMode} userPreference={userPreference} />
      </div>
      <div
        className={`w-1/2 flex items-center justify-center bg-top ${
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

export default GetVerified;