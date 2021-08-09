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
          <Landing2 name={props.name} />
        ) : (
          <Landing />
        )}
      </Container>
      <Footer />
    </>
  )
}
  
export async function getServerSideProps(context) {
  const cookie = useCookie(context)
  let res = await fetch(config.API_BASE + '/users/@me' + cookie.get('user'), {
    method: 'GET',
    headers: {
      Authorization: cookie.get('session')
    }
  })
  res = await res.json()
  if (!res.user && cookie.get('user')) {
    cookie.remove('user')
    cookie.remove('session')
    cookie.remove('loggedIn')
  }
  return {
    props: {
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
      cookie: context.req.headers.cookie || '',
      name: res.user.name
     }
  }
}