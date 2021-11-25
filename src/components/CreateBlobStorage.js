import React, { Component } from 'react';

import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin, appInsights } from './ApplicationInsights';
import InputGroup from 'reactstrap/lib/InputGroup';
// const getCustomerFromDB = useTrackEvent(appInsights, "GetCustomers", "https://localhost:44332/Customer");

export class CreateBlobStorage extends Component {
  static displayName = "CreateBlobStorage";

  constructor(props) {
    super(props);
    this.state = { response: "", blobContent: "", blobName: "" };
    this.handleChangeBlobContent = this.handleChangeBlobContent.bind(this);
    this.handleChangeBlobName = this.handleChangeBlobName.bind(this);
  }

  componentDidMount() {
    
  }

  static renderCreateBlobStorage(secret) {
    return (
      <h2>This is the secret: {secret}</h2>
    );
  }

  handleChangeBlobContent(event) {
        this.setState({blobContent: event.target.value});  
  }
  handleChangeBlobName(event) {
        this.setState({blobName: event.target.value});  
  }

  render() {
    return (
      <div>
        <h1 id="tabelLabel" >CreateBlobStorage</h1>
        <p>This component demonstrates creating blob in a storage account.</p>
        <div>Blob content: <input type="text" id="txtBlobContent" name="txtBlobContent" onChange={this.handleChangeBlobContent}></input></div>
        <div>Blob name: <input type="text" id="txtBlobName" name="txtBlobName" onChange={this.handleChangeBlobName}></input></div>
        <div><button id="btnCreateBlob" name="btnCreateBlob" onClick={this.CreateBlobStorage.bind(this)}>Create Blob</button></div>
        <div><h3 id="h3ResponseText" name="h3ResponseText">{this.state.response}</h3></div>
      </div>
    );
  }

  async CreateBlobStorage() {
    alert('Kalle');
    var content = this.state.blobContent;
    var name = this.state.blobName;

    const response = await fetch('https://ikeaserver.azurewebsites.net/BlobStorage/CreateBlob?blobContent=' + content + '&blobName=' + name);
    const data = await response.json();
    this.setState({ response: data.response });
  }
}

export default withAITracking(reactPlugin, CreateBlobStorage);