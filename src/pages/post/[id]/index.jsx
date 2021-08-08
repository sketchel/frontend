import { useCookie } from 'next-cookie'
import { useRouter } from 'next/router'
import moment from 'moment'
import config from '../../../../config.json'

import Container from '../../../components/Container'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'


export default function Post(props) {
  const router = useRouter()
  let post = JSON.parse(props.post)
  let author = props.author

  return (
    <>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:image" content={post.image}></meta>
      <title>{props.title} - Sketchel!</title>
      <meta property="og:site_name" content="Sketchel">
      <meta property="og:title" content={props.title + ' by ' + author.name}>
      <meta content={post.description} name="description"/>
      <Container>
        {props.loggedIn ? (
          <Navbar loggedIn="true" />
        ) : (
          <Navbar loggedIn="false" />
        )}
        <br></br>
        <div align="center" className="container">
          <h1 className="title">{post.title}</h1>
          <h2 className="subtitle">{post.description}</h2>
          <div className="box">
            <img src={post.image} alt={post.title} />
          </div>
          <div align="left" className="box">
            <div className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img src={author.avatar} alt={author.name} />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">
                  {author.name}&nbsp;
                  <span className="tag is-info" id="rank">{author.rank}</span>
                </p>
                <p className="subtitle">{moment(author.joinedAt).format("dddd, MMMM Do YYYY")}</p>
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </Container>
      <Footer />
    </>
  )
}
  
export async function getServerSideProps(context) {
  let res = await fetch(config.API_BASE + '/api/post/' + context.query.id, {
    method: 'GET'
  })
  res = await res.json()
  if (!res.success) return { notFound: true }
  const cookie = useCookie(context)
  if (cookie.get('session')) {
    await fetch(config.API_BASE + '/users/view/' + context.query.id, {
      method: 'POST',
      headers: {
        Authorization: cookie.get('session')
      }
    })
  }
  let you = false
  if (cookie.get('user') === res.post.author) you = true
  let resAuthor = await fetch(config.API_BASE + '/api/user/' + res.post.author, {
    method: 'GET'
  })
  resAuthor = await resAuthor.json()
  resAuthor = resAuthor.user
  return {
    props: {
      loggedIn: cookie.get('loggedIn') || null,
      session: cookie.get('session') || null,
      user: cookie.get('user') || null,
      post: JSON.stringify(res.post) || null,
      you: you,
      author: resAuthor
    }
  }
}
