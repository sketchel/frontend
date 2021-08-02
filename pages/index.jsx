import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <>
      <Container>
        <div className="section hero is-medium is-info is-bold">
          <div className="">
            <div className="hero-head">
              <Navbar />
            </div>
            <div align="center" className="hero-body has-text-centered justify-center">
              <h1 className="title">
              <i class="em em em-lower_left_paintbrush" aria-role="presentation" aria-label=""></i>
              </h1>
              <h1 className="title"><strong>Sketchel</strong></h1>
              <h2 className="subtitle">The newest platform to upload drawings/animations.</h2>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

  