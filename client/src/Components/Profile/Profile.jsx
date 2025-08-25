import useUserStore from "../../store/userStore";
import axios from "axios";
import {useState,useEffect} from "react";
import NavBar from "../NavBar/NavBar";

function Profile({toggleMode,userPreference }) { 
    const {username,userid,isLoading,setUser,clearUser,fetchData} = useUserStore();
    const [userDetails,setUserDetails] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(()=>{
        getUserDetails();
    },[])

    async function getUserDetails(){
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/user-details`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = response.data;
            setUserDetails(data);
            console.log(data);
        }catch(err){
            console.log(err);
        }finally{

        }
    }

    return(<div className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08] text-white'} h-[100vh] w-[100vw] bg-cover bg-top`}
    style={{ backgroundImage: "url('circle.png')" }}>
    <NavBar toggleMode={toggleMode}/>
    <div className="">
        <div className="p-8 flex justify-center iteams-center font-bold text-4xl border-b-1 border-gray-200">Welcome, {userDetails?.name}</div>
        <div className="bg-[#1F2937] p-2 m-20 mt-10 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl rounded-xl flex flex-col gap-12 p-20">
            <div className="font-semibold text-xl">Personal Information</div>
            <div className="flex gap-8">
                <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userDetails?.name)}&backgroundColor=ffffff&textColor=000000`}
                    className="rounded-full w-14 h-14"
                />
                <div className="flex gap-1 flex-col">
                    <div className="font-bold text-xl">{userDetails?.name}</div>
                    <div className="text-gray-400">{userDetails?.userid}</div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-y-96 justify-between p-4 w-200 max-sm:w-140 max-md:w-160">
                    <div>
                        <div className="font-semibold">First Name</div>
                        <div className="text-gray-400">{userDetails?.name}</div>
                    </div>
                    <div>
                        <div className="font-semibold">Last Name</div>
                        <div  className="text-gray-400">N/A</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-y-96 justify-between p-4 w-200 max-sm:w-140 max-md:w-160">
                    <div>
                        <div className="font-semibold">Email</div>
                        <div  className="text-gray-400">{userDetails?.email}</div>
                    </div>
                    <div>
                        <div className="font-semibold">Phone</div>
                        <div  className="text-gray-400">N/A</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-y-96 justify-between p-4 w-200 max-sm:w-140 max-md:w-160">
                    <div>
                        <div className="font-semibold">Gender</div>
                        <div  className="text-gray-400">N/A</div>
                    </div>
                    <div>
                        <div className="font-semibold">Bio</div>
                        <div  className="text-gray-400">N/A</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    </div>)
}

export default Profile;