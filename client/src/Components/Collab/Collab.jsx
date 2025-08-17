import { useParams } from "react-router";
import Editor from "@monaco-editor/react";
import useUserStore from "../../store/userStore";
import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"
import { MonacoBinding } from "y-monaco";
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import axios from "axios";

function Collab(){
    const { id } = useParams();
    const {username, userid} = useUserStore();
    const editorRef = useRef(null);
    const token = localStorage.getItem('token');

    const [language,setLanguage] = useState('javascript');
    const [judge0,setjudge0] = useState("");

    function handleEditorDidMount(editor,monaco) {
        editorRef.current = editor;
        const doc = new Y.Doc(); 
        console.log(id);
        
        const provider = new WebsocketProvider('ws://localhost:1234',`${id}`,doc);
        
        const type = doc.getText("monaco");
        const binding = new MonacoBinding(
            type,
            editorRef.current.getModel(),
            new Set([editorRef.current]),
            provider.awareness
        );
        
        console.log(provider.awareness);                
    }

    async function compileAndRun(){
        const id = toast.loading("compiling....");
        try{
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/collab/run-code`,{
                  language: language,
                  source_code: editorRef.current.getValue(),
                },{headers: {Authorization: `Bearer ${token}`}}
              );
            
            setjudge0(response.data);
            toast.success("judge0 api call successful");
        }catch(err){
            console.log(err);
            toast.error(err.response?.data?.message || err.response?.data?.error || "some error occurred");
        }finally{
            toast.dismiss(id);
        }
    }

    return(
        <div className="h-screen w-full flex flex-col">
            <div className="p-2 bg-gray-800 text-white flex justify-between items-center">
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-700 text-white p-1 rounded">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="csharp">C#</option>
                    <option value="go">Go</option>
                    <option value="ruby">Ruby</option>
                    <option value="php">PHP</option>
                </select>
                <button className="btn btn-soft" onClick={compileAndRun}>Run</button>
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

        <div className="bg-black text-white p-2 h-50 overflow-y-auto">
            {judge0 ? JSON.stringify(judge0,null,2) : "Compile output will appear here..."}
        </div>
        </div>
    )
}

export default Collab;