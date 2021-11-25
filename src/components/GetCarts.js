import React, { Component } from 'react';

// import { withAITracking } from '@microsoft/applicationinsights-react-js';
// import { reactPlugin, appInsights } from './ApplicationInsights';
import withAppInsights from './ApplicationInsights';
// const getCustomerFromDB = useTrackEvent(appInsights, "GetCustomers", "https://localhost:44332/Customer");
import {CartItemsTable} from './CartItemsTable';
import developConfig from './SettingsDevelopment.json';
import productionConfig from './SettingsProduction.json';
import Button from 'react-bootstrap/Button';

export class GetCarts extends Component {
  static displayName = "GetCarts";

  constructor(props) {
    super(props);
    var backendUrl = "";
    if(process.env.NODE_ENV == 'development'){
      backendUrl = developConfig.BACKEND_URL;
    } else{
      backendUrl = productionConfig.BACKEND_URL;
    }

    this.state = { carts: [], loading: true, backendUrl: backendUrl };

    this.CheckOutCart = this.CheckOutCart.bind(this);
  }

  componentDidMount() {
    this.GetCarts();
  }

  renderCarts(carts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>&nbsp;</th>
            <th>CartItems</th>
          </tr>
        </thead>
        <tbody>
          {carts.map(cart =>
            <tr key={cart.id}>
              <td>{cart.id}</td>
              <td>{cart.description}</td>
              <td>{cart.statusName}</td>
              <td><Button disabled={(cart.status == 10 ? false : true) } id={'btnCheckOutCart'+ cart.id} name={'btnCheckOutCart'+ cart.id} onClick={() => this.CheckOutCart(cart.id)}>Check Out</Button></td>
              {/* <td>{cart.CreatedBy}</td> */}
              <td><CartItemsTable cartitems={cart.cartItems}></CartItemsTable></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : this.renderCarts(this.state.carts);

    return (
      <div>
        <h1 id="tabelLabel" >Carts</h1>
        {contents}
      </div>
    );
  }

  async GetCarts() {
    //getCustomerFromDB();
    var url = this.state.backendUrl;

    const response = await fetch(url + 'GetCarts');
    const data = await response.json();
      this.setState({ carts: data.carts, loading: false });
  }

  async CheckOutCart(cartId)
  {
    alert(cartId);
    var url = this.state.backendUrl;

    const response = await fetch(url + 'CheckOutCart?cartId=' + cartId);

  }
}

export default GetCarts;