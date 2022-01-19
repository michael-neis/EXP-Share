import { useEffect, useState } from "react"
import ListGameCard from './ListGameCard'

function MyLists({currentUser}){

  const [lists, setLists] = useState([])
  const [listGames, setListGames] = useState([])
  const [listDesc, setListDesc] = useState('')

  useEffect(() => {
    fetch(`/api/user_lists/${currentUser.id}`).then(res => {
      if(res.ok){
        res.json()
        .then(data => {
          setLists(data)
        })
      }else{
        res.json()
        .then(errors => {
          console.log(errors)
        })
      }
    })
  }, [])

  const handleListClick = (e) => {
    if(e.target.id === 'reviews'){
      fetch(`api/user_reviews/${currentUser.id}`).then(res => {
        if(res.ok){
          res.json()
          .then(data => {
            setListDesc('reviews')
            setListGames(data)
          })
        }else{
          res.json()
          .then(errors => {
            console.log(errors)
          })
        }
      })
    }else if(e.target.id === 'wishlist'){
      fetch(`api/user_wishlists/${currentUser.id}`).then(res => {
        if(res.ok){
          res.json()
          .then(data => {
            setListDesc('wishlist')
            setListGames(data)
          })
        }else{
          res.json()
          .then(errors => {
            console.log(errors)
          })
        }
      })
    }else{
      fetch(`api/lists/${e.target.id}`).then(res => {
        if(res.ok){
          res.json()
          .then(data => {
            setListGames(data.list_items)
            setListDesc('list')
          })
        }else{
          res.json()
          .then(errors => {
            console.log(errors)
          })
        }
      })
    }
  }

  const handleRemoveFromList = (itemId) => {
    fetch(`/api/list_items/${itemId}`,  { method: 'DELETE' }).then(res => {
      if (res.ok) {
          setListGames(listGames.filter(g => g.id !== itemId))
      } else {
          res.json().then((errors) => {
              alert(errors.errors);
          })
      }
    })
  }

  let displayLists = null

  if(lists.length > 0){
    displayLists = lists.map(list => <li id={list.id} key={list.id} onClick={handleListClick} style={{cursor: 'pointer'}}>{list.list_name}</li>)
  }

  let displayGames = null

  if(listDesc === 'list' && listGames.length === 0){
    displayGames = <h1>No games in list</h1>
  }else if(listDesc === 'list'){
    displayGames = listGames.map(game => <ListGameCard key={game.id} itemId={game.id} game={game.game} listDesc={listDesc} handleRemoveFromList={handleRemoveFromList}/>)
  }else{
    displayGames = listGames.map(game => <ListGameCard key={game.id} itemId={null} game={game} listDesc={listDesc} handleRemoveFromList={handleRemoveFromList}/>)
  }
  
    return(
        <div>
            <ul> My Lists
              <li id='reviews' onClick={handleListClick} style={{cursor: 'pointer'}}>Reviews</li>
              <li id='wishlist' onClick={handleListClick} style={{cursor: 'pointer'}}>Wishlist</li>
              {displayLists}
            </ul>
            {displayGames}
        </div>
    )
}

export default MyLists