import React from "react"
import {Table} from "antd"
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { ProcessedWaveData, useWaveStationCC } from "../queries/WaveQueries";

export function WaveInfo42020 ({count}:{count: number}){
    const waveData = useWaveStationCC();
    
    if(!waveData.data){
        if(waveData.isLoading){
            return(<div>Loading..</div>)
        } else {
            return(<div>Error?..</div>)
        }
    }
    return(<WaveInfo data={waveData.data} count={count}/>)
    
}
function WaveInfo ({data, count} : {data: ProcessedWaveData[], count: number}){

    const requiredData = data.slice(0, count)
    const renderFeet = (v) => `${v} ft`
    const columns = [
        {
            title: 'Date',
            dataIndex: 'dateTime',
        },
        {
            title: 'Wave',
            dataIndex: 'sigWaveHeight',
            render: renderFeet
        },
        {
            title: 'SwellH',
            dataIndex: 'swellWaveHeight',
            render: renderFeet
        },        
        {
            title: 'WindH',
            dataIndex: 'windWaveHeight',
            render: renderFeet
        }, 
        {
            title: 'Period',
            dataIndex: 'averagePeriod',
        },
        {
            title: 'Direction',
            dataIndex: 'medianDirection',
            render: (direction) => {
                return (<WaveArrow degrees={direction}/>)
            }
        },          
    ]

    return (
    <div style={{alignContent: "center"}}>
        <Table columns={columns} dataSource={requiredData}/>        
    </div>)
}

function WaveArrow({degrees} : {degrees: string}){
    return <i className={'fas fa-long-arrow-alt-down'} style={{fontSize: "24px", color:"blue", transform: `rotate(${degrees}deg)`}}/>
}
