import React, { Component } from 'react';

import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin, appInsights } from './ApplicationInsights';
// const getCustomerFromDB = useTrackEvent(appInsights, "GetCustomers", "https://localhost:44332/Customer");

export class Customers extends Component {
  static displayName = "Customers";

  constructor(props) {
    super(props);
    this.state = { customers: [], loading: true };
  }

  componentDidMount() {
    this.GetCustomers();
  }

  static renderCustomers(customers) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Title</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer =>
            <tr key={customer.customerId}>
              <td>{customer.title}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.companyName}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Customers.renderCustomers(this.state.customers);

    return (
      <div>
        <h1 id="tabelLabel" >Customers</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async GetCustomers() {
    //getCustomerFromDB();
    const response = await fetch('https://ikeaserver.azurewebsites.net/Customer');
    const data = await response.json();
    this.setState({ customers: data.customers, loading: false });
  }
}

export default withAITracking(reactPlugin, Customers);