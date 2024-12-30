'use client'
import { useState, useRef, useEffect } from "react"
import ApiBlock from "./apiBlock"
import Sidebar from "@/components/sidebar"
import CreateTrigger from "./createTrigger"
import TriggerBlock from "./triggerBlock"


interface apiNodeType {
    method: string;
    url: string;
    name: string;
    successAPI: string | null;
    failureAPI: string | null;
}

interface triggerNodeType {
    name: string,
    webhookURL: string,
    samplePayload: string,
    type: string,
    payload: string,
    linkedAPI: string | null
}

export default function Canvas() {

    const [apiNodes, setApiNodes] = useState<apiNodeType[]>([]);
    const [triggerNode, setTriggerNode] = useState<triggerNodeType | null>();
    const [canvasSize, setCanvasSize] = useState({height: 0, width: 0});
    const [triggerCreated, setTriggerCreated] = useState(false);
    
    const canvasRef = useRef(null);
    const createApiBlock = (values : apiNodeType) => {
        localStorage.setItem('apiNodes', JSON.stringify([...apiNodes, values]));
        setApiNodes((prev) => [...prev, values]);
    };


    const createTriggerBlock= (values: triggerNodeType) => {
        localStorage.setItem('triggerNode', JSON.stringify(values));
        setTriggerNode(values);
    }

    useEffect(()=> {
        setCanvasSize({
            // @ts-expect-error after render
            height: canvasRef.current?.clientHeight,
            // @ts-expect-error after render
            width: canvasRef.current?.clientWidth
        })
    }, []);

    return (
        <div 
            id="canvas" 
            className="w-[100vw] h-[90vh] m-0 bg-gray-200 relative"
            ref = {canvasRef}
        >
            <aside className="ml-4">
                <CreateTrigger create={createTriggerBlock} isCreated={triggerCreated} setIsCreated={(e) => setTriggerCreated(e)}/>
            </aside>
            <nav className="absolute top-[20vh] right-10">
                <Sidebar onClick={createApiBlock}/>
            </nav>
            {
                triggerNode && <TriggerBlock triggerValues={triggerNode} onDelete={() => {setTriggerNode(null); setTriggerCreated(false) }} canvasSize={canvasSize} />
            }
            {
            apiNodes.map((node,i)=>
               <ApiBlock key={i} canvasSize={canvasSize} values={node} />
            )
            }
        </div>
    )
}