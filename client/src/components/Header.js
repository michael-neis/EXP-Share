import SvgIcon from '@mui/material/SvgIcon';
import Fab from '@mui/material/Fab';
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

    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
    }

    return(
        <div>
        <Link to="/" style={{ textDecoration: 'none', position: 'absolute', marginLeft: 20 }}>
                <Fab color="active" size="small">
                    <HomeIcon />
                </Fab>
        </Link>
        <button onClick={handleShow} style={{float: 'right', marginRight: 10, height: '30px'}}>{currentUser.username}</button>
        <UserModal handleClose={handleClose} currentUser={currentUser} showUserModal={showUserModal} setCurrentUser={setCurrentUser}/>
        </div>
    )
}

export default Header