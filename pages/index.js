import Container from '../components/Container'
import Footer from '../components/Footer'
import { button } from "daisyui"
import { FaDiscord } from "react-icons/fa"

export default function Home() {
  return (
    <>
      <Container>
        <div className="hero">
          <div className="card shadow flex-col justify-center hero-content lg:flex-row">
            <div className="card-body">
              <h1 className="font-bold card-title text-3xl mb-2 text-black dark:text-white">
                Sketchel!
              </h1>
              <div>
                <h2 className="text-xl text-black dark:text-white">We're still in development, but consider joining the discord for more updates,<br />and tuning back on this website soon, or later, who knows?</h2>
              </div>
              <div className="mt-4">
                <button 
                  as="a" 
                  href="https://discord.gg/WTJeh8eCVD" 
                  className="btn btn-info"
                >
                  <FaDiscord size="1.5em" />
                  &nbsp;Discord
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

  