'use client'
import { useState } from "react";
import Image from "next/image";


interface apiNodeType {
    method: string;
    url: string;
    name: string;
    successAPI: string | null;
    failureAPI: string | null;
}

export default function Sidebar({onClick}: {onClick: (e: apiNodeType) => void}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDialogOpen(false);
        const newApi: apiNodeType = {
            // @ts-expect-error formdata  
            method: e.target.apiMethod.value,
            // @ts-expect-error formdata  
            url: e.target.apiUrl.value,
            // @ts-expect-error formdata  
            name: e.target.apiName.value,
            successAPI: null,
            failureAPI: null    
            // successAPI: e.target.successAPI.value,
            // failureAPI: e.target.failureAPI.value
        }
        onClick(newApi);
    }


    return (
        <div className="flex z-30 relative space-y-2 flex-col min-w-[5vw] rounded h-[50vh] bg-violet-200 border border-3 border-violet-400">
            <button 
                className="bg-white relative px-2 py-2 rounded mx-auto my-auto hover:bg-violet-600 hover:text-violet-100"
                onClick={()=>setIsDialogOpen(!isDialogOpen)}
            >
                <Image src="add-circle.svg" alt="" width={20} height={20} className="w-8 h-8 m-auto" />
                <label htmlFor="" className="text-xs font-semibold"> REST API </label>
            </button>
            {
                isDialogOpen &&
               <section className="z-10  right-400 px-4 py-2 bg-gradient-to-r from-violet-300 to-gray-300 w-fit mt-2 rounded-lg">
                    <form action="" className="" onSubmit={handleSubmit}>
                        <h2 className="text-lg mt-4 font-semibold">REST API</h2>
                        <div className="space-y-4 bg-violet-400 px-4 py-4 w-fit rounded">
                            <div className="flex space-x-4">
                                <label htmlFor="apiName">Name</label>
                                <input className="px-2 py-1" id="apiName" placeholder=""/>
                            </div>
                            
                            <div className="flex space-x-4">
                                <label htmlFor="apiMethod">Method</label>
                                <select className="px-2 py-1" id="apiMethod" >
                                    <option value="GET"> GET </option>    
                                    <option value="POST"> POST </option>    
                                    <option value="PUT"> PUT </option>    
                                    <option value="PATCH"> PATCH </option>    
                                    <option value="DELETE"> DELETE </option>    
                                </select>
                            </div>
                            
                            <div className="flex space-x-4">
                                <label htmlFor="apiUrl">URL</label>
                                < input className="rounded px-2 py-1" type="text" id="apiUrl" placeholder=""/>
                            </div>
                        </div>
                        <button className="px-4 mt-3 py-2 bg-violet-600 text-white rounded font-semibold"> Create </button>
                    </form>
                </section>
            }
            
        </div>
    );
}