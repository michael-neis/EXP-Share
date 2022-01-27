import { Routes, Route } from "react-router-dom";
import HomePage from './HomePage'
import SearchGames from './SearchGames'
import DiscoverGames from './DiscoverGames'
import MyLists from './MyLists'
import GameDetails from './GameDetails'
import Header from "./Header";
import Friends from "./Friends"
import SearchUsers from "./SearchUsers"
import MyProfile from "./MyProfile";
import UserPage from './UserPage'
import Messages from './Messages'
import Suggestions from "./Suggestions";
import Collection from "./Collection"


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
                <Route path='/friends' element={<Friends currentUser={currentUser}/>} />
                <Route path='/search_users' element={<SearchUsers currentUser={currentUser}/>} />
                <Route path='/my_profile' element={<MyProfile currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
                <Route path='/user' element={<UserPage currentUser={currentUser}/>} />
                <Route path='/messages' element={<Messages currentUser={currentUser}/>} />
                <Route path='/suggestions' element={<Suggestions currentUser={currentUser}/>} />
                <Route path='/collection' element={<Collection />} />
            </Routes>
            </div>
        </>
    )
}

export default LoggedIn