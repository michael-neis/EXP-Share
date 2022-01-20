

function UserCard({user}){

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
                    alert(errors.errors)
                })
            }
        })
    }

    return(
        <div>
            <h1>{user.username}</h1>
            <button onClick={handleRequest}>Send Friend Request</button>
        </div>
    )
}

export default UserCard