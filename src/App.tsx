import * as React from "react";
import {useState, useMemo, useCallback} from "react"
import { WaveInfo42020 } from "./components/SwellFromBuoy"
import { WindGaugePackery, WindGaugePortA } from "./components/WindGauge";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';
const queryClient = new QueryClient()

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
            <div>
                <WaveInfo42020/>
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
            {/* <div>
                <WaveInfo42020/>
            </div> */}
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
        <QueryClientProvider client={queryClient}>
            <BrowserView>
                <WebApp/>
            </BrowserView>
            <MobileView>
                <MobileApp/>
            </MobileView>
        </QueryClientProvider>       
    )   
}


