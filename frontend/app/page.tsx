'use client';
import Canvas from "@/components/canvas"
import { useEffect, useRef, useState } from "react";
import Header from "@/components/header"
import { JourneyType } from "../../types/types";

export default function Main() {

    const [journey, setJourney] = useState<JourneyType | null>(null);
    const journeyInput = useRef<HTMLInputElement>(null);

      //fetch journey
    useEffect(()=>{
        async function fetchJourney(){
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/journeys`);
            const data = await res.json();
            if(data) setJourney(data);
            localStorage.setItem('journey', JSON.stringify(data));
        }
        fetchJourney();
    }, [])

  return (
    <>
      {/* @ts-expect-error Ref will take value later on */}
      <Header name={journey?.name ?? null} journeyInput={journeyInput}/>
      <Canvas  journey={journey}/>
    </>
  )
}