import Navbar from '../Components/Navbar/Navbar'
import GradientText from './Animations/GradientText'
import './Home.css'
import { red } from '@mui/material/colors';
const Home = () => {
  return (
    <div>
      <Navbar />

      <div className="home-container">
        <div className="home-text">
          <h1>
            <GradientText
              animationSpeed={10}
              showBorder={false}
              className="custom-class"
            >
              Capture, Store & Share Notes Effortlessly
            </GradientText></h1>
          <p>
            Whether personal or professional, your notes are always secure.
          </p>
          <button className="home-btn">Start Now</button>
        </div>
        <div className="home-image">
          <img src="/HomePageImage.png" alt="Homepage" />
        </div>
      </div>

    </div>
  )
}

export default Home
