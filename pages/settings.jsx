import { useState, useEffect } from 'react'
import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Home() {
  let [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {  
    setLoggedIn(localStorage.getItem('loggedIn'))
  })
  return (
    <>
      <Container>
        {loggedIn ? (
          <Navbar loggedIn="true" />
        ) : (
          <Navbar loggedIn="false" />
        )}
        <div className="container">
          
        </div>
      </Container>
      <Footer />
    </>
  )
}
  