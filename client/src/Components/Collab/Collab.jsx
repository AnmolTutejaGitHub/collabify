import { useParams } from "react-router";
import Editor from "@monaco-editor/react";
import useUserStore from "../../store/userStore";
import * as Y from "yjs"
import { WebsocketProvider } from "y-websocket"
import { MonacoBinding } from "y-monaco"
import { useState, useRef } from 'react'

function Collab(){
    const { id } = useParams();
    const {username, userid} = useUserStore();
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        const doc = new Y.Doc(); 
        console.log(id);
        
        const provider = new WebsocketProvider('ws://localhost:1234', `${id}`, doc);
        
        const type = doc.getText("monaco");
        const binding = new MonacoBinding(
            type,
            editorRef.current.getModel(),
            new Set([editorRef.current]),
            provider.awareness
        );
        
        console.log(provider.awareness);                
    }

    return(
        <div className="h-screen w-full">
            <Editor
                height="100%"
                theme="vs-dark"
                onMount={handleEditorDidMount}
            />
        </div>
    )
}

export default Collab;