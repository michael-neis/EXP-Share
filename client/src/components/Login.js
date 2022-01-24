import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login({ setCurrentUser }){

	const [formData, setFormData] = useState({
		username: '',
		password: ''
	})

  let history = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault()

		const configObj = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData)
		}

		fetch('/api/login', configObj).then((resp) =>{ 
			if (resp.ok) {
				resp.json().then((user) => {
                setCurrentUser(user)
                history('/')
        })
			  } else {
          resp.json().then((errors) => {
            alert(errors.error);
          })
			  }
		})

		setFormData({
			username: '',
			password: ''
		})
	}

	return(
      <div className="login-logout">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            // marginLeft: -9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            // position: 'absolute',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <h3>
            Log In
          </h3>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          
            <input type="text" id="username" className="nes-input is-dark" placeholder="Username" value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})} label="Username" style={{marginBottom: 40}}></input>
  
            <input type="password" id="password" className="nes-input is-dark" placeholder="Password" value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})} label="Password" style={{marginBottom: 30}}></input>
            <button
              type="submit"
              className="nes-btn is-primary"
              style={{width: '100%'}}
            >
              Log In
            </button>
            <Grid container>
              <Grid item>
                <a className='login-questions' href="/signup" variant="body2" style={{textDecoration: 'none'}}>
                  {"Don't have an account? Sign Up"}
                </a>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <a className='login-questions' href="/" variant="body2" style={{textDecoration: 'none'}}>
                  {"Back"}
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
	)
}

export default Login