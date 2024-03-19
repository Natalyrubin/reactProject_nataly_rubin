import './Default.css'
import { Route, Routes } from 'react-router-dom'


// components
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

// pages
import Home from '../../pages/Home/Home'
import About from '../../pages/About/About'
import NotFound from '../../pages/NotFound/NotFound'
import Cards from '../../pages/Cards/Cards'
import MyCards from '../../pages/MyCards/MyCards'
import Login from '../../pages/Login/Login'
import SignUp from '../../pages/SignUp/SignUp'
import User from '../../pages/User/User'
import FavCards from '../../pages/FavCards/FavCards'
import CreateNewCard from '../../pages/CreateNewCard/CreateNewCard'
import UpdateCard from '../../pages/UpdateCard/UpdateCard'





export default function Default() {

  return (
    <div className="Default">

      <Header />

      <div className="page-content" >
        <Routes >
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cards' element={<Cards />} />
          <Route path='/user' element={<User />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/mycards' element={<MyCards />} />
          <Route path='/favcards' element={<FavCards />} />
          <Route path='/createnewcard' element={<CreateNewCard />} />
          <Route path="/updatecard/:cardId" element={<UpdateCard />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

