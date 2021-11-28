import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useCookie } from 'next-cookie'

export default function Profile(props) {
  return (
    <>
      <Container>
        <Navbar cookie={props.cookie}/>
        <main className="branding">
          <h1 className="title">🚧W.I.P.</h1>
          <h2 className="subtitle">This page is a work in progress, come back soon when it's done!</h2>
        </main>
        <Footer/>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookie = useCookie(context)
  return {
    props: {
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
      cookie: context.req.headers.cookie || ''
     }
  }
}