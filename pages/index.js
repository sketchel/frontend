import Container from '../components/Container'
import Footer from '../components/Footer'
import { Button } from "@chakra-ui/react"
import { FaDiscord } from "react-icons/fa"

export default function Home() {
  return (
    <>
      <Container>
        <div>
          <h1 className="font-bold text-3xl mb-2 text-black dark:text-white">
            Sketchel!
          </h1>
          <div>
            <h2 className="text-xl text-black dark:text-white">We're still in development, but consider joining the discord for more updates,<br />and tuning back on this website soon, or later, who knows?</h2>
          </div>
          <div className="mt-4">
            <Button 
              as="a" 
              href="https://discord.gg/WTJeh8eCVD" 
              colorScheme="purple"
              target="__blank"
              leftIcon={<FaDiscord size="1.5em" />}
            >
              Discord
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

  