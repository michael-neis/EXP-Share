import {useEffect, useState} from 'react'

function UserPage(){

    const [userName, setUserName] = useState('')
    const [lists, setLists] = useState([])
    const [reviews, setReviews] = useState([])
    const [wishlist, setWishlist] = useState([])

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        fetch(`/api/show_user/${userId}`).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    console.log(data)
                    setUserName(data.username)
                    setLists(data.lists)
                    setReviews(data.reviews)
                    setWishlist(data.wishlists)
                })
            }else{
                res.json()
                .then(errors => {
                    alert(errors.errors)
                })
            }
        })
    }, [])

    const allLists = lists.map(list => {
        const listGames = list.games.map(game => <li key={game.id}>{game.title}</li>)
        return(<ul key={list.id}>{list.list_name}: {listGames}</ul>)
    })

    const allReviews = reviews.map((review) => <li key={review.id}>{review.rating} {review.title}</li>)

    const allWishlists= wishlist.map((wishlist) => <li key={wishlist.id}>{wishlist.title}</li>)


    return(
        <div>
            <h1>{userName}</h1>
            <ul> Lists:
                {allLists}
            </ul>
            <ul> Reviews:
                {allReviews}
            </ul>
            <ul> Wishlist:
                {allWishlists}
            </ul>
        </div>
    )
}

export default UserPage