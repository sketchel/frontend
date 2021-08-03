import { useState } from 'react'

import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import config from '../config.json'
import fetch from 'node-fetch'

export default function Register(props) {
  const [form, setForm] = useState(false)
  const registerUser = async event => {
    event.preventDefault()
    const res = await fetch(
      config.API_BASE + '/account/register',
      {
        body: JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value,
          email: event.target.email.value,
          tosCheck: event.target.tosCheck.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    const result = await res.json()
    if (result.errors) {
      setForm({
        success: result.success,
        message: result.message,
        errors: result.errors.join(', ')
      })
    } else {
      setForm({
        success: result.success,
        message: result.message
      })
    }
    return result
  }

  return (
    <>
      <Container>
        <div className="section hero is-info is-bold">
          <div className="">
            <div className="hero-head">
              <Navbar />
            </div>
          </div>
        </div>
        <br></br>
        <div align="center" className="container box">
          <h1 className="title">Register for Sketchel!</h1>
          {form.success === false ? (
            <div className="notification is-danger"><strong>Error!</strong> {form.errors}</div>
          ) : form.success === true ? (
            <meta http-equiv="refresh" content="0; URL=/" />
          ) : (
            ''
          )}
          <form onSubmit={registerUser} id="signupForm">
            <div className="field">
              <div className="control"> 
                <input className="input is-rounded" autoComplete="name" htmlFor="inputUsername" type="text" name="username" placeholder="username" required></input>
              </div>
            </div>
            <div className="field">
              <div className="control"> 
                <input className="input is-rounded" autoComplete="email" htmlFor="inputEmail" type="email" name="email" placeholder="email" required></input>
              </div>
            </div>
            <div className="field">
              <div className="control"> 
                <input className="input is-rounded" autoComplete="password" htmlFor="inputPassword" type="password" name="password" placeholder="password" required></input>
              </div>
            </div> 
            <div className="content has-text-centered">
              <br />
              <p>Have an account already? <a href="/login" className="text-primary">Login here.</a></p>
              <div className="field">
                <input className="is-checkradio is-success" type="checkbox" name="tosCheck" id="tosCheck" />
                <label htmlFor="tosCheck"> I agree to the <a href="/terms" className="text-primary">Terms of Service</a> and confirm I am 13 or above.</label>
                <p> by registering in you agree to our <a href="/privacy" className="text-primary">Privacy Policy</a></p>
              </div>
            </div>  
            <input className="button is-success is-medium is-rounded g-recaptcha" type="submit" value="Register" data-callback="submitForm"></input>          
            <br /> 
          </form>
        </div>
        <br></br>
      </Container>
      <Footer />
    </>
  )
}
