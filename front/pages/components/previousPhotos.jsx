import { useState,useEffect } from "react";
import '../css/dashboardStyles.css'
import axios from 'axios';
import SelectedPhoto from "./selectedPhoto";
import Masonry from 'masonry-layout';

export default function PreviousPhotos({numOfPhotos, dataSaved}){

    const [prevPhotos, setPrevPhotos] = useState(()=>{
        let tempPhotos = localStorage.getItem("PREVPHOTOS")
        if(tempPhotos == null) return 
        return JSON.parse(tempPhotos)
    })
    const [lastUrl, setLastUrl] = useState(()=>{

    })
    const [selectedPic, setSelectedPic] = useState()


    // Fetches Data
    useEffect(() => {

        const storedPhotos = (localStorage.getItem("STORAGE"))
        console.log("asihof", JSON.parse(storedPhotos))
        setPrevPhotos(JSON.parse(storedPhotos))
        // localStorage.setItem("PREVPHOTOS",JSON.stringify(storedPhotos))
    }, [dataSaved]);

    // Gets the last URL in the array
    useEffect(()=>{
        console.log(numOfPhotos)

        if(prevPhotos){
            setLastUrl(prevPhotos.length -1)
        }

    },[prevPhotos])

    // Assigns event listeners to previous photos
    function assignListeners(){
        const imgItems = document.querySelectorAll(".image-item")

        imgItems.forEach(img =>{
            img.addEventListener('click', (e)=>{
                console.log(e.target.dataset.key)

                setSelectedPic(e.target.dataset.key)

            })
        })
    }

    // Assigns listeners after a small delay
    useEffect(()=>{

        setTimeout(assignListeners(), 200)
    })




    var grid = document.querySelector('.previous-photos-wrapper');

    var msnry = new Masonry( grid, {
    // options...
        itemSelector: '.grid-item',
        columnWidth:200
        
    });
    // init with selector
    var msnry = new Masonry( '.previous-photos-wrapper', {
    // options...
        
    });


    return(
        <>
        <SelectedPhoto selectedPic={selectedPic} prevPhotos={prevPhotos} setSelectedPic={setSelectedPic}  />
        {numOfPhotos>1 &&(
            <section className='previous-photos-section'>
                <div className='previous-photos-header-wrapper'>
                    <h2 className='secondary-text'>Previous Photos</h2>
                </div>
                <div className="previous-photos-wrapper" >

                    {prevPhotos.map((photo, index) => (
                        index!== lastUrl?(
                            <img id={`imageItem-${index}`} className="grid-item image-item" data-key={index} src={photo.URL}/>
                        ):null
                    ))}
                </div>
            </section>


        )}
        </>
    )
}