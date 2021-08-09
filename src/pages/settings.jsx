import { useState, useEffect } from 'react'
import config from '../../config.json'
import { useCookie } from 'next-cookie'

import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

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
        {props.loggedIn ? (
          <Navbar loggedIn="true" />
        ) : (
          <Navbar loggedIn="false" />
        )}
        <div className="container">
          <a href="/profile" className="text-primary">← Back to your profile</a>
        </div>
        <br />
        <div className="container">
          <div align="center">
            <h1 className="title is-4">Settings</h1>
          </div>
          <form onSubmit={submitSettings}>
            <br/>
            {form.success === false ? (
              <div className="notification is-danger"><strong>Error!</strong> {form.errors}</div>
            ) : form.success === true ? (
              <div className="notification is-success"><strong>Success!</strong></div>
            ) : (
              ''
            )}
            <p>Change username</p>
            <br />
            <hr />
            <div className="field">
              <p className="control">
                <input className="input is-rounded" htmlFor="currentPassword2" type="password" name="currentPassword2" placeholder="current password"></input>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input is-rounded" htmlFor="newUsername" type="text" name="newUsername" placeholder="new username"></input>
              </p>
            </div>
            <p>Change password</p>
            <br />
            <hr />
            <div className="field">
              <p className="control">
                <input className="input is-rounded" htmlFor="currentPassword" type="password" name="currentPassword" placeholder="current password"></input>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input is-rounded" htmlFor="newPassword" type="password" name="newPassword" placeholder="new password"></input>
              </p>
            </div>
            <div className="field">
              <input className="is-checkradio is-danger has-background-color" type="checkbox" name="nsfwCheck" id="nsfwCheck"></input>
              <label htmlFor="nsfwCheck"> Do you post NSFW (18+) content?</label>
            </div>
            <div className="field">
              <input className="is-checkradio is-danger has-background-color" type="checkbox" name="privateCheck" id="privateCheck"></input>
              <label htmlFor="nsfwCheck"> Protect your profile</label>
            </div>     
            <div align="center">
              <input className="button is-success is-medium is-rounded" data-callback="submitForm" type="submit" value="Save Changes"></input>
            </div>
          </form>
        </div>
        <br />
      </Container>
      <Footer />
    </>
  )
}
  
export async function getServerSideProps(context) {
  const cookie = useCookie(context)
  let r = await fetch(config.API_BASE + '/users/@me' + cookie.get('user'), {
    method: 'GET',
    headers: {
      Authorization: cookie.get('session')
    }
  })
  r = await r.json()
  if (!r.user && cookie.get('user')) {
    cookie.remove('user')
    cookie.remove('session')
    cookie.remove('loggedIn')
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