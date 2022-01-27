import { useEffect, useState } from "react"
import ListGameCard from './ListGameCard'
import ListForm from './ListForm'

function MyLists({currentUser}){

  const [lists, setLists] = useState([])
  const [listGames, setListGames] = useState([])
  const [listDesc, setListDesc] = useState('')
  const [listName, setListName] = useState('')
  const [selectedList, setSelectedList] = useState('default.list.829920')
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
          alert(errors.errors)
        })
      }
    })
  }, [])

  const handleListChange = (e) => {

    if(e.target.value !== 'default.list.829920'){

    setSelectedList(e.target.value)

    if(e.target.value === 'reviews'){
      fetch(`api/user_reviews/${currentUser.id}`).then(res => {
        if(res.ok){
          res.json()
          .then(data => {
            setListDesc('reviews')
            setListGames(data)
            setListName('My Reviews')
          })
        }else{
          res.json()
          .then(errors => {
            alert(errors.error)
          })
        }
      })
    }else if(e.target.value === 'wishlist'){
      fetch(`api/user_wishlists/${currentUser.id}`).then(res => {
        if(res.ok){
          res.json()
          .then(data => {
            setListDesc('wishlist')
            setListGames(data)
            setListName("My Wishlist")
          })
        }else{
          res.json()
          .then(errors => {
            alert(errors.error)
          })
        }
      })
    }else{
      fetch(`api/lists/${e.target.value}`).then(res => {
        if(res.ok){
          res.json()
          .then(data => {
            setListGames(data.list_items)
            setListDesc('list')
            setListName(data.list_name)
          })
        }else{
          res.json()
          .then(errors => {
            alert(errors.error)
          })
        }
      })
    }
  }}


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

    if(selectedList !== 'default.list.829920'){
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
          alert(errors.errors)
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
            console.log(data)
            setLists([...lists, data])
            setShowListModal(false)
            setSelectedList(data.id)
            setListGames(data.list_items)
            setListDesc('list')
            setListName(data.list_name)
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
        setSelectedList('default.list.829920')
        setListGames([])
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
    setSelectedList('default.list.829920')
    setFormData({
      user_id: currentUser.id,
      list_name: '',
      public: true
    })
    handleShow()
  }


  let displayLists = null

  if(lists.length > 0){
    displayLists = lists.map(list => <option id={list.id} value={list.id} key={list.id}>{list.list_name}</option>)
  }

  let displayGames = null

  if(listDesc === 'list' && listGames.length === 0){
    displayGames = <h1 style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}>No games in list</h1>
  }else if(listDesc === 'list'){
    displayGames = listGames.map(game => <ListGameCard key={game.id} itemId={game.id} game={game.game} listDesc={listDesc} handleRemoveFromList={handleRemoveFromList}/>)
  }else{
    displayGames = listGames.map(game => <ListGameCard key={game.id} itemId={null} game={game} listDesc={listDesc} handleRemoveFromList={handleRemoveFromList}/>)
  }
  
    return(
        <div className='all-lists'>
          <h2>My Lists</h2>
          <div className='nes-select is-success' style={{width: '30%', margin: 'auto'}}>
            <select value={selectedList} onChange={handleListChange}>
              <option value="default.list.829920">Select a List</option>
              <option id='reviews' value='reviews'>Reviews</option>
              <option id='wishlist' value='wishlist'>Wishlist</option>
              {displayLists}
            </select>
            </div>
            <br/>
            <br/>
            <button className='nes-btn is-success' onClick={handleNewListClick}>New List</button>
            <br/>
            <br/>
            <h1>{listName}</h1>
            {listDesc === 'list' ? <button className='nes-btn is-warning' onClick={handleEditClick} style={{fontSize: 10}}>Edit List</button> : null}
            <div className="game-container">
              {displayGames}
            </div>
            <ListForm list={selectedList} handleShow={handleShow} showListModal={showListModal} handleClose={handleClose} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} handleDelete={handleDelete}/>
        </div>
    )
}

export default MyLists