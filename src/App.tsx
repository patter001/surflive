import * as React from "react";
import {useState, useMemo, useCallback} from "react"
import {WavePage} from "./components/WaveBarChart"
import {TidePage, MemoTidePage} from "./components/TideChart"
import { WindGaugeWithData } from "./components/WindGauge";

export function App() {
    const packeryImage = new URL("./images/packery.jpg", import.meta.url)
    return (
        <div style={{ backgroundImage:`url(${packeryImage})`, width: "100%", height:"800px", display: "flex"}}>
            <div style={{marginLeft: "auto"}}>
                <WindGaugeWithData/>
            </div> 
        </div>
        
    )   
}


