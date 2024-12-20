import { useState } from 'react'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    const isLoggedInTemp = localStorage.getItem("ISLOGGEDIN")
    if(isLoggedInTemp == null) return false
    return isLoggedInTemp
  })
  


  return !isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn}/> : <Dashboard/>
}

export default App
