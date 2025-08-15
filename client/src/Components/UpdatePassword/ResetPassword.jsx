import { useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import NavBarSecondary from "../NavBar/NavBarSecondary";

function ResetPassword({ toggleMode, userPreference }) {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleResetPassword() {
    const toastId = toast.loading("Updating your password...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/resetPassword/${token}`,{
        password :password, 
        confirm_password: confirmPassword 
        })
      toast.success(response.data?.message || "Password updated successfully!");
    } catch (err) {
        console.log(err);
      toast.error(err.response?.data?.error || err.response?.data?.message ||  err.response?.data || "Failed to update password");
    } finally {
      toast.dismiss(toastId);
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
          alt="Illustration"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-[#F8F9FB]">
        <fieldset className="rounded-xl w-[24rem] h-auto p-8 shadow-xl bg-white border border-gray-200">
          <legend className="text-2xl font-bold text-[#F75904]/60 mb-6">
            Reset Password
          </legend>

          <label className="block text-sm font-medium text-gray-600">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full mt-1 rounded-lg bg-gray-100 text-black"
            placeholder="Enter new password"
          />

          <label className="block text-sm font-medium text-gray-600 mt-4">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full mt-1 rounded-lg bg-gray-100 text-black"
            placeholder="Confirm new password"
          />

          <button
            onClick={handleResetPassword}
            className="btn mt-6 w-full bg-[#F75904]/60 hover:bg-[#F75904]/70 text-white rounded-lg text-lg font-semibold"
          >
            Update Password
          </button>

          <div className="text-sm text-gray-500 mt-6 text-center">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-[#F75904]/60 hover:text-[#F75904]/80 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default ResetPassword;