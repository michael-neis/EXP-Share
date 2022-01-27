import { useNavigate } from 'react-router-dom';

function SuggestionCard({game, sender}){

    let history = useNavigate()

    const dateCreated = new Date(game.created_at)
    const dateOptions = { month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
    const showCreated = dateCreated.toLocaleString('en-US', dateOptions);

    const handleNameClick = (e) => {
        localStorage.setItem('userId', game.sender.id)
        history('/user')
    }

    const handleGameClick = (e) => {
        localStorage.setItem('gameId', game.api_id)
        history('/game')
    }

    const clickName = <a onClick={handleNameClick}>{sender.username}</a>
    const clickGame = <a onClick={handleGameClick}>{game.title}</a>

    const dialogues = [<p>{clickName} thinks you should give {clickGame} a try</p>, <p>{clickName} reccommended {clickGame} to you</p>, <p>{clickName} suggests you play {clickGame}</p>, <p>{clickName} reckons you would love {clickGame}</p>]

    const random = Math.floor(Math.random() * dialogues.length)
    const message = dialogues[random]

    return(
        <div className="suggestion-bubble">
        <section className="message -left" >
        <img className="nes-bcrikko" style={{marginRight: '15px'}} alt='friend profile' title={sender.username} src={sender.profile_pic ? sender.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
        <div className="nes-balloon from-left is-dark" style={{ maxWidth: '80%'}}>
        {message}
        <time>{showCreated}</time>
        </div>
    </section>
    </div>
    )
}

export default SuggestionCard