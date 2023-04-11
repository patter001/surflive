import * as React from "react";
import {useState, useMemo, useCallback} from "react"
import {WavePage} from "./components/WaveBarChart"
import {TidePage, MemoTidePage} from "./components/TideChart"
import { WindGaugePackery, WindGaugePortA } from "./components/WindGauge";

export function App() {
    const packeryImage = new URL("./images/packery.jpg", import.meta.url)
    const portAImage = new URL("./images/portA.jpg", import.meta.url)
    return (
        <div style={{display: "flex"}}>
            <div style={{ backgroundImage:`url(${packeryImage})`, width: "50%", height:"600px", }}>
                <div style={{marginLeft: "auto"}}>
                    <WindGaugePackery/>
                </div> 
            </div> 
            <div style={{ backgroundImage:`url(${portAImage})`, width: "50%", height:"600px"}}>
                <div style={{marginLeft: "auto"}}>
                <WindGaugePortA/>
                </div> 
            </div> 
        </div>

        
    )   
}


