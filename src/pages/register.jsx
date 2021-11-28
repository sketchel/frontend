import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useCookie } from 'next-cookie'

import config from '../../config.json'
import fetch from 'node-fetch'
import { useState } from 'react'



export default function Register(props) {
    let [form, setForm] = useState(false)
    const cookie = useCookie(props.cookie)
    const registerUser = async event => {
        event.preventDefault()
        const res = await fetch(
          config.API_BASE + '/account/register',
          {
            body: JSON.stringify({
              username: event.target.username.value,
              password: event.target.password.value,
              confirmPassword: event.target.confirmPassword.value,
              email: event.target.email.value,
              tosCheck: event.target.tosCheck.checked
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
                <Navbar cookie={props.cookie}/>
                <main className="branding"> 
                <h1 className="title">Register</h1>
                <h2 className="subtitle">Already have an account? Head to the <a href="/login">login page</a>.</h2>
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
                    <form onSubmit={registerUser}>
                        <input name="username" autoComplete="name" htmlFor="inputUsername" type="text" className="field" placeholder="username" required/>
                        <input name="email" autoComplete="email" htmlFor="inputEmail" type="email" className="field" placeholder="email" required/>
                        <input name="password" autoComplete="password" htmlFor="inputPassword" type="password" className="field" placeholder="password" required/>
                        <input className="field" autoComplete="password" htmlFor="inputConfirmPassword" type="password" name="confirmPassword" placeholder="confirm password" required/>
                        <input type="checkbox" name="tosCheck" id="tosCheck" />
                        <label htmlFor="tosCheck">I agree to the <a href="/tos">Terms of Service</a> and confirm I am 13 or above.</label>
                        <p>By registering, you agree to the <a href="/privacy">privacy policy</a>.</p>
                        <hr/>
                        <input className="button success" type="submit" value="Register" data-callback="submitForm"/>
                    </form>
                </div>
                <br/>
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