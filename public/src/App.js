import React from "react";
import 'react-toastify/dist/ReactToastify.min.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Secret from "./pages/Secret";

import Register from "./pages/Register";
import Login from "./pages/login";

const App = ()=>{
   return (
      <BrowserRouter>
         <Routes onKeyDown={e=>{console.log(e);}}>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/" element={<Secret/>}/>
         </Routes>
      </BrowserRouter>
   )
}


export default App