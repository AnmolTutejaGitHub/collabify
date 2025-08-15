import NavBar from "../NavBar/NavBar";
import { FaGithub } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";

function Home({toggleMode,userPreference}){
    
    return (
       <section className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08]'} h-[100vh] w-[100vw] bg-cover bg-top`}
       style={{ backgroundImage: "url('circle.png')" }}
       >
            <NavBar toggleMode={toggleMode}/>

            <div className="flex mt-10 w-full">
                <div className="w-1/2 ml-20">
                    <div className="mt-50 flex gap-10">
                        <div className="p-2 bg-[#F75904]/60 text-[#F75904] px-4 rounded-md">Build With Js</div>
                        <div  className="p-2 bg-[#238DFE]/60 text-[#238DFE] px-4 rounded-md flex items-center gap-2">
                            <FaGithub />
                            <div>Open Source</div>
                            </div>
                        <div  className="p-2 bg-[#1DD81A]/60 text-[#1DD81A] px-4 rounded-md flex items-center gap-2">
                            <CiPlay1 />
                            <div>Watch Demo</div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="text-7xl font-bold">Code Collaboration Platform</div>
                        <div className="mt-5 text-xl">Collaborate with others and code together in real time.</div>
                    </div>
                </div>
                <div className="w-1/2 flex justify-end m-10 mr-20">
                    <img src="/code.jpg" className="h-[80vh]"></img>
                </div>
            </div>
       </section>
    )
}
export default Home;