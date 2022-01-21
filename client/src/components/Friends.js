import { useEffect, useState } from 'react'
import FriendRequest from './FriendRequest'
import FriendCard from './FriendCard'


function Friends({ currentUser }){

    const [friends, setFriends] = useState([])
    const [requests, setRequests] = useState([])
    const [requestBool, setRequestBool] = useState(false)

    useEffect(() => {
        fetch('/api/friendships').then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setFriends(data)
                })
            }else{
                res.json()
                .then(errors => {
                    console.log(errors)
                })
            }
        })
    }, [])

    const handleShowRequests = () => {
        fetch(`/api/friend_requests/${currentUser.id}`).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setRequests(data)
                    setRequestBool(true)
                })
            }else{
                res.json()
                .then(errors => {
                    console.log(errors)
                })
            }
        })
    }

    const handleAccept = (req) => {

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sender_id: req.sender.id,
                req_id: req.id
            })
        }

        fetch('/api/friendships', configObj).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setFriends([...friends, data])
                    const deletedReq = requests.filter(r => r.id !== req.id)
                    setRequests([...deletedReq])
                })
            }else{
                res.json()
                .then(errors => {
                    alert(errors.errors)
                })
            }
        })
    }

    const handleReject = (req) => {
        fetch(`/api/friend_requests/${req.id}`, { method: 'DELETE'}).then(res => {
            if(res.ok){
                const deletedReq = requests.filter(r => r.id !== req.id)
                setRequests([...deletedReq])
            }else{
                res.json()
                .then(errors => {
                    alert(errors.errors)
                })
            }
        })
    }

    const handleRemoveFriend = (friend) => {
        fetch(`/api/friendships/${friend.id}`, { method: 'DELETE' }).then(res => {
            if(res.ok){
                const removedFriends = friends.filter(f => f.id !== friend.id)
                setFriends([...removedFriends])
            }else{
                res.json()
                .then(errors => {
                    console.log(errors)
                })
            }
        })
    }

    const displayRequests = requests.map(req => <FriendRequest key={req.id} req={req} handleAccept={handleAccept} handleReject={handleReject}/>)
    const displayFriends = friends.map(friend => <FriendCard key={friend.username} friend={friend} handleRemoveFriend={handleRemoveFriend}/>)

    return(
        <>
        <div className="friend-container">
            <button className="nes-btn is-primary" onClick={() => setRequestBool(false)}>Friends</button>
            <button className="nes-btn is-success" onClick={handleShowRequests}>Friend Requests</button>
        </div>
            {requestBool ? displayRequests : displayFriends}
        
        </>
    )
}

export default Friends