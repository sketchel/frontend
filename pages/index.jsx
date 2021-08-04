import { useState, useEffect } from 'react'
import Container from '../components/Container'
import Footer from '../components/Footer'

import Landing from '../components/Landing'
import Landing2 from '../components/Landing2'

export default function Home() {
  let [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {  
    setLoggedIn(localStorage.getItem('loggedIn'))
  })
  return (
    <>
      <Container>
        {loggedIn ? (
          <Landing2 />
        ) : (
          <Landing />
        )}
      </Container>
      <Footer />
    </>
  )
}
  