import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useCookie } from 'next-cookie'
import { useState, useEffect } from 'react'
import config from '../../config.json'

export default function Settings(props) {
  let [form, setForm] = useState(false)
  const cookie = useCookie(props.cookie)

  useEffect(async () => {  
    let res = await fetch(
      config.API_BASE + '/users/@me',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': cookie.get('session')
        },
        method: 'GET'
      }
    ) 
    res = await res.json()
    if (!res.success) window.location.href = "/login"
    document.getElementById('privateCheck').checked = res.user.private
    document.getElementById('nsfwCheck').checked = res.user.nsfw
  })

  const submitSettings = async event => {
      event.preventDefault()
      const { 
        newUsername, 
        currentPassword2, 
        currentPassword, 
        newPassword, 
        nsfwCheck, 
        privateCheck 
      } = event.target
      const body = {}
      if (newUsername.value) body.newUsername = newUsername.value
      if (currentPassword2.value) body.currentPassword2 = currentPassword2.value
      if (currentPassword.value) body.currentPassword = currentPassword.value
      if (newPassword.value) body.newPassword = newPassword.value
      body.nsfwCheck = nsfwCheck.checked
      body.privateCheck = privateCheck.checked
      const res = await fetch(
        config.API_BASE + '/users/settings',
        {
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('session')
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
        <main>
          <div className="branding">
            <h1 className="title">⚙️ Settings</h1>
            <h2 className="subtitle">Customize your user settings.</h2>
            {form.success === false ? (
              <div className="error-box">
                <h2 className="subtitle"><strong>Error!</strong> {form.errors}</h2>
              </div>
            ) : form.success === true ? (
              <div className="success-box">
                <h2 className="subtitle"><strong>Success!</strong> Successfully saved your changes.</h2>
              </div>
              ) : (
                ''
            )}
            <div className="fields">
              <form onSubmit={submitSettings}>
                <h2 className="subtitle">Change username</h2>
                <input className="field" htmlFor="currentPassword2" type="password" name="currentPassword2" placeholder="current password"/>
                <input className="field" htmlFor="newUsername" type="text" name="newUsername" placeholder="change username"/>
                <h2 className="subtitle">Change password</h2>
                <input className="field" htmlFor="currentPassword" type="password" name="currentPassword" placeholder="current password"/>
                <input className="field" htmlFor="newPassword" type="password" name="newPassword" placeholder="new password"/>
                <br/>
                <input type="checkbox" name="privateCheck" id="privateCheck" />
                <label htmlFor="privateCheck">Protect my content</label>
                <br/>
                <input type="checkbox" name="nsfwCheck" id="nsfwCheck" />
                <label htmlFor="nsfwCheck">My content is NSFW (18+)</label>
                <hr/>
                <input className="button success" type="submit" value="Save Changes" data-callback="submitForm"/>
              </form>
            </div>
          </div>
        </main>
        <Footer/>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookie = useCookie(context)
  if (!cookie.get('loggedIn')) {
      return {
        redirect: {
            permanent: false,
            destination: "/login"
        }
      }
  }
  return {
    props: {
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
      cookie: context.req.headers.cookie || ''
     }
  }
}