import React, { Component } from 'react';

import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin, appInsights } from './ApplicationInsights';
import InputGroup from 'reactstrap/lib/InputGroup';
// const getCustomerFromDB = useTrackEvent(appInsights, "GetCustomers", "https://localhost:44332/Customer");
import developConfig from './SettingsDevelopment.json';
import productionConfig from './SettingsProduction.json';


export class CamundaDirectCallDMN extends Component {
    static displayName = "CamundaDirectCallDMN";

  constructor(props) {
    super(props);
    var backendUrl = "";
    if(process.env.NODE_ENV == 'development'){
      backendUrl = developConfig.BACKEND_URL;
    } else{
      backendUrl = productionConfig.BACKEND_URL;
    }

      this.state = { backendUrl: backendUrl, response: [], typeOfBuyer: "" };
      this.handleChangeBuyerType = this.handleChangeBuyerType.bind(this);
  }

  componentDidMount() {
    
  }


    handleChangeBuyerType(event) {
        this.setState({typeOfBuyer: event.target.value});  
  }

  render() {
    var url = this.state.backendUrl;
    return (
      <div>
        <h1 id="tabelLabel" >Get DMN Decision</h1>
        <h3>Server URL: {url}</h3>
            <p>This deomstrate how to get a decision straight from DMN engine.</p>
            <div>Select buyer type:
                <select name="typeOfBuyer" id="typeOfBuyer" onChange={this.handleChangeBuyerType}>
                <option value="">Select Category</option>
                    <option value="YoungMan">Young Man</option>
                    <option value="YoungWoman">Young Woman</option>
                    <option value="OldMan">Old Man</option>
                    <option value="OldWoman">Old Woman</option>
                    <option value="ManandWoman">Man and Woman</option>
                    <option value="Family">Family</option>
                    <option value="MiddleAgeMan">Middle Age Man</option>
                    <option value="MiddleAgeWoman">Middle Age Woman</option>
                </select>
            </div>
           
            <div><button id="btnCreateBlob" name="btnCreateBlob" onClick={this.GetDecisionForSelection.bind(this)}>Call DMN</button></div>
        <div>
          <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Suggestion</th>
            </tr>
          </thead>
          <tbody>
            {this.state.response.map(decision =>
              <tr>
                <td>{decision.suggestedCarModel.value}</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    );
  }

  async GetDecisionForSelection() {
    var typeOfBuyer = this.state.typeOfBuyer;
    var url = this.state.backendUrl;

      //const response = await fetch('https://localhost:44348/GetCarModelDecision?typeOfBuyer=' + typeOfBuyer);
      const response = await fetch(url + 'GetCarModelDecision?typeOfBuyer=' + typeOfBuyer);
      
    const data = await response.json();
    this.setState({ response: data });
  }
}

export default withAITracking(reactPlugin, CamundaDirectCallDMN);