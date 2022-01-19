import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage'
import SearchGames from './SearchGames'
import DiscoverGames from './DiscoverGames'
import MyLists from './MyLists'
import GameDetails from './GameDetails'
import Header from "./Header";


function LoggedIn({ setCurrentUser, currentUser }){

    return(
        <>
            <Header setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            <div className="routesDiv">
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/search' element={<SearchGames />} />
                <Route path='/game' element={<GameDetails currentUser={currentUser}/>} />
                <Route path='/discover' element={<DiscoverGames />} />
                <Route path='/lists' element={<MyLists currentUser={currentUser}/>} />
            </Routes>
            </div>
        </>
    )
}

export default LoggedIn