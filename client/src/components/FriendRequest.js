

function FriendRequest({req, handleAccept, handleReject}){

    return(
        <div>
            <h1>{req.sender.username} sent you a request</h1>
            <button onClick={() => handleAccept(req)}>Accept</button>
            <button onClick={() => handleReject(req)}>Reject</button>
        </div>
    )
}

export default FriendRequest