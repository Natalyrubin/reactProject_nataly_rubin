import './Header.css';
import ThemeMode from '../ThemeMode/ThemeMode';
import SearchInput from '../SearchInput/SearchInput';
import HamburgerNavBar from '../HamburgerNavBar/HamburgerNavBar';
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';



export default function Header() {


  const auth = useContext(AuthContext)
  const navigate = useNavigate();

  return (
    <nav className='Header'>

      <div className='leftNav'>
        <Link to='/'>
          <img className='logo' alt='logo' src="/assets/img/logo.png" />
        </Link>

        <HamburgerNavBar />

        <ul className='desktopNavBar'>
          <Menu />
        </ul>
      </div>


      <div className='rightNav'>

        <SearchInput />

        <ThemeMode />

        <img className='loginImg' alt='login' src="/assets/img/log-in.png" style={{ display: auth?.isSignedIn ? "none" : "block" }} onClick={() => navigate('/login')} />

        <img
          className='logoutImg'
          alt=''
          src="/assets/img/log-out.png"
          style={{ display: auth?.isSignedIn ? "block" : "none" }}
          onClick={() => {
            auth?.logOut();
            navigate('/home');
          }}
        />

        <img className='userImg' alt={auth?.isSignedIn ? auth.userDetails?.image.alt : ""} src={auth?.isSignedIn ? auth.userDetails?.image.url : "/assets/img/user.png"} />

      </div>


    </nav>
  );
}
