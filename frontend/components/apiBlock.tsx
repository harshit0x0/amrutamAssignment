'use client'
import { useState, useRef } from "react"
import { CilentApiType } from "../../types/types";

//  type posType = {
//         succBtnPos: {x: number, y: number}, 
//         failBtnPos: {x: number, y: number}, 
//         parBtnPos: {x: number, y: number}
//     }; 

export default function ApiBlock({idx, canvasSize, values} : 
    {idx: number ,canvasSize: {height: number, width: number }, values: CilentApiType}) {
    
    //if object is already in local storage
    const cachedData = localStorage.getItem(`blockPos-${values._id}`);
    let cachedPos = null;
    if(cachedData) {
        cachedPos = JSON.parse(cachedData);
    }

    const [cursorPos, setCursorPos] = useState({x:0, y: 0});
    const [selected, setSelected] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({
                                x: cachedPos?.x ?? values.pos?.x,
                                y: cachedPos?.y ?? values.pos?.y
                            });

    const successRef = useRef<HTMLButtonElement>(null);
    const failureRef = useRef<HTMLButtonElement>(null);
    const parentRef = useRef<HTMLButtonElement>(null);
                        
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

        // const newPos : posType = {
        //     succBtnPos: {
        //         x: successRef.current?.getBoundingClientRect().left ?? -1,
        //         y: successRef.current?.getBoundingClientRect().top ?? -1
        //     },
        //     failBtnPos: {
        //         x: failureRef.current?.getBoundingClientRect().left ?? -1,
        //         y: failureRef.current?.getBoundingClientRect().top ?? -1
        //     },  
        //     parBtnPos: {
        //         x: parentRef.current?.getBoundingClientRect().left ?? -1,
        //         y: parentRef.current?.getBoundingClientRect().top ?? -1
        //     }               
        // };
        localStorage.setItem(`blockPos-${values._id}`, JSON.stringify({x: pos.x, y: pos.y}));
        setCursorPos({x: e.clientX, y: e.clientY});
    }

    const handleDelete = async() => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${values._id}`, {method: "DELETE"});
        if(!res.ok){
            alert('Failed to delete api block');
            return;
        }
        ref.current?.remove();
        const data = await res.json();
        localStorage.removeItem(`blockPos-${values._id}`);
        localStorage.removeItem(`pos-${values._id}`);
        console.log("deleted api: ", idx,  data);
    }

    return (
        <div 
            className="absolute z-10"
            onMouseDown={(e) => {setSelected(true); setCursorPos({x: e.clientX, y: e.clientY})}}
            onMouseLeave={() => {setSelected(false) }}
            onMouseUp={() => {setSelected(false)}}
            onMouseMove={handleMove}
            ref = {ref}
            style={{userSelect: "none", left: pos.x, top: pos.y}}
        >
            <div className="w-[30vw] lg:w-[12vw] overflow-hidden relative p-6 pb-16 space-y-4 z-10 flex flex-col w-fit bg-white border border-4 rounded-lg border-violet-400 absolute">
                <div className="absolute space-y-2 flex flex-col top-1 left-1">
                    <button 
                        className="w-4 h-4 rounded-full border border-1 bg-violet-200"
                        onClick={(e) => {console.log(e.clientX, e.clientY)}}
                        ref = {parentRef}
                    ></button>
                </div>
                <h3 className="font-bold bg-white px-3 py-2">REST API</h3>
                <div className="text-xs bg-green-200 text-green-500 px-3 py-1 rounded">{values.method}</div>
                <p className="text-xs italic text-wrap"> {values.url}</p>

                <div className="absolute flex flex-col bottom-1 right-1">
                    <div className="flex justify-between">
                        <label className="text-xs" htmlFor="successBtn">success</label>
                        <button 
                            id="successBtn" 
                            ref={successRef}
                            className="w-3 h-3 m-auto mx-1 rounded-full border border-1 bg-violet-300"
                            onClick={(e) => {console.log(e.clientX, e.clientY)}}
                        ></button>
                    </div>
                    <div className="flex justify-between">
                        <label className="text-xs" htmlFor="failureBtn">failure</label>
                        <button 
                            id="failureBtn" 
                            className="w-3 h-3 m-auto mx-1 rounded-full border border-1 bg-violet-300"
                            onClick={(e) => {console.log(e.clientX, e.clientY);}}
                            ref={failureRef}
                        ></button>
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
