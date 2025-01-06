import { useState,useEffect } from "react";
import '../css/dashboardStyles.css'
import axios from 'axios';
import DayChange from "./dayChange";


export default function Current({setTodayHasPhoto, setNumOfPhotos, numOfPhotos, todayHasPhoto, dataSaved, setDataSaved}){

    const [todaysPhotoURL, setTodaysPhotoURL] = useState(()=>{
        let tempPhotoURL = localStorage.getItem("URL")
        if(tempPhotoURL == null) return 
        return tempPhotoURL
    })
    const[saveBtnActive, setSaveBtnActive] = useState(()=>{
        let tempBtnActive = localStorage.getItem("BTNACTIVE")
        if(tempBtnActive == null) return false
        return tempBtnActive
    })
    const[data, setData] = useState(null)

    const [titleValue, setTitleValue] = useState(()=>{
        let tempTitle = localStorage.getItem("TITLE")
        if(tempTitle == null) return 
        return tempTitle
    })
    const [descValue, setDescValue] = useState(()=>{
        let tempDesc = localStorage.getItem("DESC")
        if(tempDesc == null) return 
        return tempDesc
    })

    const[titleLineHeight , setTitleLineHeight] = useState(()=>{
        let tempTitleHeight = localStorage.getItem("TITLEHEIGHT")
        if(tempTitleHeight == null) return 
        return tempTitleHeight
    })
    const[descLineHeight , setDescLineHeight] = useState(()=>{
        let tempDescHeight = localStorage.getItem("DESCHEIGHT")
        if(tempDescHeight == null) return 
        return tempDescHeight
    })



    // Adjusts text styling of the add photo button
    useEffect(()=>{
        if(!todayHasPhoto){
            if(numOfPhotos ===0){
                let addPhotoBtn = document.getElementById("addPhotoBtn") 
                addPhotoBtn.classList.add("no-photo-styles")
                addPhotoBtn.innerHTML = "Add Your First Photo"
            } else{
                addPhotoBtn.classList.remove("no-photo-styles")
                addPhotoBtn.innerHTML = "Add a Photo"
            }
        }
    },[])


    // Gets image
    useEffect(()=>{

        const inputImg = document.getElementById("photoInput")
        if(!todayHasPhoto){
            inputImg.addEventListener("change",function(event){
                const file = event.target.files[0]
                const reader = new FileReader()
                
                reader.onload = (e)=>{
                    setTodaysPhotoURL(e.target.result)
                    localStorage.setItem("URL", e.target.result)
                    setNumOfPhotos(numOfPhotos+1)
                    localStorage.setItem("NUMOFPHOTOS", numOfPhotos+1)
                    setTodayHasPhoto(true)
                    localStorage.setItem("HASPHOTO", true)
                }
                reader.readAsDataURL(file)
            })
        }
      
    },[])

    // Adjusts line height of the title and description
    function titleChange(e){

        e.target.style.height = 'auto'; // Reset height to auto to allow shrinking
        e.target.style.height = `${e.target.scrollHeight}px`

        if(e.target.id == "currentTitle"){
            setTitleLineHeight(`${e.target.scrollHeight}px`)
            localStorage.setItem("TITLEHEIGHT", `${e.target.scrollHeight}px`)
        }else{
            setDescLineHeight(`${e.target.scrollHeight}px`)
            localStorage.setItem("DESCHEIGHT", `${e.target.scrollHeight}px`)
        }
        const title = document.getElementById("currentTitle")
        const desc = document.getElementById("currentDesc")

        setTitleValue(title.value)
        localStorage.setItem("TITLE", title.value)

        setDescValue(desc.value)
        localStorage.setItem("DESC", desc.value)
        

        saveBtnStyling()
    }

    // Save BTN styling
    function saveBtnStyling(){
        const title = document.getElementById("currentTitle")
        const desc = document.getElementById("currentDesc")
        const save = document.getElementById("saveBtn")

        if(todayHasPhoto && !dataSaved){
            if(title.value !== "" && desc.value!== ""){
                save.classList.remove("unactive")
                setSaveBtnActive(true)
                localStorage.setItem("BTNACTIVE", true)
            }
            else{
                save.classList.add("unactive")
                setSaveBtnActive(false)
                localStorage.setItem("BTNACTIVE", false)
            }
        }
    }
    useEffect(()=>{
        saveBtnStyling()
        window.addEventListener('resize', ()=>{
            const title = document.getElementById("currentTitle")
            const desc = document.getElementById("currentDesc")

            title.style.height ='auto'
            desc.style.height='auto'

            title.style.height =`${title.scrollHeight}px`
            desc.style.height =`${desc.scrollHeight}px`
            console.log("Title", title.scrollHeight)
            setTitleLineHeight(`${title.scrollHeight}px`)
            localStorage.setItem("TITLEHEIGHT", `${title.scrollHeight}px`)
            setDescLineHeight(`${desc.scrollHeight}px`)
            localStorage.setItem("DESCHEIGHT", `${desc.scrollHeight}px`)
            

        })
    },[])
    // Fetch image data from the server







    // Handles the save button click
    function saveInfo(){
        if(saveBtnActive){
            const title = document.getElementById("currentTitle")
            const desc = document.getElementById("currentDesc")
            let date = new Date
            date =` ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
            const freshData = {"URL":todaysPhotoURL, "Title": title.value, "Description": desc.value, "Date":date}


            const storedPhotos = (localStorage.getItem("STORAGE"))
            let dataList = []
            if(storedPhotos){
                dataList = JSON.parse(storedPhotos)
            }
            dataList.push(freshData)
            localStorage.setItem("STORAGE",JSON.stringify(dataList))
            setDataSaved(true)
            localStorage.setItem("DATASAVED", true)
            // console.log(JSON.parse(dataList))
        }
    }




    
    return(
        <>
        <DayChange />
        <section className='current-image-section'>
            {todayHasPhoto && (
                <>
                <div className='today-photo-section'>
                    <h2 className='secondary-text'>Todays Photo</h2>
                    <div className='center-today-wrapper'>
                        <div className='today-wrapper'>
                            <div className='photo-wrapper'>
                                <img className='current-photo-img' src={todaysPhotoURL}/>
                            </div>
                            <div className='image-info-wrapper'>
                                <textarea 
                                    type='text' 
                                    id='currentTitle' 
                                    className='current-title' 
                                    rows={1} 
                                    onInput={()=>{titleChange(event)}} 
                                    placeholder='Title' 
                                    maxLength={40}
                                    style={{pointerEvents : dataSaved ? "none": "auto", height:titleLineHeight} }
                                    value={titleValue}>
                                </textarea>
                                <textarea 
                                    id='currentDesc' 
                                    className='current-description' 
                                    maxLength={250} 
                                    rows={1} 
                                    onInput={()=>{titleChange(event)}} 
                                    placeholder='Description'
                                    style={{pointerEvents : dataSaved ? "none": "auto", height:descLineHeight}}
                                    value={descValue}>
                                </textarea>
                                {!dataSaved && (
                                    <button onClick={saveInfo} id='saveBtn' className='save-btn unactive'>Save</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )}
            {!todayHasPhoto && (

                <div className="no-photo-wrapper">
                    <input style={{display:'none'}} id='photoInput' type="file" accept="image/*" />
                    <label className='add-photo-btn' id='addPhotoBtn' htmlFor="photoInput">Add a Photo</label>
                </div>

            )}
        </section>
        </>
    )
}