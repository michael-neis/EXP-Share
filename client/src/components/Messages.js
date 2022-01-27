import {useState, useEffect} from 'react'
import MessageCard from './MessageCard'

function Messages({currentUser}){

    const [allMessages, setAllMessages] = useState([])
    const [messageText, setMessageText] = useState('')

    const userId = localStorage.getItem('userId')
    const userUsername = localStorage.getItem('userUsername')

    useEffect(() => {
        fetch(`api/messages/${userId}`).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setAllMessages(data)
                })
            }else{
                res.json()
                .then(errors => {
                    alert(errors.error)
                })
            }
        })
    }, [])

    const displayMessages = allMessages.map(message => <MessageCard key={message.created_at} message={message} currentUser={currentUser}/>)

    const handleChange = (e) => {
        setMessageText(e.target.value)
    }

    const handleSend = (e) => {

        e.preventDefault()
        
        const configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                receiver_id: userId,
                message: messageText
            })
        }

        fetch('api/messages', configObj).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setAllMessages([...allMessages, data])
                })
            }else{
                res.json()
                .then(errors => {
                   alert(errors.error)
                })
            }
        })
        setMessageText('')
    }

    return(
        <div>
            <h1 style={{ marginTop: '40px', marginBottom: '20px', color: 'white', textAlign: 'center'}}>Messages with {userUsername}</h1>
        <div className="message-container">
            {displayMessages.length === 0 ? <h3>No messages yet</h3> : displayMessages}
            <div className="message-input-container">
                <form className="message-input" onSubmit={handleSend}>
                <input autoComplete='off' type="text" id="comment" className="nes-input" value={messageText} onChange={handleChange} label="Username"></input>
                <button className="nes-btn" >Send</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Messages