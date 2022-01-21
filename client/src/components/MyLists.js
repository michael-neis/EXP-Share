import { useEffect, useState } from "react"
import ListGameCard from './ListGameCard'
import ListForm from './ListForm'

function MyLists({currentUser}){

  const [lists, setLists] = useState([])
  const [listGames, setListGames] = useState([])
  const [listDesc, setListDesc] = useState('')
  const [listName, setListName] = useState('')
  const [selectedList, setSelectedList] = useState('')
  const [showListModal, setShowListModal] = useState(false)
  const [formData, setFormData] = useState({
      user_id: currentUser.id,
      list_name: '',
      public: true
  })

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
            console.log(data)
            setListDesc('reviews')
            setListGames(data)
            setListName(e.target.innerHTML)
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
            console.log(data)
            setListDesc('wishlist')
            setListGames(data)
            setListName(e.target.innerHTML)
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
            console.log(data)
            setListGames(data.list_items)
            setListDesc('list')
            setListName(e.target.innerHTML)
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

  const handleEditClick = () => {
    const selected = lists.find(list => list.list_name === listName)
    setSelectedList(selected)
    setFormData({
      user_id: currentUser.id,
      list_name: selected.list_name,
      public: selected.public
    })
    handleShow()
  }

  const handleShow = () => {
    setShowListModal(true)
  }

  const handleClose = () => {
    setShowListModal(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(selectedList){
    const configObj = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }

    fetch(`/api/lists/${selectedList.id}`, configObj).then(res => {
      if(res.ok){
        res.json()
        .then(data => {
          const updatedList = lists.map(list => list.id === data.id ? data : list)
          setLists(updatedList)
          setListName(data.list_name)
          setShowListModal(false)
        })
      }else{
        res.json()
        .then(errors => {
          console.log(errors)
        })
      }
    })
    }else{
      const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      }

      fetch('/api/lists', configObj).then(res => {
        if(res.ok){
          res.json()
          .then(data => {
            setLists([...lists, data])
            setShowListModal(false)
          })
        }else{
          res.json()
          .then(errors => {
            alert(errors.errors)
          })
        }
      })
    }
  }

  const handleDelete = () => {
    fetch(`/api/lists/${selectedList.id}`, {method: 'DELETE'}).then(res => {
      if(res.ok){
        const deletedList = lists.filter(list => list.id !== selectedList.id)
        setLists(deletedList)
        setListDesc('')
        setListName('')
      }else{
        res.json()
        .then(errors => {
          alert(errors.errors)
        })
      }
    })
  }

  const handleNewListClick = () => {
    setSelectedList(null)
    setFormData({
      user_id: currentUser.id,
      list_name: '',
      public: true
    })
    handleShow()
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
            <button onClick={handleNewListClick}>New List</button>
            <h1>{listName}</h1>
            {listDesc === 'list' ? <button onClick={handleEditClick}>Edit List</button> : null}
            {displayGames}
            <ListForm list={selectedList} handleShow={handleShow} showListModal={showListModal} handleClose={handleClose} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} handleDelete={handleDelete}/>
        </div>
    )
}

export default MyLists