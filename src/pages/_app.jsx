import '../style.css'
import Visualizer from '../pages/Visualizer'
import ObjectToggler from './ObjectToggler'
import ShortcutToggler from './ShortcutToggler'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Visualizer />
      <ObjectToggler />
      <ShortcutToggler />
    </div>
  )
}

export default MyApp
