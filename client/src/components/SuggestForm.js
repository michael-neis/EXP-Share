import { Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'

function SuggestForm({ handleClose, currentUser, showSuggestForm, game}){

    const [friends, setFriends] = useState([])
    const [selectedFriend, setSelectedFriend] = useState('default.friend.7028420')

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

    const friendList = friends.map(friend => <option key={friend.id} value={friend.id}>{friend.username}</option>)

    const handleFriendChange = (e) => {
        setSelectedFriend(e.target.value)
    }

    const handleSuggest = () => {
        console.log(selectedFriend)
        if(selectedFriend === 'default.friend.7028420'){
            alert('Please select a friend first')
        }else{

            const configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    receiver_id: selectedFriend,
                    api_id: game.id,
                    title: game.name
                })
            }

            fetch('/api/suggestions', configObj).then(res => {
                if(res.ok){
                    res.json()
                    .then(data => {
                        alert('Suggestion Sent!')
                    })
                }else{
                    res.json()
                    .then(errors => {
                        if(errors.errors[0] === "Api has already been taken"){
                            alert('You have already suggested this game to that user')
                        }else{
                            alert(errors.errors)
                        }
                    })
                }
            })
            handleClose()
        }
    }

    return(
    <>
    <Modal show={showSuggestForm} onHide={handleClose}>
        <Modal.Header >
            <Modal.Title>Reccomend {game.name} to:</Modal.Title>
        </Modal.Header>
        <div className="nes-select">
        <select value={selectedFriend} onChange={handleFriendChange}>
                <option value="default.friend.7028420">Select friend</option>
                {friendList}
        </select>
        </div>
        <Modal.Footer>
            <button className='nes-btn' style={{fontSize: 10, marginRight: 10}} onClick={handleClose}>
                Cancel
            </button>
            <button className='nes-btn is-success' style={{fontSize: 10}} variant="warning"  onClick={handleSuggest}>
                Suggest
            </button>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default SuggestForm