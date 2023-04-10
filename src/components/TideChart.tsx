import axios from "axios";
import React, {useState, useEffect, useMemo} from "react"
import { Component } from "react/cjs/react.development";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Tide interactive chart:
// https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8775870&units=standard&bdate=20220810&edate=20220811&timezone=LST/LDT&clock=24hour&datum=MLLW&interval=30&action=dailychart

//https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20220820&end_date=20220823&datum=MLLW&station=8775870&time_zone=lst_ldt&units=english&interval=30&format=json

//https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?
// product=predictions&
// application=NOS.COOPS.TAC.WL&
// begin_date=20220820&
// end_date=20220823&
// datum=MLLW&
// station=8775870&
// time_zone=lst_ldt&
// units=english&
// interval=30&
// format=json

let NUM_TIDE_DAYS=4;

let timerId = 0;

async function timedGetData(timedelay, fetchData, setData){
    let data = null;
    await fetchData().then(
        result=>setData(result)
    )
    if(timerId){
        console.log("clearing tide timer: "+timerId)
        clearTimeout(timerId)
    }
    timerId = setTimeout(()=>{
        timedGetData(timedelay, fetchData, setData)
    }, timedelay)
    console.log("New tide timer: "+timerId)
}  

export const TidePage = (props) => {
    //const [waveData, setWaveData] = useState(SwellData);
    const [tideData, setTideData] = useState(null);
    useEffect( () => {
        if(tideData === null){
            timedGetData( 4*60*60*1000, getTideData, setTideData)
        }
    }, [setTideData]);
    if(tideData){
        return (<TideChart swellData={tideData}/>)
    } else {
        return(<div>Loading tide data...</div>)
    }
}

export const MemoTidePage = React.memo(TidePage, [])

async function getTideData() {
    const noa_url = new URL("https://api.tidesandcurrents.noaa.gov/api/prod/datagetter")

    const params = {
        product: "predictions",
        application: "NOS.COOPS.TAC.WL",
        begin_date: "20220810", // filled in later
        end_date: "20220814", // filled in later
        datum: "MLLW",
        station: "8775870",
        time_zone: "lst_ldt",
        units: "english",
        interval: "30",
        format: "json"
    }
    // Fix date time to be today
    let d = new Date()
    let month = (d.getMonth()+1).toString().padStart(2,"0")
    let day = d.getDate().toString().padStart(2,"0")
    params.begin_date = `${d.getFullYear()}${month}${day}`
    d.setDate( d.getDate()+ NUM_TIDE_DAYS-1)
    month = (d.getMonth()+1).toString().padStart(2,"0")
    day = d.getDate().toString().padStart(2,"0")
    params.end_date = `${d.getFullYear()}${month}${day}`

    for(const [key,value] of Object.entries(params)){
        noa_url.searchParams.append(key, value)
    }
    let data = await axios.get(noa_url.href).then(resp=>{
        return resp.data.predictions
    })
    return data
}
  

export function TideChart (props) {
    const {swellData} = props
    return (
        <div style={{backgroundColor: "black"}}>
            <AreaChart
                width={760}
                height={480}
                data={swellData}
                // margin={{
                // top: 10,
                // right: 30,
                // left: 0,
                // bottom: 0
                // }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" 
                    domain={['auto', 'auto']}
                    //scale="time"
                    //type="number"
                    fill="white"
                    interval={47}
                    tick={{fill: "white"}}
                />
                <YAxis 
                    tick={{fill: "white"}}
                />
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </div>
    )
}


