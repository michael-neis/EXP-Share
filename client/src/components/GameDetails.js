import {useEffect, useState} from 'react'
import ReviewForm from './ReviewForm'
import 'react-dropdown/style.css';

function GameDetails({currentUser}){

    const [game, setGame] = useState(null)
    const [gameExists, setGameExists] = useState(false)
    const [review, setReview] = useState(null)
    const [wishlist, setWishlist] = useState(null)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [formData, setFormData] = useState({
        rating: 0,
        comment: ''
    })
    const [fallBack, setFallBack] = useState({
        rating: 0,
        comment: ''
    })
    const [listOptions, setListOptions] = useState([])
    const [selectedList, setSelectedList] = useState('default.list.101783')
    const [gameRubyId, setGameRubyId] = useState(null)

    const gameId = localStorage.getItem('gameId')
    
    useEffect(() => {

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameId)
        }

        fetch('/api/show_game', configObj)
            .then(res => res.json())
            .then(data =>{
                 setGame(data.game)
                 setGameExists(true)
                 setReview(data.review)
                 setWishlist(data.wishlist)
                 setListOptions(data.lists)
                 setGameRubyId(data.db_id)
                 if(data.review && data.review.comment){
                    setFormData({
                        rating: data.review.rating,
                        comment: data.review.comment
                    })
                    setFallBack({
                        rating: data.review.rating,
                        comment: data.review.comment
                    })
                 }else if(data.review){
                     setFormData({
                         comment: '',
                         rating: data.review.rating
                     })
                     setFallBack({
                        comment: '',
                        rating: data.review.rating
                    })
                 }
            })
    }, [])

    if (!gameExists) {
        return <div>Loading...</div>;
    }

    const handleClose = () => {
        setShowReviewModal(false)
        setFormData(fallBack)
    }

    const handleReviewPopup = () => {
        setShowReviewModal(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(review){
            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }

            fetch(`/api/reviews/${review.id}`, configObj).then(res => {
                if(res.ok){
                    res.json().then((data) => {
                        setReview(data)
                        if(data.comment){
                            setFormData({
                                rating: data.rating,
                                comment: data.comment
                            })
                            setFallBack({
                                rating: data.rating,
                                comment: data.comment
                            })
                        }else{
                            setFormData({
                                ...formData,
                                rating: data.rating
                            })
                            setFallBack({
                                ...formData,
                                rating: data.rating
                            })
                        }
                    })
                }else{
                    res.json().then((errors) => {
                        alert(errors.errors);
                    })
                }
            })

        }else{
            const configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    user_id: currentUser.id,
                    api_id: game.id,
                    image_id: game.cover.image_id,
                    title: game.name,
                    total_rating: game.total_rating
                })
            }

            fetch('/api/reviews', configObj).then(res => {
                if(res.ok){
                    res.json().then((data) => {
                        setReview(data)
                        if(data.comment){
                            setFormData({
                                rating: data.rating,
                                comment: data.comment
                            })
                            setFallBack({
                                rating: data.rating,
                                comment: data.comment
                            })
                        }else{
                            setFormData({
                                ...formData,
                                rating: data.rating
                            })
                            setFallBack({
                                ...formData,
                                rating: data.rating
                            })
                        }
                    })
                }else{
                    res.json().then((errors) => {
                        alert(errors.errors);
                    })
                }
            })
        }
        setShowReviewModal(false)
    }

    const handleDelete = (review) => {
        fetch(`/api/reviews/${review.id}`, { method: 'DELETE' }).then(res => {
            if (res.ok) {
                setReview(null)
                setFormData({
                    rating: 0,
                    comment: ''
                })
                setFallBack({
                    rating: 0,
                    comment: ''
                })
            } else {
                res.json().then((errors) => {
                    alert(errors.errors);
                })
            }
        })
    }

    const handleRemoveFromWishlist = () =>{
        fetch(`/api/wishlists/${wishlist.id}`, { method: 'DELETE' }).then(res => {
            if (res.ok) {
                setWishlist(null)
            } else {
                res.json().then((errors) => {
                    alert(errors.errors);
                })
            }
        })
    }

    const handleAddToWishlist = () =>{
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                api_id: game.id,
                image_id: game.cover.image_id,
                title: game.name,
                total_rating: game.total_rating
            })
        }

        fetch('/api/wishlists', configObj).then(res =>{
            if(res.ok){
                res.json()
                .then(data => {
                    setWishlist(data)
                })
            }else{
                res.json().then((errors) => {
                    alert(errors.errors);
                })
            }
        })
    }

    const handleListChange = (e) => {
        setSelectedList(e.target.value)
    }

    const handleAddClick = () => {


        if(selectedList === 'default.list.101783'){
            alert('Please select a list')
        }else{

        
        const list = listOptions.find(list => list.list_name === selectedList)

        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_id: game.id,
                list_id: list.id,
                game_id: gameRubyId,
                image_id: game.cover.image_id,
                title: game.name,
                total_rating: game.total_rating
            })
        }
        fetch('/api/list_items', configObj).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setGameRubyId(data.game_id)
                    alert('Added to list!')
                })
            }else{
                res.json()
                .then(errors => {
                    if(errors.errors[0] === 'Game has already been taken'){
                        alert('Game has already been added to this list')
                    }else{
                        alert(errors.errors)
                    }
                })
            }
        })
    }}


    const listNames = listOptions.map((option) => <option value={option.list_name} key={option.list_name}>{option.list_name}</option>)

    return(
        <div className="game-details">
            <h1 style={{marginBottom: 20}}>{game.name}</h1>
            <img alt={game.name} src={game.cover && game.cover.image_id ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png'} className="detailPhoto"/>
            {game && game.total_rating ? <h3 style={{marginTop: 40}}>Average Rating: {game.total_rating.toFixed(1)}</h3> : null}
            <br/>
            {review ?
            <h3>My Rating:</h3>
            :
            null
            }
            {review ?
            <h3>{review.rating}/10</h3>
            :
            null
            }
            {review ?
            <h4>"{review.comment}"</h4>
            :
            null
            }
            {review ?
            <button className='nes-btn is-warning' onClick={handleReviewPopup}>Edit Review</button>
            :
            <button className='nes-btn is-success' onClick={handleReviewPopup}>Add Review</button>
            }
            <br/>
            {wishlist ? 
            <button style={{marginTop: '10px'}} className='nes-btn is-error' onClick={handleRemoveFromWishlist}>Remove from wishlist</button>
            :
            <button style={{marginTop: '10px'}} className='nes-btn is-success' onClick={handleAddToWishlist}>Add to wishlist</button>
            }
            <br/>
            {/* <Dropdown options={listNames} onChange={handleListChange} value={selectedList} placeholder="Select an option"/> */}
            <br/>
            <h4>Add to List:</h4>
            <select value={selectedList} onChange={handleListChange} style={{fontSize: '19px'}}>
                <option value="default.list.101783">Select a List</option>
                {listNames}
            </select>
            <button className='nes-btn is-success' onClick={handleAddClick} style={{fontSize: '10px', marginLeft: '8px'}}>Add</button>
            <br/>
            <br/>
            <button className='nes-btn is-primary'>Suggest to Friend</button>
            <br/>
            <br/>
            {game.summary ? <h5>Game Summary:</h5> : null}
            {game.summary ? <p>{game.summary}</p> : null}



            <ReviewForm handleClose={handleClose} game={game} showReviewModal={showReviewModal} review={review} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} handleDelete={handleDelete}/>
        </div>
    )
}

export default GameDetails