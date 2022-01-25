import {useEffect, useState} from 'react'
import ListGameCard from './ListGameCard'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function UserPage(){

    const [user, setUser] = useState(false)
    const [selectedList, setSelectedList] = useState('default.list.829920')
    const [displayLists, setDisplayLists] = useState([])
    const [displayGames, setDisplayGames] = useState([])
    const [showRemove, setShowRemove] = useState(false)

    const userId = localStorage.getItem('userId')

    let history = useNavigate()

    useEffect(() => {
        fetch(`/api/show_user/${userId}`).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    console.log(data)
                    const publicLists = data.lists.filter(list => list.public === true)
                    const listNames = publicLists.map(list => <option id={list.id} value={list.id} key={list.id}>{list.list_name}</option>)
                    setUser(data)
                    setDisplayLists(listNames)
                })
            }else{
                res.json()
                .then(errors => {
                    alert(errors.errors)
                })
            }
        })
    }, [])

    if(!user){
        return(<h2 style={{color: 'white'}}>Loading...</h2>)
    }

    const handleRemoveFromList = () => {
        alert('Not Authorized')
    }

    const allReviews = user.reviews.map((game) => <ListGameCard key={game.id} itemId={null} game={game} listDesc={'reviews'} handleRemoveFromList={handleRemoveFromList} />)
    const allWishlists= user.wishlists.map((game) => <ListGameCard key={game.id} itemId={null} game={game} listDesc={'wishlist'} handleRemoveFromList={handleRemoveFromList} />)

    const handleListChange = (e) => {
        setSelectedList(e.target.value)
        if(e.target.value === 'wishlist'){
            if(allWishlists.length > 0){
                setDisplayGames(allWishlists)
            }else{
                setDisplayGames(<h3 style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20, marginBottom: 60}}>{user.username} has no games in their wishlist</h3>)
            }
        }else if(e.target.value === 'reviews'){
            if(allReviews.length > 0){
                setDisplayGames(allReviews)
            }else{
                setDisplayGames(<h3 style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20, marginBottom: 60}}>{user.username} has not reviewed any games yet</h3>)
            }
        }else if(e.target.value === 'default.list.829920'){
            setDisplayGames(<></>)
        }else{
            const selectedList = user.lists.find(list => list.id === parseInt(e.target.value))
            if(selectedList.games.length > 0){
                const listGames = selectedList.games.map(game => <ListGameCard key={game.id} itemId={null} game={game} listDesc={'wishlist'} handleRemoveFromList={handleRemoveFromList} />)
                setDisplayGames(listGames)
            }else{
                setDisplayGames(<h3 style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20, marginBottom: 60}}>There are no games in this list</h3>)
            }
        }
        
    }

    const handleRemoveModal = () => {
        setShowRemove(true)
    }

    const handleRemoveClose = () => {
        setShowRemove(false)
    }

    const handleRemoveClick = () => {
        fetch(`/api/friendships/${user.id}`, { method: 'DELETE' }).then(res => {
            if(res.ok){
                setUser({
                    ...user,
                    friend_bool: false
                })
            }else{
                res.json()
                .then(errors => {
                    console.log(errors)
                })
            }
        })
        setShowRemove(false)
    }

    const handleAddFriend = () => {
        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                receiver_id: user.id
            })
        }

        fetch('/api/friend_requests', configObj).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    alert('Friend request sent!')
                })
            }else{
                res.json()
                .then(errors => {
                    if(errors.errors[0] === 'Receiver has already been taken'){
                        alert('You have already sent this user a friend request')
                    }else{
                        alert(errors.errors)
                    }
                })
            }
        })
    }

    const handleMessageClick = () => {
        localStorage.setItem('userId', user.id)
        localStorage.setItem('userUsername', user.username)
        history('/messages')
    }


    return(
        <div>
        <div className='user-page'>
            <img className='user-page-img' alt='friend profile' src={user.profile_pic ? user.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
            <h1>{user.username}</h1>
            {user.friend_bool ? 
            <button className='nes-btn is-error' onClick={handleRemoveModal}>Remove Friend</button>
            :
            <button className='nes-btn is-success' onClick={handleAddFriend}>Add Friend</button>
            }
            {user.friend_bool ? 
            <button className='nes-btn is-primary' onClick={handleMessageClick}>Message</button>
            :
            null
            }
            <br/>
            <br/>
            <h2>Bio:</h2>
            <p>{user.bio ? user.bio : '404 Bio not found'}</p>
            <br/>
            <p>View {user.username}'s lists:</p>
            <div className='nes-select is-success' style={{width: '30%', margin: 'auto'}}>
            <select value={selectedList} onChange={handleListChange}>
              <option value="default.list.829920">None</option>
              <option id='reviews' value='reviews'>Reviews</option>
              <option id='wishlist' value='wishlist'>Wishlist</option>
              {displayLists}
            </select>
            </div>
            <div className="game-container">
                {displayGames}
            </div>
        </div>
            <Modal show={showRemove} onHide={handleRemoveClose}>
            <Modal.Header >
            <Modal.Title>Are you sure you wish to remove {user.username} as a friend?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <button className='nes-btn' onClick={handleRemoveClose}>
                Cancel
            </button>
            <button className='nes-btn is-error' onClick={handleRemoveClick} style={{float: 'right'}}>
                Remove
            </button>
            </Modal.Body>
            </Modal>
        </div>
    )
}

export default UserPage