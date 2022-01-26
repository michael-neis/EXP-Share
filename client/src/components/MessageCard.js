import { useNavigate } from 'react-router-dom';

function MessageCard({message, currentUser}){

    let history = useNavigate()

    const dateCreated = new Date(message.created_at)
    const dateOptions = { month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
    const showCreated = dateCreated.toLocaleString('en-US', dateOptions);

    const handleImageClick = (e) => {
        localStorage.setItem('userId', message.sender.id)
        history('/user')
    }

    const handleGameClick = (e) => {
        localStorage.setItem('gameId', message.api_id)
        history('/game')
    }


    if(currentUser.id === message.sender.id && message.api_id){
        return(
        <div className="sent-message">
            <div className="nes-balloon from-right is-dark" style={{ maxWidth: '80%'}}>
            <p>You should check out <a onClick={handleGameClick}>{message.title}</a></p>
            <time>{showCreated}</time>
            </div>
            <img className="nes-bcrikko" style={{marginRight: '15px'}} alt='friend profile' title={message.sender.username} src={message.sender.profile_pic ? message.sender.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
        </div>
    )
    }else if(currentUser.id === message.sender_id){
    return(
        <div className="sent-message">
            <div className="nes-balloon from-right is-dark" style={{ maxWidth: '80%'}}>
            <p>{message.message}</p>
            <time>{showCreated}</time>
            </div>
            <img className="nes-bcrikko" style={{marginLeft: '15px'}} alt='friend profile' src={currentUser.profile_pic ? currentUser.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
        </div>
    )
    }else if(message.api_id){
        return(
            <div className="received-message">
            <section className="message -left">
            <img className="nes-bcrikko" onClick={handleImageClick} style={{marginRight: '15px'}} alt='friend profile' title={message.sender.username} src={message.sender.profile_pic ? message.sender.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
            <div className="nes-balloon from-left is-dark" style={{ maxWidth: '80%'}}>
            <p>I think you would like <a onClick={handleGameClick}>{message.title}</a></p>
            <time>{showCreated}</time>
            </div>
        </section>
        </div>
    )
    }else{
        return(
            <div className="received-message">
            <section className="message -left">
            <img className="nes-bcrikko" onClick={handleImageClick} style={{marginRight: '15px'}} alt='friend profile' title={message.sender.username} src={message.sender.profile_pic ? message.sender.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
            <div className="nes-balloon from-left is-dark" style={{ maxWidth: '80%'}}>
            <p>{message.message}</p>
            <time>{showCreated}</time>
            </div>
        </section>
        </div>
        )
    }
}

export default MessageCard