import React from 'react';
import "../styles/popup.css";
import {ip} from "../network";
const axios = require('axios');

export default class RunPopup extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        filePath: '',
        systemTime: '',
        team: '',
        code: [],
      }
      this.collectProblemData = this.collectProblemData.bind(this);
    }

    componentDidMount(){
      this.collectProblemData();
    }

    collectProblemData(){
      axios.post("http://"+ip+'/othscmsbackend/problemdata.php',
      {
        id: this.props.id,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }).then(result=>{
        this.setState(
          {
            filePath: result.data.filePath,
            systemTime: result.data.systemTime,
            team: result.data.team,
            code: result.data.code,
          });
      }).catch(error => console.log(error));
    }

    render() {

      return (
        <div  className='popup'>
          <div class="codeFile" className='popup_inner'>

              {/* <h2>{this.state.filePath}</h2>
              <h2>{this.state.systemTime}</h2>
              <h2>{this.state.team}</h2> <h2>{ans}</h2>*/}

              {this.state.code && this.state.code.map(line => <div class="codeFile"> <h1>{line}</h1></div> )}



            <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
  }
