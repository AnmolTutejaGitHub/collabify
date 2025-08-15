import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './Components/Home/Home';
import {useState} from 'react';
import Login from "./Components/Login/Login";
import Signup from './Components/Signup/Signup';
import GetVerified from './Components/Verify/GetVerified';
import VerifyYourAccount from './Components/Verify/VerifyYourAccount';
import ForgetPassword from './Components/UpdatePassword/ForgetPassword';
import ResetPassword from './Components/UpdatePassword/ResetPassword';
import { Toaster } from 'react-hot-toast';

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
    <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home toggleMode={toggleMode} userPreference={userPreference}/>} />
        <Route path="/login" element={<Login toggleMode={toggleMode} userPreference={userPreference}/>} />
        <Route path="/signup" element={<Signup toggleMode={toggleMode} userPreference={userPreference}/>} />
        <Route path="/verify" element={<GetVerified toggleMode={toggleMode} userPreference={userPreference}/>} />
        <Route path="/verify-email/:token" element={<VerifyYourAccount toggleMode={toggleMode} userPreference={userPreference}/>} />
        <Route path="/forget-password" element={<ForgetPassword toggleMode={toggleMode} userPreference={userPreference}/>} />
        <Route path="/update-password/:token" element={<ResetPassword toggleMode={toggleMode} userPreference={userPreference}/>} />
      </Routes>
     </BrowserRouter>
  </div>)
    
}

export default App;
