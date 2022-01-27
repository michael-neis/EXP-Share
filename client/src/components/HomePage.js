
function HomePage(){

    return(
        <div className="home-page">
            <ul className="ref-ul">
                <li>
                    <a href='/discover'>Discover</a>
                </li>
                <li>
                    <a href='/suggestions' style={{marginLeft: '-22px'}}>Suggestions</a>
                </li>
                <li>
                    <a href='/lists'>My Lists</a>
                </li>
                <li>
                    <a href='/friends'>Friends</a>
                </li>
                
            </ul>
            <ul className='ref-ul' style={{marginTop: '10%'}}>
                <li>
                    <a href='/search'>Search Games</a>
                </li>
                <li>
                    <a href='/search_users'>Find Users</a>
                </li>
                <li>
                    <a href='/babady_boopy'>Bogos binted</a>
                </li>
            </ul>
        </div>
    )
}

export default HomePage