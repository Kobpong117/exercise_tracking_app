import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import { useState } from 'react'
import { Button, Typography } from '@mui/material'


const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const { 
    toggleSidebar, 
    logoutUser, 
    user 
  } = useAppContext()
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>My Dashboard</h3>
        </div>
        <div className='btn-container'>
          <Button 
            variant="contained"
            // type='button'
            // className='btn'
            onClick={() => setShowLogout(!showLogout)}
            
          >
            <FaUserCircle />
            <Typography variant="subtitle2" sx={{mx:2}}>
              {user && user.name}
            </Typography>
            <FaCaretDown />
          </Button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={() => setShowLogout(!showLogout)}>
            <Typography variant="subtitle1" onClick={logoutUser}>
              Logout
            </Typography>
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
