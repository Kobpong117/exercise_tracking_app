import logo from '../../assets/images/logo.svg'
import main from '../../assets/images/main.svg'
import { Link } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
import './landing.css'

const Landing = () => {
  return (
    <main className='main-landing'>
        <nav className='nav-landing'>
            <img src={logo} alt='app-logo' className='logo'/>
            {/* <span><Typography variant="h4">UP'N DOWN</Typography></span> */}
        </nav>
        <div className='landing'>
            <div className='hero-text'>
                <h1>Exercise <span className='title'>Tracking </span>App</h1>
                <Typography variant='subtitle1'>Register now and push yourself to the next level</Typography>
                <Button variant='contained' color='primary' sx={{mt:2}} component={Link} to='/register'>Login / Register</Button>
            </div>
            <img src={main} alt='hero-img' className='landing-img'/>
        </div>
    </main>
    
  )
}
export default Landing