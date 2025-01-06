import { useState, useEffect } from 'react'
import './css/dashboardStyles.css'
import PreviousPhotos from './components/previousPhotos'
import Current from './components/current'
import DayChange from './components/dayChange'
import axios from 'axios';

export default function Dashboard(){
    let tempDate = new Date()
    let tempDay
    tempDay = tempDate.toLocaleString('default', { weekday: 'long' })
    tempDate = `${tempDate.toLocaleString('default', { month: 'long' })} ${tempDate.getDate()}, ${tempDate.getFullYear()}`

    const [displayDay, setDisplayDay]= useState(tempDay)
    const [displayDate, setDisplayDate] = useState(tempDate)


    
    const[numOfPhotos, setNumOfPhotos] = useState()
    const [todayHasPhoto, setTodayHasPhoto] = useState(()=>{
        let tempHasPhoto = localStorage.getItem("HASPHOTO")
        if(tempHasPhoto == null) return false
        return tempHasPhoto
    })
    
    const [dataSaved, setDataSaved] = useState(()=>{
        let tempIsSaved = localStorage.getItem("DATASAVED")
        if(tempIsSaved == null) return false
        return tempIsSaved
    })



    // Fetches database
    function fetchDatabase(){
        
        const storedPhotos = (localStorage.getItem("STORAGE"))
        if(storedPhotos){
            setNumOfPhotos(JSON.parse(storedPhotos.length))
            localStorage.setItem("PREVPHOTOS",JSON.parse(storedPhotos.length))
            
        }else{
            setNumOfPhotos(0)
            localStorage.setItem("PREVPHOTOS",0 )
        }
    }

    useEffect(() => {
        fetchDatabase()
    }, [dataSaved]);

    // Changes the image ticker icon

    
    function clear(){
        console.log("clearrrr")
        localStorage.clear()
    }

    function add(){
        const storedPhotos = (localStorage.getItem("STORAGE"))
        let dataList = []
        if(storedPhotos){
            dataList = JSON.parse(storedPhotos)
        }
        dataList.push({URL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAA…FjrmON2l7wSv1+Wd0O8A3AO5hZxeKhI8AAAAASUVORK5CYII=', Title: 'fasd', Description: 'asdffasd', Date: ' 3/0/2025'})
        localStorage.setItem("STORAGE",JSON.stringify(dataList))
        console.log(JSON.parse(storedPhotos))
    }

    return(
        <>
        {/* <button onClick={add}>Add</button>
        <button onClick={clear}>Clear</button> */}
        <section className='nav-section'>
            <nav className='nav-bar'>
                <div className='date-wrapper'>
                    <h2 className='day'>{displayDay}</h2>
                    <h2 className='date'>{displayDate}</h2>
                </div>
            </nav>
        </section>
        <DayChange />

        <Current 
            todayHasPhoto={todayHasPhoto}
            numOfPhotos={numOfPhotos} 
            setTodayHasPhoto={setTodayHasPhoto} 
            dataSaved={dataSaved}
            setDataSaved={setDataSaved}
            setNumOfPhotos={setNumOfPhotos}

            />
            
        <PreviousPhotos numOfPhotos={numOfPhotos} dataSaved={dataSaved}/>




        
        </>
    )
}