import { useState, useEffect } from 'react'
import { Container, Typography, Button, Box, TextField, InputAdornment } from '@mui/material'
import { Alert, TextInput } from '../../components'
import loginImg from '../../assets/images/login.svg'
import registerImg from '../../assets/images/register.svg'
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './register.css'
import { useAppContext } from '../../context/appContext'
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const [viewer, setViewer] = useState(false);
  const { 
    user, 
    isLoading, 
    showAlert, 
    displayAlert, 
    registerUser, 
    loginUser,
    setupUser
  } = useAppContext()
  const handleVisibility = () => {
    setViewer((prev) => !prev);
  };

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember})
  }

  const img = values.isMember ? loginImg : registerImg

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    // console.log('Name: ', name)
    // console.log('Email: ', email )
    // console.log('Password: ', password)
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    
    const currentUser = { name, email, password }
        if (isMember) {
            setupUser({
              currentUser, 
              endPoint: 'login', 
              alertText: 'Login Successful!'
            })
        } else {
          setupUser({
            currentUser, 
            endPoint: 'register', 
            alertText: 'User Created Successfully!'
          })
        }
  }

  useEffect(() => {
    if (user) {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }
  }, [user, navigate])


  return (
    <form onSubmit={onSubmit} className='main-login'>
      <Container
        sx={{ 
            width: 450,
            mt: 3,
            py: 3,
            px: 5,
            borderRadius: 1,
            borderLeft: 5,
            borderColor: 'primary.main',      
            boxShadow: 2,
            bgcolor: 'white',
            '&:hover': {
              boxShadow: 12
              },
          }}   
      >
          <div className='login-header'>
            <div className='login-header-text'>
              <Typography 
                variant="h6" 
                sx={{color: 'info.main', pb: 1}}

              >UP'N DOWN</Typography>
              <Typography variant="h4">{values.isMember ? 'Login' : 'Register'}</Typography>
            </div>
              <img src={img} alt='login-img' className='login-img'/>
          </div>

          {/* Alert Area*/}
          {showAlert && <Alert />}
          {/* <Alert /> */}

          {/* Name Input */}
          {!values.isMember && 
            <TextInput 
              name='name'
              label='Name'
              type='text'
              value={values.name}
              onChange={handleChange}
            />}

          {/* Email Input */}
          <TextInput 
            name='email'
            label='Email'
            type='email'
            value={values.email}
            onChange={handleChange}
          />

          {/* Password Input */}
          <Box py={2}>
            <TextField
              // required
              fullWidth
              name='password'
              label='Password'
              type={viewer ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleVisibility}>
                    {viewer ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <Button 
            variant='contained'
            size='large' 
            endIcon={values.isMember ? <LoginIcon/> : <PersonAddAlt1Icon />} 
            fullWidth
            sx={{mt:2}}
            type='submit'
            disabled={isLoading} 
          >{values.isMember ? 'Login' : 'Register'}</Button>

          <div className='login-bottom-msg'>
            <Typography variant='subtitle1'>
              {values.isMember ? 'Not a member yet?' : 'Already a member?'}
            </Typography>
            <Button variant='text' color='primary' onClick={toggleMember}>
              {values.isMember ? 'Register' : 'Login'}
            </Button>
          </div>
      </Container>
    </form>
  )
}
export default Register