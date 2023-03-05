import './App.css';
import HomePage from './components/HomePage'
import VideoPage from './components/VideoPage'
import {Switch,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/video/:id'><VideoPage/></Route>
        <Route path='/'><HomePage/></Route>
      </Switch>
    </div>
  );
}

export default App;
