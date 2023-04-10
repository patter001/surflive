import React, { useState, useEffect } from 'react';
import { ComposedChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//import {CachedMagicData} from './swell';
import axios from 'axios';
import "./Wave.css";

let CachedMagicData = null;

// first attempt, seagreen
// const periodColors = ['#eaf2ed', '#c5ddcf', '#9fc9b1', '#79b493', '#539f75', '#2e8b57'];
// green
// const periodColors = ['#c3e0c3', '#9ccc9c', '#74b974', '#4ea64e', '#269226', '#008000']
// red
const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const periodColors = ['#c8c8f4', '#a0a0f6', '#7777f8', '#5050fa', '#2727fc', '#0000ff']
const windColors = {
    green: "#00CC00",
    orange: "#FF9933",
    red: "#FF0000",
}
const MIN_PERIOD = 4
const MAX_PERIOD = MIN_PERIOD+periodColors.length-1;

function processSwell(allData){
    // return name and height
    //var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    //d.setUTCSeconds(utcSeconds);
    let reducedData = []
    let cindex=0
    allData.forEach((entry)=>{
        let row = {}
        let date = new Date(0)
        let range = MAX_PERIOD-MIN_PERIOD
        date.setUTCSeconds(entry.timestamp)
        //row['timestamp'] = date.toLocaleString()
        row['timestamp'] = entry['timestamp']
        row['height'] = entry['swell_absHeight']
        row['swell_maxBreakingHeight'] = entry['swell_maxBreakingHeight']
        row['swell_minBreakingHeight'] = entry['swell_minBreakingHeight']
        row['period'] = entry['swell_period']
        row['wind'] = entry['wind']
        cindex = row['period']-MIN_PERIOD
        if(cindex<0){
            cindex = 0
        } else if(cindex>=periodColors.length) {
            cindex = periodColors.length-1
        } 
        row['period_color'] = periodColors[cindex]
        reducedData.push(row)
    })
    return reducedData
}

function dateToString(date){
    let dateobj = new Date(0)
    dateobj.setUTCSeconds(date)
    let weekday = weekdays[dateobj.getDay()];
    // for debugging confirming hour
    //return `${dateobj.getMonth()+1}-${dateobj.getDate()}-${weekday}:${dateobj.getHours()}`;
    return `${dateobj.getMonth()+1}-${dateobj.getDate()}-${weekday}`;
}



export function WaveBarChart (props) {
    const {waveData} = props;
    let maxWaveHeight = 8
  
    const CustomLabel = (props) => {
        const {index, x, y} = props;
        let data = waveData[index]
        let color = "red"
        if(data.wind.speed<10){
            color = "green"
        } else if (data.wind.speed<15){
            color = "orange"
        } // else use default
        let fillColor = windColors[color]
        return (<text 
            x={x} 
            y={y} 
            dy={-4} 
            dx={5}
            fontSize='10' 
            fontFamily='sans-serif'
            style={{color: fillColor}}          
            fill={fillColor} 
            textAnchor="middle">{data["wind"]["speed"]}</text>
        )
    }   

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            let data = payload[0].payload;

            let dateobj = new Date(0)
            dateobj.setUTCSeconds(data.timestamp)
            let weekday = weekdays[dateobj.getDay()];
            // for debugging confirming hour
            //return `${dateobj.getMonth()+1}-${dateobj.getDate()}-${weekday}:${dateobj.getHours()}`;
            let timestr = `${weekday}-${dateobj.getHours()}`;

            return (
            <div className="customTooltip">
                <p className="label">{`height: ${data.height}`}</p>
                <p className="label">{`period: ${data.period}`}</p>
                <p className="label">{`wind: ${data.wind.speed}`}</p>
                <p className="label">{`time: ${timestr}`}</p>
            </div>
            );
        }
    };

    return (
        <div style={{backgroundColor: "black"}}>
            <ComposedChart width={790} height={480} data={waveData}  >
                <CartesianGrid strokeDasharray="3" stroke="#808080" />
                <Tooltip cursor={false} content={CustomTooltip} />
                <YAxis 
                    domain={[0,maxWaveHeight]} 
                    interval={0} 
                    tickCount={maxWaveHeight}
                    tick={{fill: "white"}}
                />
                <XAxis 
                    // domain={[
                    //     localData[0].timestamp, 
                    //     localData[localData.length-1]
                    // ]}
                    dataKey="timestamp"   
                    domain={['auto', 'auto']}
                    scale="time"
                    type="number"
                    fill="white"
                    interval={7}
                    tickFormatter={dateToString}
                    tick={{fill: "white"}}
                />
                <Bar label={<CustomLabel/>} dataKey="height" fill="#8884d8">
                    {
                        waveData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.period_color}/>
                        ))
                    }
                </Bar>
                {/* <Line type="monotone" dataKey="swell_maxBreakingHeight" stroke="#00CC00" dot={false}/>
                <Line type="monotone" dataKey="swell_minBreakingHeight" stroke="#00CC00" dot={false}/> */}
            </ComposedChart>
        </div>
    );
}


async function getMagicData(){
    //return SwellData;
    // let data = await axios.get('http://localhost:5000/fetch_data',{
    let data = await axios.get('http://localhost:8010/proxy/api/mdkey/forecast/?spot_id=3950"',{
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    }).then(resp => {
        return resp.data;
    });
    return data
}

function getWaveData(magicData){
    // combine timestamp and swell data
    let swellData = []
    magicData.forEach((entry)=>{
        let d = {}
        d['timestamp'] = entry['timestamp']
        for (const [key, value] of Object.entries(entry['swell'])) {
            d["swell_"+key] = value
        }
        d['wind'] = entry['wind']   
        swellData.push(d)
    })
    return swellData
}

let timerId = null;

export function WavePage() {
    //const [waveData, setWaveData] = useState(SwellData);
    const [magicData, setMagicData] = useState([]);
    const [waveData, setWaveData] = useState([]);

    // trick needed to view the data in the debugger
    let cachedData = CachedMagicData;

    useEffect(()=>{
        console.log("initial render")
        // if debug data imported
        if(cachedData){
            setMagicData(cachedData)
        } else {
            getMagicData().then( (magic) => {
                console.log("Setting magic data")
                setMagicData(magic)
            })
        }
    }, [])

    useEffect( () =>{
        if(magicData.length>0){
            let tempData = getWaveData(magicData)
            setWaveData(tempData)
            console.log("Refreshing data")
            if(timerId){
                console.log("clearing swell timer: "+timerId)
                clearTimeout(timerId)
            }
            // refresh every 4 hours
            timerId = setTimeout(() => {
                console.log("Refreshing data due to timeout")
                getMagicData().then( (magic) => setMagicData(magic))
            }, 4*60*60*1000)
            console.log("New Timer: "+timerId)
        }
    },[magicData])
    
    if(waveData){
        let localData = processSwell(waveData);
        return (
            <WaveBarChart waveData={localData}/>
        );    
    } else {
        return (
            <div>Loading..</div>
        )
    }
}