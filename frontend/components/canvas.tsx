'use client'
import { useState, useRef, useEffect } from "react"
import ApiBlock from "./apiBlock"
import Sidebar from "@/components/sidebar"
import CreateTrigger from "./createTrigger"
import TriggerBlock from "./triggerBlock"
import {JourneyType, TriggerType, ApiType} from '../../types/types'
// import Line from "./line";

// interface ConnectionType {
//     source: {x: number, y: number};
//     target: {x: number, y: number};
// }

export default function Canvas({journey}: {journey: JourneyType|null}) {

    const [apiNodes, setApiNodes] = useState<ApiType[]>();
    const [triggerNode, setTriggerNode] = useState<TriggerType | null>(journey?.triggerID ?? null);
    const [canvasSize, setCanvasSize] = useState({height: 0, width: 0});
    const [triggerCreated, setTriggerCreated] = useState(journey?.triggerID !== null ? true : false);
    // const [connections, setConnections] = useState<ConnectionType[]>([]);
    
    const canvasRef = useRef(null);
    const createApiBlock = async(values : ApiType) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/new`, {
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/trigger/new`, {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/journey/apis`);
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

    //fetch connections
    // useEffect(() => {
    //     apiNodes?.forEach((api) => {
    //         // console.log(api);
    //         const pos = localStorage.getItem(`pos-${api._id}`);
    //         const srcObj = pos ? JSON.parse(pos) : {x: 0, y: 0};
    //         if(api.successApiID){
    //             const pos = localStorage.getItem(`pos-${api.successApiID}`);
    //             if(pos === null) return;
    //             const posObj = JSON.parse(pos);
    //             const source = {x: srcObj.success.x, y: srcObj.success.y};
    //             const target = {x: posObj.parent.x, y: posObj.parent.y};
    //             setConnections((prev) => [...prev, {source: source, target: target}]);
    //         }
    //         if(api.failureApiID){
    //             const pos = localStorage.getItem(`pos-${api.failureApiID}`);
    //             if(pos === null) return;
    //             const posObj = JSON.parse(pos);
    //             // console.log("api: ", api._id, " pos: ", posObj);
    //             const source = {x: srcObj.failure.x, y: srcObj.failure.y};
    //             const target = {x: posObj.parent.x, y: posObj.parent.y};
    //             setConnections((prev) => [...prev, {source: source, target: target}]);

    //         }
    //     });
    //     // console.log("connections", connections);
    // }, [apiNodes]);


    //fetch trigger node
    useEffect(() => {
        async function fetchTrigger(){
            if(journey === null || journey?.triggerID === null) return;
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/trigger`);
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
                triggerNode && <TriggerBlock jID={journey?._id ?? ""} triggerValues={triggerNode} onDelete={() => {setTriggerNode(null); setTriggerCreated(false) }} canvasSize={canvasSize} />
            }
            {
            apiNodes?.map((node,i)=>
               <ApiBlock idx={i} key={i} canvasSize={canvasSize} values={node}/>
            )
            }
            {/* {
                connections?.map((connection, i) => 
                    <Line key={i} from={connection.source} to={connection.target} />
                )
            } */}
        </div>
    )
}