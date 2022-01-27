import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signup({ setCurrentUser }) {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  let history = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const configObj = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch('api/signup', configObj).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          history('/')
        });
      } else {
        res.json().then((errors) => {
         alert(errors.errors);
        });
      }
    })

    setFormData({
      username: '',
      password: ''
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
      <div className="login-logout">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            // marginLeft: -8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            // position: 'absolute'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <h3>
            Sign up
          </h3>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          
                <input autoComplete='off' type="text" id="username" className="nes-input is-dark" placeholder="Username" value={formData.username}
                onChange={(e) => handleChange(e)} label="Username" style={{marginBottom: 40}}></input>
    
                <input type="password" id="password" className="nes-input is-dark" placeholder="Password" value={formData.password}
                onChange={(e) => handleChange(e)} label="Password" style={{marginBottom: 30}}></input>
        
      
            <button
              type="submit"
              className="nes-btn is-success"
              style={{width: '100%'}}
            >
              Sign Up
            </button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <a className='login-questions' href="/login" variant="body2" style={{textDecoration: 'none'}}>
                  Already have an account? Log in
                </a>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <a className='login-questions' href="/" variant="body2" style={{textDecoration: 'none'}}>
                    Back
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
  );
}

export default Signup