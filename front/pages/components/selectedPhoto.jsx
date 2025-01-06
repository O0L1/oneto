import { useState,useEffect } from "react";
import '../css/dashboardStyles.css'


export default function SelectedPhoto({prevPhotos, selectedPic, setSelectedPic}){

    const [imgValues, setImgValues] = useState()

    // Finds the values attached to the key(date)
    useEffect(()=>{
        if(selectedPic){
            console.log(prevPhotos[selectedPic])
            setImgValues(prevPhotos[selectedPic])

            const body = document.body
            body.style.overflow = 'hidden'
            
            
        }
    },[selectedPic])
    useEffect(()=>{
        if(imgValues){
            console.log("YURRR")
            const selectedSection= document.getElementById("selectedSection")
            selectedSection.classList.add("visible")
            selectedSection.classList.remove("remove")

        }
    },[imgValues])

    function goBack(){
        selectedSection.classList.add("remove")
        selectedSection.classList.remove("visible")
        setTimeout(() => {
            setImgValues(null)
            setSelectedPic(null)
            const body = document.body
            body.style.overflow = 'auto'
            
        }, 500);

    }

    return(
        <>
        {imgValues && (
            <section className="selected-section" id="selectedSection">
                <div className="selected-back-wrapper">
                    <button className="selected-back" onClick={goBack}><img src="../public/arrow.png"/></button>
                </div>
                <div className="selected-wrapper">
                    <img className="selected-img" src={imgValues.URL}></img>
                    <div className="selected-text">
                        <h2 className="selected-date">{imgValues.Date}</h2>
                        <h2 className="selected-title">{imgValues.Title}</h2>
                        <h3 className="selected-desc">{imgValues.Description}</h3>
                    </div>
                </div>
            </section>

        )}
        </>
    )
}