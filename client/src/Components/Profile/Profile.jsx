import useUserStore from "../../store/userStore";
import axios from "axios";
import {useState,useEffect} from "react";

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
        }catch(err){
            console.log(err);
        }finally{

        }
    }

    return(<div className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08] text-white'} h-[100vh] w-[100vw] bg-cover bg-top`}
    style={{ backgroundImage: "url('circle.png')" }}>
        {/* <div className="flex">
            <div className="h-full bg-white p-2 text-black flex flex-col items-center p-4 rounded-md">
                <img src={`https://ui-avatars.com/api/?name=${username}`} className="rounded-full h-[80px]" />
                <div>{userDetails?.name}</div>
                <div>{userDetails?.userid}</div>
                <div>{userDetails?.email}</div>
            </div>
            <div></div>
        </div> */}
    </div>)
}

export default Profile;