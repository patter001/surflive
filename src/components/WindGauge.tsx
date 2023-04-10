import React, { useState, useEffect } from "react"
import axios from "axios"
import "@fortawesome/fontawesome-free/css/all.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import windImage from "../images/wind.png"

const buoyUrl = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=today&station=8775792&product=wind&datum=STND&time_zone=lst_ldt&units=english&format=json"

interface Wind {
    d: string; // degrees, example: 54.0
    dr: string; // direction, example: NE
    f: string; // ?? example: 0,0
    g: string; // gusts, example: 14.58 (in knots)
    s: string; // speed, example: 13.41
    t: string; // Date time string, format example: "2023-04-09 18:06"
}

export function WindGaugeWithData(){
    const [windData, setWindData] = useState(null)
    useEffect(()=>{
        axios.get(buoyUrl).then(result=>setWindData(result.data.data))
    },[])
    if(!windData){
        return(<div>Loading..</div>)
    } else {
        return(<WindGauge data={windData}/>)
    }
}

/*
/* Colored Icon 
<div class="icon colored"></div>
// .colored {
//     background-color: orange; /* defines the background color of the image */
//     mask: url(https://img.icons8.com/stackoverflow) no-repeat center / contain;
//     -webkit-mask: url(https://img.icons8.com/stackoverflow) no-repeat center / contain;
//   }

// Displays Data from a NOAA Boy
export function WindGauge({data} : {data: Wind[]}){
    const lastEntry = data[data.length-1]
    console.log(lastEntry)
    const windImage = new URL("../images/wind2.png?as=webp&width=100", import.meta.url)
    import.meta.url
    const coloredIcon = {
        backgroundColor: "orange",
        mask: `url(${windImage})`,
        WebkitMask: `url(${windImage})`
    }
    return (
        <>
        <i className={'fas fa-long-arrow-alt-down'} style={{fontSize: "48px", color:"red", transform: `rotate(${lastEntry.s}deg)`}}></i>
        <div>{lastEntry.s}</div>
        </>
    )

}