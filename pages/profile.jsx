import { useState, useEffect } from 'react'
import config from '../config.json'
import moment from 'moment'

import Container from '../components/Container'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Profile(props) {
  let [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {  
    setLoggedIn(localStorage.getItem('loggedIn'))
    loadInData()
  }, [])

  const submitChanges = async (event) => {
    event.preventDefault()
    let res = await fetch(config.API_BASE + '/users/profile', {
      body: JSON.stringify({
        bio: event.target.bio.value
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('session')
      },
      method: 'POST'
    })
    res = await res.json()
    window.location.reload()
  }

  const loadInData = async () => {
    let res = await fetch(config.API_BASE + '/api/user/' + localStorage.getItem('user'), {
      method: 'GET'
    })
    res = await res.json()
    if (!res.success) window.location.href = "/login"
    const formattedDate = moment(res.user.joinedAt).format("dddd, MMMM Do YYYY")
    document.getElementById('bio').innerText = res.user.description
    document.getElementById('bio2').innerText = res.user.description
    document.getElementById('rank').innerText = res.user.rank
    document.getElementById('username').innerText = res.user.name
    document.getElementById('followers').innerText = res.user.followers.length
    document.getElementById('following').innerText = res.user.following.length
    document.getElementById('avatar').src = res.user.avatar
    document.getElementById('joinedAt').innerText = formattedDate
  }
  return (
    <>
      <Container>
        {loggedIn ? (
          <Navbar loggedIn="true" />
        ) : (
          <Navbar loggedIn="false" />
        )}
        <script src="/js/modal.js"></script>
        <script src="/js/autolink.js"></script>
        <div className="modal is-clipped" id="profileModal">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p class="modal-card-title">Edit profile</p>
              <button className="button is-small" aria-label="close" id="exitModal" data-target="profileModal">
                <span className="icon is-small">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </header>
            <form onSubmit={submitChanges}>
              <section className="modal-card-body">
                <p>Bio</p>
                <div className="field">
                  <p className="control">
                    <textarea className="textarea" name="bio" placeholder="Say something about yourself, like, you like doing backflips, or something." id="bio2"></textarea>
                  </p>
                </div>
              </section>
              <footer class="modal-card-foot">
                <div className="buttons">
                  <input className="button is-success is-rounded" type="submit" value="Save Changes"></input>
                </div>
              </footer>
            </form>
          </div>
        </div>
        <div className="container is-fluid" onLoadingComplete={loadInData}>
          <div className="container columns is-multiline">
            <div className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <div className="media">
                      <div className="media-left">
                        <figure className="image is-64x64">
                          <img id="avatar" />
                        </figure>
                      </div>
                      <div className="media-content">
                          <p className="title is-4"><strong id="username">Your Name</strong>&nbsp;
                          <span className="tag is-info" id="rank">Your Rank</span>
                          </p> 
                        <p className="subtitle is-6">Joined at <strong id="joinedAt">date</strong></p>
                      </div>
                  </div>
                  <div className="content has-text-centered">
                    <p id="bio">Description</p>
                    <div className="container is-fluid">
                      <hr />
                      <a className="button is-info" data-target="profileModal" id="showModal">Edit profile</a>
                    </div>
                  </div>
                  <div>
                    <nav className="level">
                      <div className="level-item">
                        <a className="button is-white" data-target="followerModal" id="openFollowerModal">
                          <div>
                            <p>Followers: <strong id="followers">5</strong></p>
                          </div>
                        </a>
                      </div>
                      <div className="level-item">
                        <a className="button is-white" data-target="followingModal" id="openFollowingModal">
                          <div>
                            <p>Following: <strong id="following">5</strong></p>
                          </div>
                        </a>
                      </div>
                    </nav> 
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
        <br />
      </Container>
      <Footer />
    </>
  )
}