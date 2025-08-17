import NavBar from "../NavBar/NavBar";
import axios from "axios";
import toast from 'react-hot-toast';
import {useState} from "react";

function Start({toggleMode,userPreference}) {
  const [url,setUrl] = useState("");
  const token = localStorage.getItem("token");
  async function generate(){
    const id = toast.loading("generating...");
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/collab/create`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        setUrl(response.data);
        toast.success(`${response.data} generated`);
    }catch(err){
        console.log(err);
        toast.error(err.response?.data?.message || err.response?.data?.error || "some error occurred");
    }finally{
        toast.dismiss(id);
    }
  }
  return (
    <div className={`h-[100vh] w-[100vw] flex flex-col ${
        userPreference.lightmode ? "bg-white text-black" : "bg-black text-white"}`}
    style={{ backgroundImage: "url('circle.png')" }}>
      <NavBar toggleMode={toggleMode}/>
      <div className="flex items-center justify-center h-full w-full">
        <div className="bg-[#F8F9FB] p-6 rounded-2xl shadow-lg w-100">
            <div>
                {/* <div>
                <img
                    src="/illustration-Azuc-YCm.svg"
                    className="max-h-[60%] object-contain drop-shadow-xl animate-float"
                />
                </div> */}
                <div>
                    <input type="text" placeholder="Synchronised Coding Environment URL" 
                     className="input input-bordered w-full mt-1 rounded-lg bg-gray-200 text-black" readOnly 
                     value={url}/>

                </div>
                <button className="btn mt-6 w-full bg-[#F75904]/60 hover:bg-[#F75904]/70 text-white rounded-lg text-lg font-semibold"
                onClick={generate}>
                    Generate
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Start;