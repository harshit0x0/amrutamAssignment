'use client'
import { useState, useRef } from "react"

interface triggerNodeType {
    name: string,
    webhookURL: string,
    samplePayload: string,
    type: string,
    payload: string,
    linkedAPI: string | null
}


export default function TriggerBlock({canvasSize, onDelete, triggerValues} : {canvasSize: {height: number, width: number}, onDelete: () => void, triggerValues: triggerNodeType}) {
    const [pos, setPos] = useState({x:100, y: 200});
    const [cursorPos, setCursorPos] = useState({x:0, y: 0});
    const [selected, setSelected] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!selected) return;
        let dx = e.clientX - cursorPos.x;
        let dy = e.clientY - cursorPos.y;
        setPos((prev)=> {
            // @ts-expect-error after render
            if(prev.x + dx > canvasSize.width - ref.current?.clientWidth || prev.x + dx < 0) dx = 0;
            // @ts-expect-error after render
            if(prev.y + dy > canvasSize.height - ref.current?.clientHeight || prev.y + dy < 0) dy = 0;
            return {
                x: prev.x+dx,
                y: prev.y+dy
            }
        });
        setCursorPos({x: e.clientX, y: e.clientY});
    }

    const handleDelete = () => {
        onDelete()
    }

    return (
        <div 
            className="absolute "
            onMouseDown={(e) => {setSelected(true); setCursorPos({x: e.clientX, y: e.clientY})}}
            onMouseLeave={() => {setSelected(false) }}
            onMouseUp={() => {setSelected(false)}}
            onMouseMove={handleMove}
            ref = {ref}
            style={{userSelect: "none", left: pos.x, top: pos.y}}
        >
            <div className="relative p-6 py-16 space-y-4 z-10 flex flex-col w-fit bg-violet-400 border border-4 rounded-lg border-violet-400 absolute">
                
                <h3 className="font-bold bg-white px-3 py-2">{triggerValues.name}</h3>
                <div className="text-xs">URL: {triggerValues.webhookURL}</div>
                {/* <div>Method: GET</div> */}

                <div className="absolute flex flex-col bottom-1 right-1">
                    <div className="flex">
                        <label className="text-xs" htmlFor="successBtn">start</label>
                        <button id="successBtn" className="w-3 h-3 m-auto mx-1 rounded-full border border-1 bg-violet-300"></button>
                    </div>
                </div>
                <button 
                    className="absolute bottom-1 left-1 mx-auto bg-red-200 text-red-500 px-2 py-1 rounded-sm"
                    onClick={handleDelete}
                >
                        Delete
                </button>
            </div>
        </div>
    )
}