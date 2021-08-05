import { useCookie } from 'next-cookie'
import Container from '../components/Container'
import Footer from '../components/Footer'

import Landing from '../components/Landing'
import Landing2 from '../components/Landing2'

export default function Home(props) {
  return (
    <>
      <Container>
        {props.loggedIn ? (
          <Landing2 />
        ) : (
          <Landing />
        )}
      </Container>
      <Footer />
    </>
  )
}
  
export function getServerSideProps(context) {
  const cookie = useCookie(context)
  return {
    props: {
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
     }
  }
}