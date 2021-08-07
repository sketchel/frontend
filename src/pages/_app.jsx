import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default App