import { useState, useEffect } from 'react'
import Container from '../components/Container'
import Footer from '../components/Footer'

import Landing from '../components/Landing'
import Landing2 from '../components/Landing2'

export default function Home() {
  let [loggedIn] = useState(null);
  useEffect(() => {  
    loggedIn = localStorage.getItem('loggedIn')
  })
  return (
    <>
    
      <Container>
        {loggedIn ? (
          <Landing />
        ) : (
          <Landing2 />
        )}
      </Container>
      <Footer />
    </>
  )
}
  