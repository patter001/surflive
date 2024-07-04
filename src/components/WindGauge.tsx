import React, { CSSProperties, ReactElement} from "react"
import "@fortawesome/fontawesome-free/css/all.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wind, usePackaryWind, usePortAWind } from "../queries/WindQueries";


const arrowColor = "blue";


export function WindGaugePackery(){

    const wind = usePackaryWind();

    if(wind.error){
        return (<div color={"white"}>Error fetching wind data</div>)
    } else if(wind.isLoading){
        return(<div color={"white"}>Loading..</div>)
    } else if (wind.data){
        return(<WindGauge data={wind.data}/>);
    } else {
        return(<div color={"white"}>Unknown..</div>)
    }
}

export function WindGaugePortA(){

    const wind = usePortAWind();

    if(wind.error){
        return (<WindLabel><p>Error fetching data...</p></WindLabel>)
    } else if(wind.isLoading){
        return(<WindLabel><p>Loading...</p></WindLabel>);
    } else if (wind.data){
        return(<WindGauge data={wind.data}/>);
    } else {
        return(<WindLabel><p>Unknown status...</p></WindLabel>)
    }
}

function WindArrow({degrees} : {degrees: string}){
    return <i className={'fas fa-long-arrow-alt-down'} style={{fontSize: "80px", color:arrowColor, transform: `rotate(${degrees}deg)`}}/>
}

function WindLabel({children}:{children: ReactElement[] | ReactElement}){
    const boxStyle: CSSProperties  = {
        backgroundColor: "rgba(255,255,255,.3)",
        textAlign: "center",
        color: arrowColor,
        fontSize: "40px",
    }
    return (
        <div style={boxStyle}>
            {children}
        </div>
    )
}


// Displays Data from a NOAA Boy
export function WindGauge({data} : {data: Wind[]}){
    const lastEntry = data[data.length-1]
    const speedStyle: CSSProperties = {
        color: arrowColor,
        fontSize: "80px",
        marginLeft: "10px",
        marginRight: "10px",
    }
    const updatedStyle: CSSProperties = {
        color: arrowColor,
        fontSize: "15px" 
    }
    console.log(lastEntry)
    const mph = Math.round(Number(lastEntry.s)* 1.150779)
    const gusts = Math.round(Number(lastEntry.g)* 1.150779)
    return (
        <WindLabel>
            <div>
                <div>
                    <WindArrow degrees={lastEntry.d} />   
                    <span style={speedStyle}>{mph}-{gusts} mph</span> 
                    <span style={updatedStyle}>{lastEntry.t}</span> 
                </div>

            </div>
        </WindLabel>
    )

}