import { useState } from 'react'
import "./css/loginStyles.css"

export default function Login({setIsLoggedIn}){
    
    const [subtitleVar, setSubtitleVar] = useState("photo")

    function loginClicked(){
        console.log("Worked")
        setIsLoggedIn(true)
        localStorage.setItem("ISLOGGEDIN", true)
    }
    
    return(
        <>
        <div className='login-wrapper'>
            <div className='site-text'>
                <h1 className='site-title'>ONETO</h1>
                <h2 className='site-subtitle'>Save 1 <span className='site-subtitle-var'>{subtitleVar}</span> a day</h2>
            </div>
            <div className='login-btn-wrapper'>
                <button className='site-login-btn' onClick={loginClicked}>

                    <svg className='svgShape' width="992" height="263" viewBox="0 0 992 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g className='sideRectG'>
                            <rect className='rect1' x="172.382" width="185.072" height="45.7946" transform="rotate(45 172.382 0)" fill="#0C0C0C"/>
                            <rect className='rect2' x="140" y="229.866" width="185.072" height="45.7946" transform="rotate(-45 140 229.866)" fill="#0C0C0C"/>
                        </g>
                        <rect className='rect3' y="108" width="280" height="46" fill="#0C0C0C"/>
                    </svg>
{/* 
                    <svg className='svgShape' width="992" height="263" viewBox="0 0 992 263" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect className='rect1' x="860.382" width="185.072" height="45.7946" transform="rotate(45 860.382 0)" fill="#1E3294"/>
                        <rect className='rect2' x="828" y="229.866" width="185.072" height="45.7946" transform="rotate(-45 828 229.866)" fill="#1E3294"/>
                        <rect className='rect3' y="108" width="968" height="46" fill="#1E3294"/>
                    </svg> */}



                </button>
            </div>
        </div>
        {/* <div className='login-btn-wrapper'>
            <button onClick={loginClicked} className='login-btn'>start</button>
        </div> */}
        
        </>
    )
}