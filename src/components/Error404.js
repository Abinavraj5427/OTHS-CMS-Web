import React from 'react';
import "../styles/darkmode.css";
import Navigation from './Navigation';



export default class Error404 extends React.Component 
{
    
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.authenticated,
    }
  }

  

  render(){
    return(
        <div>
            <Navigation/>   
            <div>
                <h1>Please use the navigation bar to get back.</h1>
            </div>
        </div>   
    );
  }
}