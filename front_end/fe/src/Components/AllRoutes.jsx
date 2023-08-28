
import {Route, Routes} from "react-router-dom"

import HomePage from "./HomePage"

import { PrivateRoute } from "../Context/PrivateRoute"
import Authentication from "./Authentication"





const AllRoutes=()=>{
    return<Routes>
         <Route path="/" element={<Authentication/>} />
         <Route path="/home" element={<PrivateRoute><HomePage/></PrivateRoute>} />
    
        
    </Routes>
}
export {AllRoutes}