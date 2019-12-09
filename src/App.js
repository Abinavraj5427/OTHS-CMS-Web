import React from 'react';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import Account from './components/Account';
import Home from './components/Home';
import Submission from './components/Submission';
import AddProbs from './components/AddProbs';
import AddUsers from './components/AddUsers';
import TimerPage from './components/TimerPage'
import Navigation from './components/Navigation';
import TeamClarify from './components/TeamClarify';
import JudgeClarify from './components/JudgeClarify';
import Error404 from './components/Error404';
import cookie from 'react-cookies';
import {ip} from "./network";
const axios = require('axios');


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false, role: undefined};
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
    axios.post("http://"+ip+'/othscmsbackend/confirmlogin.php',
      {
        authtoken: token,
      })
      .then(result => {
        this.setState({role: result.data.role});
        this.setState({authenticated: result.data.authenticated})
      }).catch(error => console.log(error))
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
<<<<<<< HEAD
          {this.state.authenticated && this.state.role == "JUDGE" && <Route exact path='/judgeclarify' render = {(props) => <JudgeClarify {...props} ip = {ip} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && this.state.role == "COMPETITOR" && <Route exact path='/teamclarify' render = {(props) => <TeamClarify {...props} ip = {ip} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && this.state.role == "JUDGE" && <Route exact path='/addusers' render = {(props) => <AddUsers {...props} ip = {ip} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && this.state.role == "JUDGE" &&  <Route exact path='/addprobs' render = {(props) => <AddProbs {...props} ip = {ip} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && <Route exact path='/leaderboard' render = {(props) => <Leaderboard {...props} ip = {ip} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && this.state.role == "COMPETITOR" &&  <Route exact path='/submit' render = {(props) => <Submission {...props} ip = {ip} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && <Route exact path='/account' render = {(props) => <Account {...props} ip = {ip} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated} logout={this.logout}/>} />}
          {this.state.authenticated &&  <Route exact path='/home' render = {(props) => <Home {...props} ip = {ip} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {!this.state.authenticated && <Route exact path='/' render = {(props) => <Login {...props} ip = {ip} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated} login={this.login}/>} />}
          <Route component={Error404} ip = {ip}/>
=======
          {this.state.authenticated && this.state.role == "JUDGE" && <Route exact path='/judgeclarify' render = {(props) => <JudgeClarify {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && this.state.role == "COMPETITOR" && <Route exact path='/teamclarify' render = {(props) => <TeamClarify {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && this.state.role == "JUDGE" && <Route exact path='/addusers' render = {(props) => <AddUsers {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && this.state.role == "JUDGE" &&  <Route exact path='/addprobs' render = {(props) => <AddProbs {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && this.state.role == "JUDGE" &&  <Route exact path='/timer' render =  {(props)=><TimerPage />} />}
          {this.state.authenticated && <Route exact path='/leaderboard' render = {(props) => <Leaderboard {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && this.state.role == "COMPETITOR" &&  <Route exact path='/submit' render = {(props) => <Submission {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {this.state.authenticated && <Route exact path='/account' render = {(props) => <Account {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated} logout={this.logout}/>} />}
          {this.state.authenticated &&  <Route exact path='/home' render = {(props) => <Home {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated}/>} />}
          {!this.state.authenticated && <Route exact path='/' render = {(props) => <Login {...props} autoLogin = {this.autoLogin} authenticated = {this.state.authenticated} login={this.login}/>} />}
          <Route component={Error404} />
>>>>>>> 2d82cc10d9493fc39541951bf8e06074bb5cee6c

        </Switch>
      </Router>
    );
  }
}
