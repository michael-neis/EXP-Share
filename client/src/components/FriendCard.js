

function FriendCard({friend, handleRemoveFriend}){


    return(
        <div>
            <h1>{friend.username}</h1>
            <button onClick={() => handleRemoveFriend(friend)}>Remove Friend</button>
        </div>
    )
}

export default FriendCard