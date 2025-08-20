import { useParams } from "react-router";
import Editor from "@monaco-editor/react";
import useUserStore from "../../store/userStore";
import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"
import { MonacoBinding } from "y-monaco";
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import axios from "axios";
import { FaPlay } from "react-icons/fa";


function Collab(){
    const { id } = useParams();
    const {username, userid} = useUserStore();
    const editorRef = useRef(null);
    const token = localStorage.getItem('token');

    const [language,setLanguage] = useState('javascript');
    const [judge0Output,setjudge0Output] = useState("");
    const [stdin,setStdin] = useState("");

    function handleEditorDidMount(editor,monaco) {
        editorRef.current = editor;
        const doc = new Y.Doc(); 
        
        const provider = new WebsocketProvider(`${import.meta.env.VITE_SOCKET_URL}`,`${id}`,doc);
        
        const type = doc.getText("monaco");
        const binding = new MonacoBinding(
            type,
            editorRef.current.getModel(),
            new Set([editorRef.current]),
            provider.awareness
        );
        
        const awareness = provider.awareness;
        awareness.on('change', changes => {
            console.log(Array.from(awareness.getStates().values()))
         })    


        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        awareness.setLocalStateField('user', {
            name: `${username}`,
            color: `${randomColor}`
        })      
        
    }

    async function compileAndRun(){
        const id = toast.loading("compiling....");
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/collab/run-code`,{
                  language: language,
                  source_code: editorRef.current.getValue(),
                  stdin : stdin
                },{headers: {Authorization: `Bearer ${token}`}}
              );
            
            setjudge0Output(response.data);
            toast.success("judge0 api call successful");
        }catch(err){
            console.log(err);
            toast.error(err.response?.data?.message || err.response?.data?.error || err.response?.data || "some error occurred");
        }finally{
            toast.dismiss(id);
        }
    }

    return(
        <div className="h-screen w-full flex flex-col bg-black">
            <div className="bg-gray-800 text-white flex justify-between items-center text-sm p-1 px-2">
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-700 text-white p-1 rounded">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="csharp">C#</option>
                    <option value="go">Go</option>
                    <option value="ruby">Ruby</option>
                    <option value="php">PHP</option>
                </select>
                <button className="cursor-pointer bg-gray-700 p-2" onClick={compileAndRun}>Compile & Run</button>
            </div>

        <div className="flex-1">
            <Editor
                height="100%"
                theme="vs-dark"
                onMount={handleEditorDidMount}
                language={language}
                options={{
                    fontSize: 15,
                }}
            />
        </div>

        <textarea
            className="bg-black text-white p-2 outline-none"
            placeholder="Enter input for your code..."
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
        />

        <div className="bg-black text-[#8A8989] p-2 h-50 overflow-y-auto">
            {judge0Output ? JSON.stringify(judge0Output,null,2) : "Compile output will appear here..."}
        </div>
        </div>
    )
}

export default Collab;