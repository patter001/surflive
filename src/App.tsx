import * as React from "react";
import {useState, useMemo, useCallback} from "react"
import {WavePage} from "./components/WaveBarChart"
import {TidePage, MemoTidePage} from "./components/TideChart"
import { WindGaugePackery, WindGaugePortA } from "./components/WindGauge";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

export function MobileApp () {
    const packeryImage = new URL("./images/packery.jpg", import.meta.url)
    const portAImage = new URL("./images/portA.jpg", import.meta.url)
    return (
        <div style={{ justifyContent: "space-around", width: "100%", height: "100vh"}}>
            <div style={{ backgroundImage:`url(${packeryImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100%", height:"50%", flexGrow: 1 }}>
                <div style={{marginLeft: "auto"}}>
                    <WindGaugePackery/>
                </div> 
            </div> 
            <div style={{ backgroundImage:`url(${portAImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100%", height:"50%", flexGrow: 1}}>
                <div style={{marginLeft: "auto"}}>
                <WindGaugePortA/>
                </div> 
            </div> 
        </div>        
    )   
}

export function WebApp () {
    const packeryImage = new URL("./images/packery-orig.jpg", import.meta.url)
    const portAImage = new URL("./images/portA.jpg", import.meta.url)
    return (
        <div style={{display: "flex", width: "100%"}}>
            <div style={{ backgroundImage:`url(${packeryImage})`, backgroundSize: "cover", width: "50%", height:"600px", }}>
                <div style={{marginLeft: "auto"}}>
                    <WindGaugePackery/>
                </div> 
            </div> 
            <div style={{ backgroundImage:`url(${portAImage})`, backgroundSize: "cover", width: "50%", height:"600px"}}>
                <div style={{marginLeft: "auto"}}>
                <WindGaugePortA/>
                </div> 
            </div> 
        </div>        
    )   
}

export function App() {
    // return (
    //     <MobileApp/>
    // )
    const packeryImage = new URL("./images/packery.jpg", import.meta.url)
    const portAImage = new URL("./images/portA.jpg", import.meta.url)
    return (
        <>
            <BrowserView>
                <WebApp/>
            </BrowserView>
            <MobileView>
                <MobileApp/>
            </MobileView>
        </>       
    )   
}


