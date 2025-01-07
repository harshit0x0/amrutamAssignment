import { RefObject } from "react";

export default function Header({name, journeyInput}: {name: string|null, journeyInput: RefObject<HTMLInputElement>}) {
    return (
        <header className="flex w-full px-4 z-20 py-6 justify-between items-center sticky top-0 bg-violet-200 border-b-1 border-gray-300 shadow-lg">
            <div className="flex space-x-4">
                <h1 className="text-3xl font-bold text-violet-500">API FLOW</h1>
                <form action="">
                    <input 
                        type="text" 
                        ref={journeyInput}
                        placeholder="Name of journey" 
                        className="px-3 py-2 my-auto border-2 border-gray-300" 
                        value={name ?? ""} 
                        onChange={(e) => {journeyInput.current.value = e.target.value}}
                    /> 
                </form>
            </div>
            <div className="flex space-x-4">
                <button className="px-4 py-2 rounded bg-violet-600 text-white hover:bg-violet-800">View Logs</button>
                <button className="px-4 py-2 rounded bg-violet-600 text-white hover:bg-violet-800">Save Journey</button>
            </div>
        </header>
    )
}