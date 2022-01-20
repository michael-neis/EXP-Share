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
            <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="name" value={searchForm} onChange={(e) => setSearchForm(e.target.value)}/>
            </label>
                <input type="submit" value="Submit" />
            </form>
            <UserCard user={user}/>
        </div>
    )
}

export default SearchUsers