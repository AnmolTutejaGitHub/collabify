import NavBar from "../NavBar/NavBar";
import axios from "axios";
import toast from 'react-hot-toast';
import {useState} from "react";
import {ClipboardText,CheckCircle} from "phosphor-react";
import { IoIosInformationCircleOutline } from "react-icons/io";



function Start({toggleMode,userPreference}) {
  const [url,setUrl] = useState("");
  const token = localStorage.getItem("token");
  const [copiedUrl,setCopiedUrl] = useState(false);
  const [history,setHistory] = useState(null);
  const [pageNo,setPageNo] = useState(0);
  const PAGE_ITEM_LIMIT = 10;
  async function generate(){
    const id = toast.loading("generating...");
    setCopiedUrl(false);
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

  function copyUrlToClipboard(){
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false),2000);
      })
      .catch(err => console.error(err));
  }

  async function handlePaging(){
    try{

    }catch(err){

    }finally{}
  }

  async function nextClicked(){
    try{

    }catch(err){

    }finally{}
  }

  async function prevClicked(){
    try{

    }catch(err){

    }finally{}
  }

  return (
    <div className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08] text-white'} bg-cover bg-top lg:h-[100vh] lg:w-[100vw] bg-none xl:bg-[url('/circle.png')] lg:bg-top`}
    >
      <NavBar toggleMode={toggleMode}/>
      <div className="relative flex items-center justify-center flex-1 p-6 gap-20 max-lg:flex-col">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create a Collab Session
          </h1>
          <img
             src="/illustration-Azuc-YCm.svg"
              className="max-h-[60%] object-contain drop-shadow-xl animate-float"
                />
          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              placeholder="Your session link will appear here..."
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              readOnly
              value={url}
            />
            <button
              className={`p-2 rounded-lg ${
                copiedUrl
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
              onClick={copyUrlToClipboard}
            >
            <>
            {!copiedUrl ?
                <ClipboardText size={20} className="text-white" />
             :
                <CheckCircle size={20} className="text-white" />
            }
            </>
            </button>
          </div>

          <button
            className="w-full py-3 rounded-lg bg-[#F75904]/80 hover:bg-[#F75904]/90 text-white text-lg font-semibold transition"
            onClick={generate}
          >
            Create
          </button>
        </div>
        <div className="bg-white/10 backdrop-blur-lg h-180 w-200 max-md:w-140 rounded-2xl shadow-2xl p-6 flex flex-col flex-grow m-4">
            <div className="text-2xl font-bold flex justify-center">History</div>
            <div className="flex-1">
            {!history ? (
            <div className="fixed inset-0 flex items-center justify-center text-2xl text-gray-500">
                <div className="flex items-center gap-2">
                    <IoIosInformationCircleOutline className="h-6 w-6 font-bold" />
                <div>User has no history</div>
            </div>
        </div>
        ) : null}
    </div>
        {
        history &&  <div className="flex justify-center item-center gap-3">
            <button className="bg-white/10 backdrop-blur-lg p-2 rounded-md w-20 cursor-pointer">prev</button>
            <button className="bg-white/10 backdrop-blur-lg p-2 rounded-md w-20 cursor-pointer">Next</button>
        </div>
        }
        </div>
      </div>
    </div>
  );
}

export default Start;


