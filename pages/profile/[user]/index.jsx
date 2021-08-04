import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import config from '../../../config.json'
import moment from 'moment'

import Container from '../../../components/Container'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'

export default function UserProfile(props) {
  let [loggedIn, setLoggedIn] = useState(null);
  const router = useRouter();

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
        <div className="container is-fluid">
          <div className="container columns is-multiline">
            <div className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <div className="media">
                      <div className="media-left">
                        <figure className="image is-64x64">
                          <img src={props.user.avatar} />
                        </figure>
                      </div>
                      <div className="media-content">
                          <p className="title is-4"><strong id="username">{props.user.name}</strong>&nbsp;
                          <span className="tag is-info" id="rank">{props.user.rank}</span>
                          </p> 
                        <p className="subtitle is-6">Joined at <strong id="joinedAt">{props.formattedDate}</strong></p>
                      </div>
                  </div>
                  <div className="content has-text-centered">
                    <p id="bio">{props.user.description}</p>
                    <div className="container is-fluid">
                      <hr />
                      <div>
                        <nav className="level">
                          <div className="level-item">
                            <a className="button is-white" data-target="followerModal" id="openFollowerModal">
                              <div>
                                <p>Followers: <strong>{props.user.followers.length}</strong></p>
                              </div>
                            </a>
                          </div>
                          <div className="level-item">
                            <a className="button is-white" data-target="followingModal" id="openFollowingModal">
                              <div>
                                <p>Following: <strong>{props.user.following.length}</strong></p>
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
          </div>
        </div>
        <br />
      </Container>
      <Footer />
    </>
  )
}
  
export async function getServerSideProps(context) { 
  let res = await fetch(config.API_BASE + '/api/user/' + context.query.user, {
    method: 'GET'
  })
  res = await res.json()
  if (!res.success) return { notFound: true }
  const formattedDate = moment(res.user.joinedAt).format("dddd, MMMM Do YYYY")
  return {
    props: { user: res.user, formattedDate: formattedDate },
  }
}
