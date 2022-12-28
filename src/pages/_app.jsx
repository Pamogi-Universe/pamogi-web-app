import '../style.css'
import '../styles/index.css'
import Visualizer from '../pages/Visualizer'
import ObjectToggler from './ObjectToggler'
import ShortcutToggler from './ShortcutToggler'
import { Web3ContextProvider } from '../context'
import { ToastContainer } from 'react-toastify'
import { Web3Button } from '../components/'

import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ContextProvider>
      <div>
        <Component {...pageProps} />
        <Web3Button />
        <Visualizer />
        <ObjectToggler />
        <ShortcutToggler />
        <ToastContainer
          hideProgressBar
          position="bottom-right"
          autoClose={2000}
        />
      </div>
    </Web3ContextProvider>
  )
}

export default MyApp
