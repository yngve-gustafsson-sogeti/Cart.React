import React, { Component } from 'react';

import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin, appInsights } from './ApplicationInsights';
import InputGroup from 'reactstrap/lib/InputGroup';
// const getCustomerFromDB = useTrackEvent(appInsights, "GetCustomers", "https://localhost:44332/Customer");

export class CamundaStartProcessDMN extends Component {
    static displayName = "CamundaStartProcessDMN";

  constructor(props) {
    super(props);
      this.state = { response: "", typeOfBuyer: "" };
      this.handleChangeBuyerType = this.handleChangeBuyerType.bind(this);
  }

  componentDidMount() {
    
  }

  static renderCreateBlobStorage(secret) {
    return (
      <h2>This is the secret: {secret}</h2>
    );
  }


    handleChangeBuyerType(event) {
        this.setState({typeOfBuyer: event.target.value});  
  }

  render() {
    return (
      <div>
        <h1 id="tabelLabel" >CreateBlobStorage</h1>
            <p>This deomstrate starting a workflow process that uses DMN decision table.</p>
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
           
            <div><button id="btnCreateBlob" name="btnCreateBlob" onClick={this.StartWorkflowProcess.bind(this)}>Start Workflow Process</button></div>
        <div><h3 id="h3ResponseText" name="h3ResponseText">{this.state.response}</h3></div>
      </div>
    );
  }

  async StartWorkflowProcess() {
    alert('Kalle');
    var typeOfBuyer = this.state.typeOfBuyer;
    var url = this.state.backendUrl;

      //const response = await fetch('https://localhost:44348/StartWorkflowInstanceCarProcess?processName=Process_DecideCarType&typeOfBuyer=' + typeOfBuyer);
      const response = await fetch('https://app-camundatemplate-test1.azurewebsites.net/StartWorkflowInstanceCarProcess?processName=Process_DecideCarType&typeOfBuyer=' + typeOfBuyer);
      
    const data = await response.json();
    this.setState({ response: data.response });
  }
}

export default withAITracking(reactPlugin, CamundaStartProcessDMN);