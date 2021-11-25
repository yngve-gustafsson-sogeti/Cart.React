import React, { Component } from 'react';

// import { withAITracking } from '@microsoft/applicationinsights-react-js';
// import { reactPlugin, appInsights } from './ApplicationInsights';
import withAppInsights from './ApplicationInsights';
// const getCustomerFromDB = useTrackEvent(appInsights, "GetCustomers", "https://localhost:44332/Customer");
import 'bootstrap/dist/css/bootstrap.min.css';

export class VariableTable extends Component {
  static displayName = "VariableTable";

  constructor(props) {
    super(props);
    this.state = { variables: props.variables };
  }

  componentDidMount() {
    
  }

    static renderVariableTable(variables) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {variables.map(variable =>
            <tr key={variable.name}>
              <td>{variable.name}</td>
              <td>{variable.value}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    return VariableTable.renderVariableTable(this.state.variables);
  }

  
}

export default VariableTable;