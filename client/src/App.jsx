import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './Components/Home/Home';

function App() {
  return (<div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
     </BrowserRouter>
  </div>)
    
}

export default App;
