import {useEffect, useState} from 'react'
import ReviewForm from './ReviewForm'
import 'react-dropdown/style.css';
import SuggestForm from './SuggestForm';
import ReviewCard from './ReviewCard';
import PlatformCard from './PlatformCard';
import { useNavigate } from 'react-router-dom';

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
    const [showSuggestForm, setShowSuggestForm] = useState(false)
    const [genres, setGenres] = useState([])
    const [reviews, setReviews] = useState([])
    const [platforms, setPlatforms] = useState([])

    let history = useNavigate()

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
                 setGenres(data.game.genres)
                 setReviews(data.review_array)
                 setPlatforms(data.game.platforms)
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
        return(
        <div className="game-container">
        <div style={{margin: 'auto', color: 'white'}}>
            <p>Loading...</p>
            <div className="field">
                <div className="net"></div>
                <div className="ping"></div>
                <div className="pong"></div>
                <div className="ball"></div>
            </div>
        </div>
        </div>
        )
    }

    const handleClose = () => {
        setShowReviewModal(false)
        setFormData(fallBack)
    }

    const handleSuggestClose = () => {
        setShowSuggestForm(false)
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
                        const updated = reviews.map((rev => rev.id === data.id ? data : rev))
                        setReviews(updated)
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
                        if(reviews){
                            setReviews([...reviews, data])
                        }else{
                            setReviews([data])
                        }
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
                const deleted = reviews.filter(r => r.id !== review.id)
                setReviews(deleted)
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

    const handleSuggestClick = () => {
        setShowSuggestForm(true)
    }

    const handleCollectionClick = () => {
        localStorage.setItem('collectionId', game.collection.id)
        history('/collection')
    }
 
    const listNames = listOptions.map((option) => <option value={option.list_name} key={option.list_name}>{option.list_name}</option>)
    const displayGenres = genres.map((genre) => genre.name).join(', ')

    let displayReviews

    if(reviews){
        displayReviews = reviews.map((review) => <ReviewCard key={review.id} review={review} currentUser={currentUser}/>)
    }else{
        displayReviews = null
    }

    let displayPlatforms

    if(platforms){
        displayPlatforms = platforms.map(platform => <PlatformCard key={platform.id} platform={platform}/>)
    }else{
        displayPlatforms = null
    }

    let displayCollection

    if(game.collection){
        displayCollection = <h4>Check out the entire <a className="collection-a" onClick={handleCollectionClick}>{game.collection.name}</a> collection!</h4>
    }else{
        displayCollection = null
    }

    return(
        <div>
        <div className="game-details">
            <h1 style={{marginBottom: 20}}>{game.name}</h1>
            <img alt={game.name} src={game.cover && game.cover.image_id ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png'} className="detailPhoto"/>
            <h3 style={{marginTop: 40}}>{displayGenres}</h3>
            {game && game.total_rating ? <h3 style={{marginTop: 15}}>Average Rating: {game.total_rating.toFixed(1)}</h3> : null}
            <br/>
            {review ?
            <h3>My Review:</h3>
            :
            null
            }
            {review ?
            <h3 style={{color: 'gold'}}>{review.rating}/10</h3>
            :
            null
            }
            {review ?
            <h4>{review.comment}</h4>
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
            <br/>
            <h4>Add to List:</h4>
            <select value={selectedList} onChange={handleListChange} style={{fontSize: '19px', height: '34px'}}>
                <option value="default.list.101783">Select a List</option>
                {listNames}
            </select>
            <button className='nes-btn is-success' onClick={handleAddClick} style={{fontSize: '10px', marginLeft: '8px'}}>Add</button>
            <br/>
            <br/>
            <button className='nes-btn is-primary' onClick={handleSuggestClick}>Suggest to Friend</button>
            <br/>
            <br/>
            {game.summary ? <h5>Game Summary:</h5> : null}
            {game.summary ? <p>{game.summary}</p> : null}

            {displayCollection}

            <div className="platform-container">
            {displayPlatforms}
            </div>

            <ReviewForm handleClose={handleClose} game={game} showReviewModal={showReviewModal} review={review} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} handleDelete={handleDelete}/>

            <SuggestForm handleClose={handleSuggestClose} game={game} showSuggestForm={showSuggestForm} currentUser={currentUser}/>
        </div>
        <div>
            <h1 style={{ marginTop: 64, marginBottom: -30, color: 'white', textAlign: 'center'}}>Reviews</h1>
            <div className="review-container">
                {reviews && reviews.length > 0 ? displayReviews : <h3>No reviews yet</h3>}
            </div>
        </div>
        </div>
    )
}

export default GameDetails