import {useEffect, useState} from 'react'
import ReviewForm from './ReviewForm'

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

    const handleShow = () => {
        setShowReviewModal(true)
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

    return(
        <>
            <h1>{game.name}</h1>
            <img alt={game.name} src={game.cover && game.cover.image_id ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg` : 'https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png'} className="detailPhoto"/>
            {game && game.total_rating ? <h3>Average Rating: {game.total_rating.toFixed(1)}</h3> : null}
            {review ?
            <h3>{review.rating}/10</h3>
            :
            null
            }
            {review ?
            <button onClick={handleReviewPopup}>Edit Review</button>
            :
            <button onClick={handleReviewPopup}>Add Review</button>
            }
            {wishlist ? 
            <button onClick={handleRemoveFromWishlist}>Remove from wishlist</button>
            :
            <button onClick={handleAddToWishlist}>Add to wishlist</button>
            }
            <ReviewForm handleClose={handleClose} handleShow={handleShow} game={game} showReviewModal={showReviewModal} review={review} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} handleDelete={handleDelete}/>
        </>
    )
}

export default GameDetails