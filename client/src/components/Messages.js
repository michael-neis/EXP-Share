import {useState, useEffect} from 'react'
import MessageCard from './MessageCard'

function Messages({currentUser}){

    const [allMessages, setAllMessages] = useState([])

    const userId = localStorage.getItem('userId')
    const userUsername = localStorage.getItem('userUsername')

    useEffect(() => {
        fetch(`/api/messages/${userId}`).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setAllMessages(data)
                })
            }else{
                res.json()
                .then(errors => {
                    console.log(errors)
                })
            }
        })
    }, [])

    const displayMessages = allMessages.map(message => <MessageCard key={message.id} message={message} currentUser={currentUser}/>)

    return(
        <div className="message-container">
            <h1 style={{ marginTop: '40px', marginBottom: '20px'}}>Messages with {userUsername}</h1>
            {displayMessages.length === 0 ? <h3>No messages yet</h3> : displayMessages}
        </div>
    )
}

export default Messages