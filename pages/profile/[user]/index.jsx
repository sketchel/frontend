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
                      <div className="media-content">
                          <p className="title is-4">{props.user.name}&nbsp;
                          <span class="tag is-info">{props.user.rank}</span>
                          </p> 
                        <p className="subtitle is-6">Joined at <strong>{props.formattedDate}</strong></p>
                      </div>
                    </div>
                  </div>
                  <div className="content has-text-centered">
                    <p id="bio">{props.user.description}</p>
                    <div className="container is-fluid">
                      <hr />
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
