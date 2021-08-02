import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <>
      <Container>
        <div className="section hero is-info is-bold">
          <div className="">
            <div className="hero-head">
              <Navbar />
            </div>
            <div align="center" className="hero-body has-text-centered justify-center">
              <h1 className="title">
              <i className="em em em-lower_left_paintbrush" aria-role="presentation"></i>
              </h1>
              <h1 className="title"><strong>Sketchel</strong></h1>
              <h2 className="subtitle">The newest platform to upload drawings/animations.</h2>
              <div className="field has-text-centered">
                <p className="control has-text-centered">
                  <a className="button is-light is-rounded is-outlined" href="/signup"> <i class="fas fa-user-plus"></i>&nbsp;Register for Sketchel here. </a>
                  <a className="button left-spaced is-light is-rounded is-outlined" href="/login"> <i class="fas fa-sign-in-alt"></i>&nbsp;Or, you can login here. </a> 
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

  