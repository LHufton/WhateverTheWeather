import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Forecast from './components/Forecast'
import LocationManager from './components/LocationManager'
import './assets/styles/styles.css'
import './assets/styles/forecast.css'

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Forecast} />
          <Route path="/locations" component={LocationManager} />
        </Switch>
      </div>
    </Router>
  )
}

export default App