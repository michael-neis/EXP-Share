

function MessageCard({message, currentUser}){

    const dateCreated = new Date(message.created_at)
    const dateOptions = { month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
    const showCreated = dateCreated.toLocaleString('en-US', dateOptions);


    if(currentUser.id === message.sender_id){
    return(
        <div className="sent-message">
            <div className="nes-balloon from-right is-dark">
            <p>{message.message}</p>
            <time>{showCreated}</time>
            </div>
            <img className="nes-bcrikko" alt='friend profile' src={currentUser.profile_pic ? currentUser.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
        </div>
    )
    }else{
        return(
            <div className="received-message">
            <section className="message -left">
            <img className="nes-bcrikko" alt='friend profile' src={message.sender.profile_pic ? message.sender.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
            <div className="nes-balloon from-left is-dark">
            <p>{message.message}</p>
            <time>{showCreated}</time>
            </div>
        </section>
        </div>
        )
    }
}

export default MessageCard