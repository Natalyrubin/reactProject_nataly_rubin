import './Home.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

export default function Home() {

  const auth = useContext(AuthContext)

  return (
    <div className='HomePage'>
      <h1>
        <span style={{ display: auth?.isSignedIn ? "block" : "none" }}>Hi {auth?.userDetails?.name.first},</span>
        Welcome To BizCard
      </h1>

      <p>Your Gateway to Exceptional Business Cards!
        <br />
        At BizCard, we take pride in crafting tailor-made business cards that stand out. Our dedicated team is committed to providing top-notch service with a swift turnaround.
        <br /><br />
        Discover a world of contemporary and imaginative designs, each customizable to align with the unique identity of your business. Whether you're aiming for a sleek and professional look or a creative and eye-catching design, we've got you covered.
        <br /><br />
        Our design experts are at your service to help bring your vision to life. Contact us today to embark on the journey of creating business cards that capture the essence and style of your business.
        <br /><br />
        Ready to explore our portfolio? Click here to visit our Cards Gallery and witness the artistry that sets us apart.
        <br /><br />
        Elevate your business presence with BizCard - Where Every Card Tells a Story!
      </p>


      <button>
        <Link to="/Cards">Our Works</Link>
      </button>
    </div>
  )
}
