import NavBar from "../NavBar/NavBar";
import { FaGithub } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";
import useUserStore from "../../store/userStore";
import {Link} from "react-router";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import { useRef } from "react";
import Company from "../Company/Company";
import FrequentlyAsked from "../Home/FrequentlyAsked";
import Feature from "./Feature";

function Home({toggleMode,userPreference}){
    const {username,userid,isLoading,setUser,clearUser,fetchData } = useUserStore();

    if(isLoading) return <div>isLoading....</div>

    const editorRef = useRef(null);
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        const doc = new Y.Doc();
    
        const provider = new WebsocketProvider(
          `${import.meta.env.VITE_SOCKET_URL}`,
          "home-chat-room-531d33f9-652a-4110-85e5-054d955ed83c",
          doc
        );
    
        const type = doc.getText("monaco");
        new MonacoBinding(
          type,
          editorRef.current.getModel(),
          new Set([editorRef.current]),
          provider.awareness
        );
    
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    
        provider.awareness.setLocalStateField("user", {
          name: username || "Guest",
          color: randomColor,
        });
    }
    
    return (
       <section className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08] text-white'} bg-cover bg-top
        bg-none xl:bg-[url('/circle.png')] 
        lg:bg-contain lg:bg-no-repeat lg:bg-top`}>
            <NavBar toggleMode={toggleMode}/>

            <div className="flex mt-10 w-full">
                <div className="w-1/2 ml-20 sm:ml-2 max-lg:w-full">
                    <div className="md:mt-50 flex gap-10 max-lg:gap-6">
                        <div className="p-2 bg-[#F75904]/60 text-[#F75904] px-4 rounded-md whitespace-nowrap">Build With Js</div>
                        <div className="p-2 bg-[#238DFE]/60 text-[#238DFE] px-4 rounded-md flex items-center gap-2 whitespace-nowrap">
                            <FaGithub />
                            <Link to="https://github.com/AnmolTutejaGitHub/collabify">Open Source</Link>
                            </div>
                        <div  className="p-2 bg-[#1DD81A]/60 text-[#1DD81A] px-4 rounded-md flex items-center gap-2 whitespace-nowrap">
                            <CiPlay1 />
                            <div>Watch Demo</div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="text-7xl font-bold">Code Collaboration Platform</div>
                        <div className="mt-5 text-xl">Collaborate with others and code together in real time.</div>
                        {/* <button className="mt-5 text-xl bg-[#008FB5]/60 text-[#008FB5] px-4 p-2 rounded-md">Start</button> */}
                    </div>
                </div>
                <div className="w-1/2 flex justify-end m-10 mr-20 max-lg:hidden">
                    <img src="/code.jpg" className="h-[80vh]"></img>
                </div>
            </div>
        <div className="py-10 px-20 mt-10">
            <div className="flex gap-4 max-lg:flex-col justify-center items-center">
            <div className="mb-5 flex-1 mt-20 flex gap-2 flex-col items-center bg-white/10 backdrop-blur-lg p-4 rounded-md h-70 w-75 max-lg:w-100 justify-between">
                <div className="text-3xl font-bold text-orange-600"> Code With Others</div>
                <div className="text-xl space-y-2 mt-4">
                    <p>This editor is persistent across all the users</p>
                    <p>to give experience of the product</p>
                </div>
                <Link to="/start" className="p-2 bg-[#F75904]/50 text-[#F75904] px-4 rounded-md flex items-center gap-2 cursor-pointer">
                    Get Started
                </Link>
            </div>
            <div className="h-[60vh] w-full border rounded-md shadow-lg overflow-hidden flex-2">
            <Editor
            height="100%"
            width="100%"
            theme="vs-dark" 
            onMount={handleEditorDidMount}
            language={null}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              lineNumbers: "on",
            }}
            />
            </div>
            </div>
        </div>

        {/* <div className="mt-20 p-4">
            <div className="flex items-center justify-center text-5xl font-bold">Features for<span className="ml-2 text-orange-600">Collabify</span></div>
            <Feature/>
        </div> */}

        <div>
            <Company toggleMode={toggleMode} userPreference={userPreference}/>
            <div>
                <FrequentlyAsked/>
            </div>
            {/* <div className="h-100"></div> */}
        </div>
       </section>
    )
}
export default Home;