
function HomePage(){

    return(
        <div className="home-page">
            <ul className="ref-ul">
                <li>
                    <a href='/search'>Search Games</a>
                </li>
                <li>
                    <a href='/discover'>Discover</a>
                </li>
                <li>
                    <a href='/lists'>My Lists</a>
                </li>
                <li>
                    <a href='/friends'>Friends</a>
                </li>
                <li>
                    <a href='/search_users'>Find Users</a>
                </li>
            </ul>
        </div>
    )
}

export default HomePage