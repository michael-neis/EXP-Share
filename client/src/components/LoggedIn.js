import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage'
import { useState } from "react";


function LoggedIn({ setCurrentUser, currentUser }){
    const [groupId, setGroupId] = useState()

    return(
        <Routes>
            <Route path='/' element={<HomePage setCurrentUser={setCurrentUser} currentUser={currentUser} setGroupId={setGroupId}/>} />
        </Routes>
    )
}

export default LoggedIn