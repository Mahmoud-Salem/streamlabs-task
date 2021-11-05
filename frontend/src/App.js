import { useEffect,useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { AppContext } from './AppContext';
import './App.scss';
import HTTP from './util/axios';
import LoginScreen from './screens/LoginScreen';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import StreamsPerGame from './screens/StreamsPerGame';
import BiggestStreamPerGame from './screens/BiggestStreamPerGame';
import MedianViewers from './screens/MedianViewers';
import OddNumStreams from './screens/OddNumStreams';
import EvenNumStreams from './screens/EvenNumStreams';
import TopStreams from './screens/TopStreams';
import StreamsWithSame from './screens/StreamsWithSame';
import CustomButton from './components/CustomButton';


function App() {
  const { user,setUser,checkLoggedIn } = useContext(AppContext);
  const logout = ()=>{
    localStorage.removeItem('token');
    setUser(null);
  }
  useEffect(() => {
      if (window.location.hash) {
        const token = window.location.hash.split('&')[0].replace('#access_token=','');

      HTTP.get('/validate-token',{headers : {'twitch-token':token}})
        .then(({data})=>{
            if(data.token){
              localStorage.setItem("token",data.token);
              checkLoggedIn();
            }
        })
    } 
  },[]);

  return (
    <div className="App">
      <Router>
        {user ? (
          <>
          <Navbar />
          <div className="navbar-margin">
            <CustomButton onClick={logout} title={'Log out'} />
            <Switch>
              <Route component={StreamsPerGame} path="/StreamsPerGame" />
              <Route component={BiggestStreamPerGame} path="/BiggestStreamPerGame" />
              <Route component={MedianViewers} path="/MedianViewers" />
              <Route component={OddNumStreams} path="/OddNumStreams" />
              <Route component={EvenNumStreams} path="/EvenNumStreams" />
              <Route component={TopStreams} path="/TopStreams" />
              <Route component={StreamsWithSame} path="/StreamsWithSame" />
              <Route component={Home} path="/" />
              <Redirect to="/" path="*" />
            </Switch>

          </div>
          </>
        ) : (
          <Switch>
            <Route component={LoginScreen} path="/" />
            <Redirect to="/" path="*" />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;