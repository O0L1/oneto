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
        axios.get("http://localhost:3000/api/data")
        .then(res=>{
            let list = res.data[0].images
    
            setNumOfPhotos(Object.values(list).length)
            localStorage.setItem("PREVPHOTOS",Object.values(list).length )
            
        }).catch(err =>{
            console.log(err)
        })

    }

    useEffect(() => {
        fetchDatabase()
    }, [dataSaved]);

    // Changes the image ticker icon

    


    function clear(){
        localStorage.clear()
    }


    return(
        <>
        <button onClick={clear}>Clear</button>
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