import React, { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const buoy42020 = "https://www.ndbc.noaa.gov/data/realtime2/42020.spec"

/* Example data
#YY  MM DD hh mm WVHT  SwH  SwP  WWH  WWP SwD WWD  STEEPNESS  APD MWD
#yr  mo dy hr mn    m    m  sec    m  sec  -  degT     -      sec degT
2023 04 13 00 40  1.7  1.6  9.1  0.7  4.0 ENE NNE    AVERAGE  5.8  77
2023 04 13 00 10  1.9  1.7  9.1  0.7  4.5 ENE  NE    AVERAGE  6.0  72
2023 04 12 23 40  1.7  1.5  9.1  0.8  4.0 ENE  NE    AVERAGE  5.6  73
2023 04 12 23 10  1.9  1.7  9.1  0.9  5.0 ENE  NE    AVERAGE  5.8  76
*/

interface WaveData {
    YY: string,
    MM: string,
    DD: string,
    hh: string,
    WVHT: string,
    SwH: string,
    SwP: string,
    WWH: string,
    SwD: string,
    WWD: string,
    APD: string,
    MWD: string,
}
function useWaveStation(station){
    const url = `https://www.ndbc.noaa.gov/data/realtime2/${station}.spec`

    const query = async () => {
        return await axios.get(url).then((result)=>{
            console.log(result.data)
            debugger
            return result.data.data
        })
    }
    return useQuery({
        queryKey: [station],
        queryFn: query
    })
}

async function fetchUrl(url){
    let response = await fetch(buoy42020, {
        credentials: "omit",
        mode: "no-cors"            
    })
    let data = await response.text()
    return data
}

export function WaveInfo42020 (){
    const waveData = useWaveStation("42020");
    // useEffect(()=>{
    //     axios.get(buoy42020, {
    //         headers: {
    //             'Content-Type': 'text/html',
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods':'GET',
    //           },
    //         withCredentials: false,
    //     }).then((result)=>{
    //         console.log(result.data)
    //         setWaveData(result.data.data)
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    // },[])
    // useEffect(()=>{
    //     fetchUrl(buoy42020).then((data)=>{
    //         console.log("Data", data)
    //     }).catch((error)=>{
    //         console.log("Error", error)
    //     })
    // }, [])
    
    if(!waveData.data){
        if(waveData.isLoading){
            return(<div>Loading..</div>)
        } else {
            return(<div>Error?..</div>)
        }
    } else {
        debugger
        return(<WaveInfo data={waveData}/>)
    }
    
}

function WaveInfo (){
    return (<></>)
}