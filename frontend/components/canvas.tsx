'use client'
import { useState, useRef, useEffect } from "react"
import ApiBlock from "./apiBlock"
import Sidebar from "@/components/sidebar"
import CreateTrigger from "./createTrigger"
import TriggerBlock from "./triggerBlock"
import {JourneyType, TriggerType, CilentApiType} from '../../types/types'


export default function Canvas({journey}: {journey: JourneyType|null}) {

    const [apiNodes, setApiNodes] = useState<CilentApiType[]>();
    const [triggerNode, setTriggerNode] = useState<TriggerType | null>(journey?.triggerID ?? null);
    const [canvasSize, setCanvasSize] = useState({height: 0, width: 0});
    const [triggerCreated, setTriggerCreated] = useState(journey?.triggerID !== null ? true : false);
    
    const canvasRef = useRef(null);

    const createApiBlock = async(values : CilentApiType) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/apis/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        if(!res.ok) {
            alert("cannot create api block: " + res.statusText);
            return;
        }
        const newBlock = await res.json();
        console.log('newAPiBlock', newBlock);
        if(apiNodes) localStorage.setItem('apiNodes', JSON.stringify([...apiNodes, newBlock]));
        // @ts-expect-error prev is correct now 
        if(apiNodes) setApiNodes((prev) => [...prev, newBlock]);
        else setApiNodes([values]);
    };

    const createTriggerBlock= async(values: TriggerType) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/triggers/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        if(!res.ok) {
            alert("cannot create trigger block: " + res.statusText);
            return;
        }
        console.log('newTriggerBlock', values);
        localStorage.setItem('triggerNode', JSON.stringify(values));
        setTriggerNode(values);
    }

    //fetch all apis related to the journey
    useEffect(() => {   
        async function fetchApis(){
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/journeys/apis`);
            if(!res.ok) {
                alert('Failed to fetch apis');
                return;
            }
            const data = await res.json();
            if(data) setApiNodes(data);
            // console.log("apiNodes", data);
        }
        fetchApis();
    }, []);

    //fetch trigger node
    useEffect(() => {
        async function fetchTrigger(){
            if(journey === null || journey?.triggerID === null) return;
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/triggers`);
            if(!res.ok) {
                // alert('Failed to fetch trigger');
                setTriggerCreated(false);
                setTriggerNode(null);
                return;
            }
            const data = await res.json();
            if(data) setTriggerNode(data);
            // console.log("triggerNode", data);
        }
        fetchTrigger();
    }, [journey]);

    //set canvas size
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
                triggerNode && 
                <TriggerBlock jID={journey?._id ?? ""} triggerValues={triggerNode} onDelete={() => {setTriggerNode(null); setTriggerCreated(false) }} canvasSize={canvasSize} />
            }
            {
            apiNodes?.map((node,i)=>
               <ApiBlock idx={i} key={i} canvasSize={canvasSize} values={node}/>
            )
            }
            
        </div>
    )
}


// import Line from "./line"

// interface ConnectionType {
//     source: {x: number, y: number};
//     target: {x: number, y: number};
// }


//     const connections : ConnectionType[] | undefined  = apiNodes?.map((apiNode) => {
//     // console.log("apiNode", apiNode);
//     const connectionsForApiNode: ConnectionType[] = [];

//     if(apiNode.successApiID) {
//         const source = apiNode.succPos;

//         //@ts-expect-error because apiNode is unpopulated 
//         const target = apiNodes.find((api) => api._id === apiNode.successApiID as string)?.parPos;
//         if(source && target) connectionsForApiNode.push({source, target});
//         // console.log("source", source, "target", target);
//     }
//     if(apiNode.failureApiID) {
//         const source = apiNode.failPos;
//         //@ts-expect-error because apiNode is unpopulated 
//         const target = apiNodes.find((api) => api._id === apiNode.failureApiID as string)?.parPos;
//         if(source && target) connectionsForApiNode.push({source, target});
//         // console.log("source", source, "target", target);
//     }

//     return connectionsForApiNode;
// }).flat();

// type posType = {
//     succBtnPos: {x: number, y: number}, 
//     failBtnPos: {x: number, y: number}, 
//     parBtnPos: {x: number, y: number}
// }; 




    // function updateApiPos(id: string, pos: posType) {
    //     const apiNode = apiNodes?.find((api) => api._id === id);
    //     if(!apiNode) return;
    //     apiNode.succPos = pos.succBtnPos;
    //     apiNode.failPos = pos.failBtnPos; 
    //     apiNode.parPos = pos.parBtnPos;

    //     setApiNodes((prev) => {
    //         const prevApis = prev?.filter((api) => api._id !== id);
    //         if(!prevApis) return prev;
    //         return [...prevApis, apiNode];
    //     })
    // }


{/* <Line from={{ x: 531, y: 554 }} to={{ x:868, y: 388 }} /> */}
            {/* {
                connections?.map((connection, i) => 
                    <Line key={i} from={connection.source} to={connection.target} />
                )
            } */}