import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useCookie } from 'next-cookie'

import config from '../../config.json'
import fetch from 'node-fetch'
import { useState } from 'react'

export default function Login(props) {
  let [form, setForm] = useState(false)
  const cookie = useCookie(props.cookie)

  const loginUser = async event => {
    event.preventDefault()
    const res = await fetch(
        config.API_BASE + '/account/login',
        {
          body: JSON.stringify({
            username: event.target.username.value,
            password: event.target.password.value,
            rememberMe: event.target.rememberMeCheck.checked
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
        cookie.set('session', result.session)
        cookie.set('loggedIn', true)
        cookie.set('user', result.user)
      }
      return result
    }
  return (
    <>
      <Container>
        <Navbar cookie={props.cookie}/>
        <main className="branding"> 
          <h1 className="title">Login</h1>
          <h2 className="subtitle">Don't have an account? Head to the <a href="/register">register page</a>.</h2>
          {form.success === false ? (
            <div className="error-box">
              <h2 className="subtitle"><strong>Error!</strong> {form.errors}</h2>
            </div>
          ) : form.success === true ? (
            <meta http-equiv="refresh" content="0; URL=/" />
          ) : (
            ''
          )}
          <div className="fields">
            <form onSubmit={loginUser}>
              <input name="username" autoComplete="name" htmlFor="inputUsername" type="text" className="field" placeholder="username or email" required/>
              <input name="password" autoComplete="password" htmlFor="inputPassword" type="password" className="field" placeholder="password" required/>
              <input type="checkbox" name="rememberMeCheck" id="rememberMeCheck" />
              <label htmlFor="rememberMeCheck">Remember me</label>
              <br/>
              <hr/>
              <input className="button success" type="submit" value="Login" data-callback="submitForm"/>
            </form>
          </div>
        </main>
        <Footer/>
      </Container>
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
      cookie: context.req.headers.cookie || ''
     }
  }
}