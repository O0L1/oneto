import React from 'react'
import { useState, useEffect } from 'react'

export default function DayChange(){
    
    let tempDate = new Date()
    tempDate = tempDate.getDate()
    const [currentDay, setCurrentDay] = useState(()=>{
        return tempDate
        
    })

    // Resets all localstorage items on day change
    function changedDay(){
        console.log("Items removed")
        const allKeys = Object.keys(localStorage)

        for(let i=0; i<allKeys.length; i++){
            if(allKeys[i] !== "ISLOGGEDIN" && allKeys[i] !== "STORAGE"){
                localStorage.removeItem(allKeys[i])
                console.log(allKeys[i])
            }
        }

        
        window.location.reload()
    }
    // Checks if the day has changed
    useEffect(()=>{
        let tmrw = localStorage.getItem("TMRW")
        if(currentDay >= tmrw || (tmrw-currentDay)>15){
            console.log("day change")
            changedDay()
        }
    },[currentDay])

    // Set localstorage item "TMRW"
    useEffect(()=>{
        if(!localStorage.getItem("TMRW")){
            localStorage.setItem("TMRW", tempDate +1)
        }
    },[])

    return(
        <>
        </>
    )
}