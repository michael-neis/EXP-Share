import { useNavigate } from 'react-router-dom';

function FriendRequest({req, handleAccept, handleReject}){

    let history = useNavigate()

    const handleUserClick = () => {
        localStorage.setItem('userId', req.sender.id)
        history('/user')
    }

    return(
        <div className="friend-request">
            <section className="message-list">
                <section className="message -left">
                    <img className="nes-bcrikko" alt='friend profile' src={req.sender.profile_pic ? req.sender.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
                    <div className="nes-balloon from-left is-dark">
                    <p>{<a onClick={handleUserClick}>{req.sender.username}</a>} sent you a friend request!</p>
                    <button className='nes-btn is-error' onClick={() => handleReject(req)}>Reject</button>
                    <button className='nes-btn is-success' onClick={() => handleAccept(req)}>Accept</button>
                    </div>
                </section>
            </section>
              
        </div>
    )
}

export default FriendRequest