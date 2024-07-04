import * as React from "react";
import {useState, useMemo, useCallback} from "react"
import { WaveInfo42020 } from "./components/SwellFromBuoy"
import { WindGaugePackery, WindGaugePortA } from "./components/WindGauge";
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';

import "./App.css";

const queryClient = new QueryClient()

const squareStyle = {backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100%", height:"50%", flexGrow: 1 }

export function MobileApp () {
    const packeryImage = new URL("./images/packery.jpg", import.meta.url)
    const portAImage = new URL("./images/portA.jpg", import.meta.url)
    return (
        <div style={{ justifyContent: "space-around", width: "100%", height: "100vh"}}>
            <div style={squareStyle}>
                <div style={{ backgroundImage:`url(${packeryImage})`, ... squareStyle}}>
                    <div style={{marginLeft: "auto"}}>
                        <WindGaugePackery/>
                    </div> 
                </div> 
                <div style={{ backgroundImage:`url(${portAImage})`, ... squareStyle}}>
                    <div style={{marginLeft: "auto"}}>
                    <WindGaugePortA/>
                    </div> 
                </div> 
            </div>
            <div style={squareStyle}>
                <WaveInfo42020 count={4}/>
            </div>
        </div>        
    )   
}


export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MobileApp/>
        </QueryClientProvider>       
    )   
}


