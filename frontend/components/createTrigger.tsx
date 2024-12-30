'use client'
import { useState } from "react";


interface triggerNodeType {
    name: string,
    webhookURL: string,
    samplePayload: string,
    type: string,
    payload: string,
    linkedAPI: string | null
}

export default function CreateTrigger ({create, isCreated, setIsCreated} : {create: (e:triggerNodeType)=>void, isCreated: boolean, setIsCreated: (e:boolean)=> void} ) {
    // const [isCreated, setIsCreated] = useState(false);
    const [isDialogOpen ,setIsDialogOpen] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setIsCreated(true);
        setIsDialogOpen(false);
        const trig: triggerNodeType = {
            name: "Trigger",
            // @ts-expect-error formdata  
            webhookURL: e.target.webHookUrl.value,
            // @ts-expect-error formdata  
            samplePayload: e.target.samplePayload.value,
            // @ts-expect-error formdata  
            type: e.target.type.value,
            // @ts-expect-error formdata  
            payload: e.target.payload.value,
            linkedAPI: null
        }
        console.log("trig: ", trig);
        create(trig);
    }

    return (
        <div className="w-2/6" >
            {!isCreated && 
                <button 
                    className="text-white mx-2 bg-violet-300  mt-4 mx-auto bg-violet-500 px-6 py-3"
                    onClick={()=> setIsDialogOpen(!isDialogOpen)}
                > Create trigger</button> 
            }
            { isDialogOpen && 
                <section className="z-30 px-4 py-2 bg-gradient-to-r from-violet-300 to-gray-300 w-fit mt-2 rounded-lg">
                    <form action="" className="" onSubmit={handleSubmit}>
                        <h2 className="text-lg mt-4 font-semibold">Webhook</h2>
                        <div className="space-y-4 bg-violet-400 px-4 py-4 w-fit rounded">
                            <div className="fle space-x-4">
                                <label htmlFor="webHookUrl">URL</label>
                                < input className="rounded px-2 py-1" type="text" name="webHookUrl" id="webHookUrl" placeholder=""/>
                            </div>
                            <div className="flex space-x-4">
                                <label htmlFor="samplePayload">sample payload</label>
                                <textarea rows={3} name="samplePayload" className="px-2 py-1" id="samplePayload" placeholder=""/>
                            </div>
                        </div>
                        <h2 className="text-lg mt-6 font-semibold">Webhook Type</h2>
                        <div className="space-y-4 bg-violet-400 px-4 py-4 w-fit rounded">
                            <div className="flex space-x-4">
                                <label htmlFor="type">Type</label>
                                <select id="type" name="type">
                                    <option value="Phone"> Phone </option>
                                    <option value="Email"> Email </option>
                                    <option value="Other"> Other </option>
                                </select>
                            </div>
                            <div className="flex space-x-4">
                                <label htmlFor="value">value</label>
                                <input name="payload" className="rounded px-2 py-1" type="text" id="value" placeholder=""/>
                            </div>
                        </div>
                        <button className="px-4 mt-3 py-2 bg-violet-600 text-white rounded font-semibold"> Create </button>
                    </form>
                </section>
            }
        </div>
    )
}