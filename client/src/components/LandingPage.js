import { useNavigate } from 'react-router-dom';

function LandingPage(){
    let history = useNavigate()

    function handleLogin () {
        history('/login')
    }
    function handleSignUp () {
        history('/signup')
    }


    return(
        <div>
            <h1 className="landing-title">EXP Share</h1>
            <div className="login-buttons">
            <button className="nes-btn is-primary" onClick={handleLogin} style={{marginRight: '5%'}}>Login</button>
            <button className="nes-btn is-success" variant="info" onClick={handleSignUp} style={{marginLeft: '5%'}}>Signup</button>
            </div>
        </div>
    )
}

export default LandingPage