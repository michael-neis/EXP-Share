import { useNavigate } from 'react-router-dom';

function UserCard({user}){

    let history = useNavigate()

    if(!user){
        return null
    }

    

    const handleRequest = () => {

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

    const handleUserClick = () => {
        localStorage.setItem('userId', user.id)
        history('/user')
    }

    return(
        <div className='friend-card'>
            <img alt='friend profile' src={user.profile_pic ? user.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
            <h1 onClick={handleUserClick}>{user.username}</h1>
            <button className="nes-btn is-success" onClick={handleRequest}>Send Friend Request</button>
        </div>
    )
}

export default UserCard