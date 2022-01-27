import {useState} from 'react'
import PicModal from './PicModal'
import UserDataModal from './UserDataModal'

function MyProfile({currentUser, setCurrentUser}){

    const [pictureFormData, setPictureFormData] = useState(currentUser.profile_pic)
    const [userFormData, setUserFormData] = useState({
        username: currentUser.username,
        bio: currentUser.bio
    })
    const [userData, setUserData] = useState({
        username: currentUser.username,
        bio: currentUser.bio
    })
    const [showPicModal, setShowPicModal] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)
    const [picture, setPicture] = useState(currentUser.profile_pic)


    const handlePicClose = () => {
        setShowPicModal(false)
        if(!picture || picture === ''){
            setPictureFormData('')
        }else{
            setPictureFormData(picture)
        }
    }

    const handleUserClose = () => {
        setShowUserModal(false)
        if(!userData.bio || userData.bio === ''){
            setUserFormData({
                username: userData.username,
                bio: ''
            })
        }else{
            setUserFormData({
                username: userData.username,
                bio: userData.bio
            })
        }
    }

    const handlePicShow = () => {
        setShowPicModal(true)
    }

    const handleUserShow = () => {
        setShowUserModal(true)
    }

    const handlePicClick = () => {
        if(!picture){
            setPictureFormData('')
        }
        handlePicShow()
    }

    const handleEditClick = () => {
        if(!userFormData.bio){
            setUserFormData({
                ...userFormData,
                bio: ''
            })
        }
        handleUserShow()
    }

    const handlePicSubmit = (e) => {
        e.preventDefault()

        const configObj = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                profile_pic: pictureFormData
            })
        }

        fetch(`api/users/${currentUser.id}`, configObj).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setPictureFormData(data.profile_pic)
                    setPicture(data.profile_pic)
                    setCurrentUser({
                        ...currentUser,
                        profile_pic: data.profile_pic
                    })
                    setShowPicModal(false)
                })
            }else{
                res.json()
                .then(errors => {
                    alert(errors.errors)
                })
            }
        })
    }

    const handleUserSubmit = (e) => {
        e.preventDefault()

        const configObj = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userFormData)
        }

        fetch(`api/users/${currentUser.id}`, configObj).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setUserFormData({
                        username: data.username,
                        bio: data.bio
                    })
                    setUserData({
                        username: data.username,
                        bio: data.bio
                    })
                    setCurrentUser({
                        ...currentUser,
                        username: data.username,
                        bio: data.bio
                    })
                    setShowUserModal(false)
                })
            }else{
                res.json()
                .then(errors => {
                    alert(errors.errors)
                })
            }
        })
    }

    return(
        <div className="my-profile">
            <img src={picture ? picture : 'http://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'} onClick={handlePicClick}/>
            <h1>{userData.username}</h1>
            <h3>Bio:</h3>
            <p>{userData.bio ? userData.bio : "404 bio not found"}</p>
            <button className='nes-btn is-warning' onClick={handleEditClick}>Edit</button>
            <PicModal handlePicClose={handlePicClose} showPicModal={showPicModal} handlePicSubmit={handlePicSubmit} pictureFormData={pictureFormData} setPictureFormData={setPictureFormData}/>
            <UserDataModal handleUserClose={handleUserClose} showUserModal={showUserModal} handleUserSubmit={handleUserSubmit} userFormData={userFormData} setUserFormData={setUserFormData}/>
        </div>
    )
}

export default MyProfile