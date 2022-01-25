import {useState} from 'react'
import UserCard from './UserCard'

function SearchUsers(){

    const [user, setUser] = useState(null)
    const [searchForm, setSearchForm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: searchForm
            })
        }

        fetch('/api/search_users', configObj).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setUser(data)
                    setSearchForm('')
                })
            }else{
                res.json()
                .then(error => {
                   alert(error.error)
                })
            }
        })
    }

    return(
        <div>
        <div className="game-search">
            <form onSubmit={handleSubmit}>
            <h2>Search by Username:</h2>
            <label>
                <input autoComplete='off' className="nes-input is-dark" placeholder="Username" type="text" name="name" value={searchForm} onChange={(e) => setSearchForm(e.target.value)} style={{height: '40px'}}/>
            </label>
            <button className="nes-btn is-success" type='submit' style={{fontSize: '14px'}}>Search</button>
            </form>
        </div>
        <div className="friend-container">
            <UserCard user={user}/>
        </div>
        </div>
    )
}

export default SearchUsers