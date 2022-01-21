import {Link} from 'react-router-dom'
import UserModal from './UserModal'
import {useState} from 'react'

function Header({ setCurrentUser, currentUser}){

    const [showUserModal, setShowUserModal] = useState(false)

    const handleShow = () => {
        setShowUserModal(true)
    }

    const handleClose = () => {
        setShowUserModal(false)
    }

    return(
        <div className="header">
        <Link to="/" style={{ textDecoration: 'none', marginLeft: "2%" }}>
            <button className="nes-btn is-warning" style={{textAlign: 'center'}}>
                <img className="nes-avatar" alt="Home Button" src="https://cdn-icons-png.flaticon.com/512/25/25694.png" style={{imageRendering: "pixelated"}}/>
            </button>
        </Link>
        <button className="nes-btn is-primary" onClick={handleShow} style={{ float: 'right'}}>{currentUser.username}</button>
        <h1 className='exp-header' style={{textAlign: 'center'}}>EXP Share</h1>
        <UserModal handleClose={handleClose} currentUser={currentUser} showUserModal={showUserModal} setCurrentUser={setCurrentUser}/>
        </div>
    )
}

export default Header