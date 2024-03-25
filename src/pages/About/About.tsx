import './About.css'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className='About'>

      <h1>About Us</h1>

      <p>Welcome to the BizCard website! We specialize in creating personalized business cards for businesses, providing quality and fast service.
        <br></br><br></br>
        Our cards offer modern and creative designs with the option for personal customization to suit your business needs. Our design team is here to assist you in creating a business card that perfectly reflects the character and style of your business.
        <br></br><br></br>
        Contact our design team to get started and create your unique business cards!
        <br></br>
        To see our works you can Click here to the Cards Gallery.
      </p>


      <button>
        <Link to="/Cards">Our Works</Link>
      </button>

    </div>
  )
}
