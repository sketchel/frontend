import { useState } from 'react'

import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import config from '../config.json'
import fetch from 'node-fetch'

export default function Login(props) {
    const [form, setForm] = useState(false)
    const loginUser = async event => {
        event.preventDefault()
        const res = await fetch(
          config.API_BASE + '/account/login',
          {
            body: JSON.stringify({
              username: event.target.username.value,
              password: event.target.password.value,
              rememberMe: event.target.rememberMeCheck.value
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
          localStorage.setItem('session', result.session)
          localStorage.setItem('loggedIn', true)
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
              <h1 className="title">Login to Sketchel!</h1>
              {form.success === false ? (
                <div className="notification is-danger"><strong>Error!</strong> {form.errors}</div>
              ) : form.success === true ? (
                <meta http-equiv="refresh" content="0; URL=/" />
              ) : (
                ''
              )}
              <form onSubmit={loginUser} id="loginForm">
                <div className="field">
                  <div className="control"> 
                    <input className="input is-rounded" autoComplete="name" htmlFor="inputUsername" type="text" name="username" placeholder="username" required></input>
                  </div>
                </div>
                <div className="field">
                  <div className="control"> 
                    <input className="input is-rounded" autoComplete="password" htmlFor="inputPassword" type="password" name="password" placeholder="password" required></input>
                  </div>
                </div> 
                <input className="is-checkradio is-success" type="checkbox" name="rememberMeCheck" id="rememberMeCheck" />
                <label htmlFor="rememberMeCheck"> Remember me</label>
                <div className="content has-text-centered">
                  <p>Don't have an account? <a href="/register" className="text-primary">Register here.</a></p>
                </div>  
                <input className="button is-success is-medium is-rounded g-recaptcha" type="submit" value="Login" data-callback="submitForm"></input>          
                <br /> 
              </form>
            </div>
            <br></br>
          </Container>
          <Footer />
        </>
    )
}