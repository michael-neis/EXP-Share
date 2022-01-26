import { useState } from 'react'

function DiscoverGames(){

    const [showBool, setShowBool] = useState(false)

    if(!showBool){
    return(
        <div className='discover-landing'>
            <h2>We find you suggestions based on your highest reviewed games!</h2>
            <button className='nes-btn is-success' onClick={() => setShowBool(true)}>Show me!</button>
        </div>
    )
    }

    return(
        <div>
            games
        </div>
    )
}

export default DiscoverGames