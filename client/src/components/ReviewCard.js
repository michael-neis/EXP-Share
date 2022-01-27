import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

function ReviewCard({review, currentUser}){

    const [user, setUser] = useState('')

    let history = useNavigate()

    useEffect(() => {
        fetch(`api/users/${review.user_id}`).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setUser(data)
                })
            }else{
                res.json()
                .then(errors => {
                    console.log(errors)
                })
            }
        })
    }, [])

    const dateCreated = new Date(review.created_at)
    const dateOptions = { month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' };
    const showCreated = dateCreated.toLocaleString('en-US', dateOptions);

    const handleImageClick = (e) => {
        localStorage.setItem('userId', review.user_id)
        history('/user')
    }


    if(currentUser.id === review.user_id){
    return(
        <div className="sent-message">
            <div className="nes-balloon from-right is-dark" style={{ maxWidth: '80%'}}>
            <p style={{color: 'gold'}}>{review.rating}/10</p>
            <p>{review.comment}</p>
            <time>{showCreated}</time>
            </div>
            <img className="nes-bcrikko" style={{marginLeft: '15px'}} alt='friend profile' src={currentUser.profile_pic ? currentUser.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
        </div>
    )
    }else{
        return(
            <div className="received-message">
            <section className="message -left">
            <img className="nes-bcrikko" onClick={handleImageClick} style={{marginRight: '15px'}} alt='friend profile' title={user.username} src={user.profile_pic ? user.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
            <div className="nes-balloon from-left is-dark" style={{ maxWidth: '80%'}}>
            <p style={{color: 'gold'}}>{review.rating}/10</p>
            <p>{review.comment}</p>
            <time>{showCreated}</time>
            </div>
        </section>
        </div>
        )
    }
}

export default ReviewCard