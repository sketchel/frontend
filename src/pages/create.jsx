import { useCookie } from 'next-cookie'
import * as React from 'react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'

import { get, set, update } from 'idb-keyval'
import config from '../../config.json'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { SketchPicker } from 'react-color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEraser, faUndo, faRedo, faDumpster, faTrash, faPaintBrush, faUpload, faFileUpload, faFileImport, faTimes, faPalette } from '@fortawesome/free-solid-svg-icons'

export default function Create(props) {
  const canvas = React.createRef()
  const cookie = useCookie(props.cookie)
  let [color, setColor] = React.useState('#000')
  let [visible, setVisible] = React.useState(false)
  let [modalVisible, setModalVisible] = React.useState(false)
  let [width, setWidth] = React.useState(8)
  let [paths, setPaths] = React.useState(null)

  React.useEffect(async () => {
    let p = await get('paths') || {}
    const load = canvas.current.loadPaths
    if (load) {
      if (p.length > 0) load(p)
    }
  })

  const undoHandler = () => {
    const undo = canvas.current.undo
    if (undo) {
      undo()
    }
  }

  const redoHandler = () => {
    const redo = canvas.current.redo
    if (redo) {
      redo()
    }
  }

  const resetHandler = () => {
    const reset = canvas.current.resetCanvas
    set('paths', [])
    if (reset) {
      reset()
    }
  }

  const clearHandler = () => {
    const clear = canvas.current.clearCanvas
    if (clear) {
      clear()
    }
  } 

  const penHandler = () => {
    const pen = canvas.current.eraseMode
    if (pen) {
      pen(false)
    }
  } 

  const eraserHandler = () => {
    const eraser = canvas.current.eraseMode
    if (eraser) {
      eraser(true)
    }
  } 

  const upload = async (e) => {
    e.preventDefault()
    const upload = canvas.current.exportImage
    let result
    if (upload) result = await upload('png')
    let res = await fetch(config.API_BASE + '/users/upload', {
      method: 'POST',
      headers: {
        Authorization: cookie.get('session'),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        uri: result.toString(),
        title: e.target.title.value,
        description: e.target.description.value
      })
    })
    res = await res.json()
    window.location.href = "/post/" + res.post._id
  }


  const onTogglePicker = () => setVisible(!visible)

  const onUpdate = (updatedPaths) => {
    try {
      set('paths', updatedPaths)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Container>
        {props.loggedIn ? (
          <Navbar loggedIn="true" props={props} />
        ) : (
          <Navbar loggedIn="false" props={props} />
        )}
        <br />
          <script src="/js/canvas.js"></script>
          <script src="/js/slider.js"></script>
          { modalVisible === true && (
            <div className="modal is-active" id="uploadModal">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Upload</p>
                <button className="button is-small" onClick={() => {
                  setModalVisible(false)
                }}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faTimes}/>
                  </span>
                </button>
              </header>
              <form onSubmit={upload}>
                <section className="modal-card-body">
                  <p>Title</p>
                  <div className="field">
                    <p className="control">
                      <input className="input" type="text" name="title" placeholder="Give a title for your post"></input>
                    </p>
                  </div>
                  <p>Description</p>
                  <div className="field">
                    <p className="control">
                      <textarea className="textarea" name="description" placeholder="Describe the post you're making, maybe give a general description of what's up?" id="description"></textarea>
                    </p>
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <div className="buttons">
                    <input className="button is-success is-rounded" type="submit" value="Upload"></input>
                  </div>
                </footer>
              </form>
            </div>
          </div>
          )}
          <div align="center">
            <div className="container columns is-mobile">
              <div align="center" className="column container is-1 panel">
                <div align="center">
                  <FontAwesomeIcon icon={faPaintBrush}></FontAwesomeIcon>
                  <input title="Change brush width" id="sliderWithValue" onChange={(e) => setWidth(e.target.valueAsNumber)}className="vertical-slider vertically-centered more-space-upwards has-output-tooltip has-output is-fullwidth" step="1" min="1" max="400" defaultValue="8" type="range" orient="vertical"/>
                  <output htmlFor="sliderWithValue">{width}</output>
                </div>
                <button id="upload" title="Upload to Sketchel" className="button is-success more-space-upwards" onClick={() => {
                  setModalVisible(true)
                }}><FontAwesomeIcon icon={faUpload}/></button>
                <button id="export" title="Export" className="button is-info more-space-upwards"><FontAwesomeIcon icon={faFileImport}/></button>
                <button id="import" title="Import" className="button is-info space-upwards"><FontAwesomeIcon icon={faFileUpload}/></button>
                
              </div>
              <div className="column">
                <ReactSketchCanvas
                  ref={canvas}
                  width="500px"
                  height="500px"
                  strokeWidth={width}
                  eraserWidth={width}
                  strokeColor={color}
                  onUpdate={onUpdate}
                  paths={paths}
                />
              </div>
              <div className="column container is-1 panel">
                { visible && (
                  <SketchPicker 
                    className="no"
                    color={color} 
                    onChangeComplete={(e) => {
                      setColor(e.hex)
                    }} />
                )}
                <button id="colorpicker" title="Pick a color" className="space-upwards button" onClick={ onTogglePicker } ><FontAwesomeIcon icon={faPalette}/></button>
                <hr />
                <button id="undo" title="Undo" className="more-space-upwards button" onClick={undoHandler}><FontAwesomeIcon icon={faUndo}/></button>
                <button id="redo" title="Redo" className="button space-upwards" onClick={redoHandler}><FontAwesomeIcon icon={faRedo}/></button>
                <hr />
                <button id="pen" title="Pen" className="button more-space-upwards" onClick={penHandler}><FontAwesomeIcon icon={faPen}/></button>
                <button id="eraser" title="Eraser" className="button space-upwards" onClick={eraserHandler}><FontAwesomeIcon icon={faEraser}/></button>
                <hr />
                <button id="reset" title="Reset all" className="button is-danger more-space-upwards" onClick={resetHandler}><FontAwesomeIcon icon={faDumpster}/></button>
                <button id="clear" title="Clear all" className="button is-danger space-upwards" onClick={clearHandler}><FontAwesomeIcon icon={faTrash}/></button>
              </div>
            </div>
          </div>
        <br />
      </Container>
    </>
  )
}
  
export async function getServerSideProps(context) {
  const cookie = useCookie(context)
  let res = await fetch(config.API_BASE + '/users/@me' + cookie.get('user'), {
    method: 'GET',
    headers: {
      Authorization: cookie.get('session')
    }
  })
  res = await res.json()
  if (!res.user && cookie.get('user')) {
    cookie.remove('user')
    cookie.remove('session')
    cookie.remove('loggedIn')
  }
  if (!cookie.get('user')) {
      return {
          redirect: {
              destination: '/login',
              permanent: false
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