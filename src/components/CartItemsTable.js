import React, { Component } from 'react';

// import { withAITracking } from '@microsoft/applicationinsights-react-js';
// import { reactPlugin, appInsights } from './ApplicationInsights';
import withAppInsights from './ApplicationInsights';
// const getCustomerFromDB = useTrackEvent(appInsights, "GetCustomers", "https://localhost:44332/Customer");

export class CartItemsTable extends Component {
  static displayName = "CartItemsTable";

  constructor(props) {
    super(props);
    this.state = { cartitems: props.cartitems };
  }

  componentDidMount() {
    
  }

    static renderCartItems(cartitems) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {cartitems.map(cartitem =>
            <tr key={cartitem.id}>
              <td>{cartitem.id}</td>
              <td>{cartitem.itemName}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    return CartItemsTable.renderCartItems(this.state.cartitems);
  }

  
}

export default CartItemsTable;