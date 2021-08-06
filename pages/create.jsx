import { useCookie } from 'next-cookie'
import * as React from 'react'
import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { ReactSketchCanvas } from 'react-sketch-canvas'

const styles = {
  'background-image': 'url(https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg)'
};

export default function Create(props) {
  const canvasRef = React.useRef<ReactSketchCanvas>(null)
  return (
    <>
      <link href="/static/css/literallycanvas.css" rel="stylesheet" />
      <script src="/static/js/literallycanvas.js"></script>
      <Container>
        {props.loggedIn ? (
          <Navbar loggedIn="true" />
        ) : (
          <Navbar loggedIn="false" />
        )}
        <br />
          <div className="container">
            <div align="center" className="box row no-gutters canvas-area m-0 p-0">
              <ReactSketchCanvas
                style={styles}
                width="100%"
                height="500px"
                strokeWidth={4}
                strokeColor="black"
              />
            </div>
            <div className="col-3 panel">
              
            </div>
          </div>
        <br />
      </Container>
      <Footer />
    </>
  )
}
  
export function getServerSideProps(context) {
  const cookie = useCookie(context)
  if (!cookie.get('user')) {
      return {
          redirect: {
              destination: '/login',
              permanent: false
          }
      }
  }
  return {
    props: {
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
     }
  }
}