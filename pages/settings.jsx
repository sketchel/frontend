import { useState, useEffect } from 'react'
import config from '../config.json'

import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Settings() {
  let [form, setForm] = useState(false)
  let [loggedIn, setLoggedIn] = useState(null);
  useEffect(async () => {  
    setLoggedIn(localStorage.getItem('loggedIn'))
    let res = await fetch(
      config.API_BASE + '/users/@me',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('session')
        },
        method: 'GET'
      }
    )
    res = await res.json()
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
      console.log(body)

      const res = await fetch(
        config.API_BASE + '/users/settings',
        {
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('session')
          },
          method: 'POST'
        }
      )
      const result = await res.json()
      console.log(result)
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
        {loggedIn ? (
          <Navbar loggedIn="true" />
        ) : (
          <Navbar loggedIn="false" />
        )}
        <div className="container">
          {form.success === false ? (
            <div className="notification is-danger"><strong>Error!</strong> {form.errors}</div>
          ) : form.success === true ? (
            <div className="notification is-success"><strong>Success!</strong></div>
          ) : (
            ''
          )}
          <form onSubmit={submitSettings}>
            <br/>
            <p>Change username</p>
            <br />
            <hr />
            <div className="field">
              <p className="control">
                <input className="input is-rounded" for="currentPassword2" type="password" name="currentPassword2" placeholder="current password"></input>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input is-rounded" for="newUsername" type="text" name="newUsername" placeholder="new username"></input>
              </p>
            </div>
            <p>Change password</p>
            <br />
            <hr />
            <div className="field">
              <p className="control">
                <input className="input is-rounded" for="currentPassword" type="password" name="currentPassword" placeholder="current password"></input>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input is-rounded" for="newPassword" type="password" name="newPassword" placeholder="new password"></input>
              </p>
            </div>
            <div className="field">
              <input className="is-checkradio is-danger has-background-color" type="checkbox" name="nsfwCheck" id="nsfwCheck"></input>
              <label for="nsfwCheck"> Do you post NSFW (18+) content?</label>
            </div>
            <div className="field">
              <input className="is-checkradio is-danger has-background-color" type="checkbox" name="privateCheck" id="privateCheck"></input>
              <label for="nsfwCheck"> Protect your profile</label>
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
  