import React, { Component } from 'react';

import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin, appInsights } from './ApplicationInsights';
// const getCustomerFromDB = useTrackEvent(appInsights, "GetCustomers", "https://localhost:44332/Customer");

export class KeyVaultSecret extends Component {
    static displayName = "KeyVaultSecret";

  constructor(props) {
    super(props);
    this.state = { secret: "", loading: true };
  }

  componentDidMount() {
    this.GetKeyVaultSecret();
  }

  static renderKeyVaultSecret(secret) {
    return (
      <div>
        <h2 id="keyVaultSecret">This is the secret:</h2>
        <div id="secretValue">{secret}</div>
      </div>
      

    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : KeyVaultSecret.renderKeyVaultSecret(this.state.secret);

    return (
      <div>
        <h1 id="tabelLabel" >KeyVaultSecret</h1>
        <p>This component demonstrates fetching data from KeyVault.</p>
        {contents}
      </div>
    );
  }

  async GetKeyVaultSecret() {
    const response = await fetch('https://ikeaserver.azurewebsites.net/KeyVault/GetKeyVaultSecret');
    const data = await response.json();
      this.setState({ secret: data.value, loading: false });
  }
}

export default withAITracking(reactPlugin, KeyVaultSecret);