import { useCookie } from 'next-cookie'
import Container from '../components/Container'
import Footer from '../components/Footer'

import config from '../../config.json'
import Landing from '../components/Landing'
import Landing2 from '../components/Landing2'

export default function Home(props) {
  return (
    <>
      <Container>
        {props.loggedIn ? (
          <Landing2 props={props} />
        ) : (
          <Landing props={props} />
        )}
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