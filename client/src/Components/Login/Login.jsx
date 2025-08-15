import {Link} from "react-router";
import NavBarSecondary from "../NavBar/NavBarSecondary";
function Login({toggleMode,userPreference}) {
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
            />
  
            <label className="block text-sm font-medium text-gray-600 mt-4">Password</label>
            <input 
              type="password" 
              className="input input-bordered w-full mt-1 rounded-lg bg-gray-100 text-black" 
              placeholder="Enter your password" 
            />
  
            <div className="text-right mt-2">
              <Link to="/signup"  className="text-sm text-[#F75904]/60 hover:text-[#F75904]/80 hover:underline font-medium">Forgot Password?</Link>
            </div>
  
            <button className="btn mt-6 w-full bg-[#F75904]/60 hover:bg-[#F75904]/70 text-white rounded-lg text-lg font-semibold">
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