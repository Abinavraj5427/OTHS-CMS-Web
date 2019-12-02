import React from 'react';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import Account from './components/Account';
import Home from './components/Home';
import Submission from './components/Submission';
import AddProbs from './components/AddProbs';
import AddTeams from './components/AddTeams';
import cookie from 'react-cookies';
const axios = require('axios');



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
    this.autoLogin = this.autoLogin.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.autoLogin();
  }

  componentDidMount(){
    this.autoLogin();

  }

  autoLogin (){
    var token = cookie.load('auth-token');
    cookie.load('auth-token') &&
    axios.post('http://localhost/othscmsbackend/confirmlogin.php',
      {
        authtoken: token,
      })
      .then(result => {
        console.log(result);
        this.setState({authenticated: result.data.authenticated})
      }).catch(error => console.log(error))
      console.log("Authenticated: " +this.state.authenticated);
  }

  login(){
    this.setState({authenticated:true});
  }

  logout(){
    this.setState({authenticated:false});
  }

  render(){

    return(
      <Router>
        <Switch>
          {this.state.authenticated && <Route exact path='/addteams' render = {(props) => <AddTeams {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && <Route exact path='/addprobs' render = {(props) => <AddProbs {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && <Route exact path='/leaderboard' render = {(props) => <Leaderboard {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && <Route exact path='/submit' render = {(props) => <Submission {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && <Route exact path='/account' render = {(props) => <Account {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated} logout={this.logout}/>} />}
          {this.state.authenticated && <Route exact path='/home' render = {(props) => <Home {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          <Route path='/' render = {(props) => <Login {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated} login={this.login}/>} />
        </Switch>
      </Router>
    );
  }
}
