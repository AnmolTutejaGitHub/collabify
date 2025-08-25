import useUserStore from "../../store/userStore";
import axios from "axios";
import {useState,useEffect} from "react";
import NavBar from "../NavBar/NavBar";
import { AiFillEdit } from "react-icons/ai";
import toast from 'react-hot-toast';

function Profile({toggleMode,userPreference }) { 
    const {username,userid,isLoading,setUser,clearUser,fetchData} = useUserStore();
    const [userDetails,setUserDetails] = useState(null);
    const [edit,setEdit] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(()=>{
        getUserDetails();
    },[])

    async function onSave(){
        const id = toast.loading("updating user info....");
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/user/updateUser`,
                {
                  name: userDetails.name,
                  email: userDetails.email,
                  phone: userDetails.phone,
                  bio: userDetails.bio,
                  gender: userDetails.gender,
                  lastname: userDetails.lastname
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                }
              );
            const data = response.data;
            toast.success('thanks for this data bro...');
        }catch(err){
            toast.error(err.response?.data?.message || err.response?.data?.error || err.response?.data || "some error occurred");
        }finally{
            toast.dismiss(id);
        }
    }

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

    return(<div className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08] text-white'} min-h-screen w-full bg-cover bg-top`}
    style={{ backgroundImage: "url('circle.png')" }}>
        <NavBar toggleMode={toggleMode}/>
        <div className="px-4 md:px-8 lg:px-20">
            <div className="py-8 text-center font-bold text-3xl md:text-4xl border-b border-gray-200">
                Welcome, {userDetails?.name}
            </div>
        <div className="relative bg-[#1F2937] mt-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col gap-8 p-6 md:p-12">
            <button className="absolute top-4 right-4 flex items-center gap-1 text-white bg-[#111827] px-3 py-1 rounded-lg hover:bg-[#0f172a] transition"
                onClick={() => setEdit(true)}>
                    <AiFillEdit className="text-lg cursor-pointer" />
            </button>

            <div className="font-semibold text-xl md:text-2xl">Personal Information</div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userDetails?.name)}&backgroundColor=ffffff&textColor=000000`}
                className="rounded-full w-16 h-16 md:w-20 md:h-20"
            />
            <div className="flex flex-col gap-1">
            <div className="font-bold text-lg md:text-xl">{userDetails?.name}</div>
            <div className="text-gray-400">{userDetails?.userid}</div>
         </div>
     </div>

     <div className="flex flex-col gap-6">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div>
           <div className="font-semibold">First Name</div>
           <input
             className={`text-gray-400 w-full bg-transparent focus:outline-none
               ${edit ? "border-b border-gray-400" : "border-b-0"}`}
             value={userDetails?.name}
             onChange={(e) => edit && setUserDetails({ ...userDetails, name: e.target.value })}
             readOnly={!edit}
           />
         </div>
         <div>
           <div className="font-semibold">Last Name</div>
           <input
             className={`text-gray-400 w-full bg-transparent focus:outline-none
               ${edit ? "border-b border-gray-400" : "border-b-0"}`}
             value={userDetails?.lastname}
             onChange={(e) => edit && setUserDetails({ ...userDetails, lastname: e.target.value })}
             readOnly={!edit}
           />
         </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div>
           <div className="font-semibold">Email</div>
           <input
             className={`text-gray-400 w-full bg-transparent focus:outline-none
               ${edit ? "border-b border-gray-400" : "border-b-0"}`}
             value={userDetails?.email}
             onChange={(e) => edit && setUserDetails({ ...userDetails, email: e.target.value })}
             readOnly={!edit}
           />
         </div>
         <div>
           <div className="font-semibold">Phone</div>
           <input
             className={`text-gray-400 w-full bg-transparent focus:outline-none
               ${edit ? "border-b border-gray-400" : "border-b-0"}`}
             value={userDetails?.phone}
             onChange={(e) => edit && setUserDetails({ ...userDetails, phone: e.target.value })}
             readOnly={!edit}
           />
         </div>
       </div>


       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         <div>
           <div className="font-semibold">Gender</div>
           <input
             className={`text-gray-400 w-full bg-transparent focus:outline-none
               ${edit ? "border-b border-gray-400" : "border-b-0"}`}
             value={userDetails?.gender}
             onChange={(e) => edit && setUserDetails({ ...userDetails, gender: e.target.value })}
             readOnly={!edit}
           />
         </div>
         <div>
           <div className="font-semibold">Bio</div>
           <input
             className={`text-gray-400 w-full bg-transparent focus:outline-none
               ${edit ? "border-b border-gray-400" : "border-b-0"}`}
             value={userDetails?.bio}
             onChange={(e) => edit && setUserDetails({ ...userDetails, bio: e.target.value })}
             readOnly={!edit}
           />
         </div>
       </div>

       <div className="flex justify-center">
         <button className="bg-white/10 backdrop-blur-lg text-white px-6 py-2 rounded-lg hover:bg-white/20 transition"
                 onClick={onSave}>
           Save
         </button>
       </div>
     </div>
   </div>
 </div>
</div>)
}

export default Profile;