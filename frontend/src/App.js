import './App.css';
import HomePage from './components/HomePage'
import VideoPage from './components/VideoPage'
import {Switch,Route} from 'react-router-dom'
export const config={
  endpoint:'https://f3844b82-06c1-419e-9d99-3b25486b3c6b.mock.pstmn.io/'
}
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/video/:videoId'><VideoPage/></Route>
        <Route path='/'><HomePage/></Route>
      </Switch>
    </div>
  );
}

export default App;
