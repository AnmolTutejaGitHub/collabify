import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './Components/Home/Home';
import {useState} from 'react';
import Login from "./Components/Login/Login";
import Signup from './Components/Signup/Signup';


// /verify-email/:token
// /update-password/:token
// /verify
// user State Mangement 

function App() {

  const [userPreference,setUserPreference] = useState({
    lightmode : false,
  })
  const toggleMode = () => {
    setUserPreference(prev => ({
      ...prev,
      lightmode: !prev.lightmode
    }))
  }
  return (<div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home toggleMode={toggleMode} userPreference={userPreference}/>} />
        <Route path="/login" element={<Login toggleMode={toggleMode} userPreference={userPreference}/>} />
        <Route path="/signup" element={<Signup toggleMode={toggleMode} userPreference={userPreference}/>} />
      </Routes>
     </BrowserRouter>
  </div>)
    
}

export default App;
