import { useParams ,useNavigate} from "react-router";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NavBarSecondary from "../NavBar/NavBarSecondary";

function VerifyYourAccount({ toggleMode, userPreference }) {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    const toastId = toast.loading("Verifying your account...");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/verify/${token}`,
      )
      toast.success(response?.data?.message || "Account verified!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || err.response?.data?.error || "Verification failed");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen">
      <div className="absolute top-0 left-0 w-1/2 max-lg:hidden">
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

      <div className="w-1/2 flex items-center justify-center bg-[#F8F9FB] max-lg:w-full">
        <fieldset className="rounded-xl w-[24rem] h-[22rem] p-8 shadow-xl bg-white border border-gray-200">
          <legend className="text-2xl font-bold text-[#F75904]/60 mb-6">
            Verify Your Account
          </legend>

          <p className="text-sm text-gray-500 mb-4">
            Click the button below to verify your account.
          </p>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="btn mt-6 w-full bg-[#F75904]/60 hover:bg-[#F75904]/70 text-white rounded-lg text-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </fieldset>
      </div>
    </div>
  );
}

export default VerifyYourAccount;