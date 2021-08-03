import { useState, useEffect } from 'react'
import Container from '../components/Container'
import Footer from '../components/Footer'

import wrapper from '../api/wrapper'

import Landing from '../components/Landing'
import Landing2 from '../components/Landing2'

export default function Home() {
  let [loggedIn, setLoggedIn] = useState(null);
  let [apiWrapper, setapiWrapper] = useState(null);
  useEffect(() => {  
    setLoggedIn(localStorage.getItem('loggedIn'))
    const wrap = new wrapper(localStorage.getItem('session'))
    wrap.getMe()
  })
  return (
    <>
    
      <Container>
        {loggedIn? (
          <Landing2 wrapper={apiWrapper} />
        ) : (
          <Landing wrapper={apiWrapper} />
        )}
      </Container>
      <Footer />
    </>
  )
}
  