import React, { Component } from 'react';

import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin, appInsights } from './ApplicationInsights';


import InputGroup from 'reactstrap/lib/InputGroup';
// const getCustomerFromDB = useTrackEvent(appInsights, "GetCustomers", "https://localhost:44332/Customer");
import developConfig from './SettingsDevelopment.json';
import productionConfig from './SettingsProduction.json';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

export class CreateCart extends Component {
  static displayName = "CreateCart";

  constructor(props) {
    super(props);
    var backendUrl = "";
    if(process.env.NODE_ENV === 'development'){
      backendUrl = developConfig.BACKEND_URL;
    } else{
      backendUrl = productionConfig.BACKEND_URL;
    }

    this.state = { backendUrl: backendUrl, cartId: "", cartItemName: "", cartItems: [], cartCheckedOut: false };
    this.handleChangeCartItemName = this.handleChangeCartItemName.bind(this);

  }

  componentDidMount() {
    
  }


  handleChangeCartItemName(event) {
        this.setState({cartItemName: event.target.value});  
  }

  render() {
      
    return (
        <div>
        <h1 id="tabelLabel" >Create Cart</h1>
        <p>Click on Create Cart first. After that fill in Item Name and click Add Item</p>
        <h3>CartId: {this.state.cartId}</h3>
        
        <div className="container">
          <div><Button disabled={this.state.cartId === "" ? false : true } id="btnCreateCart" name="btnCreateCart" onClick={this.CreateCart.bind(this)}>Create Cart</Button></div>
          <div className="row">&nbsp;</div>
          <div class="form-outline">
            Item Name: <input type="text" className="form-control" disabled={(this.state.cartId !== "" ? false : true) || (this.state.cartCheckedOut) } id="txtItemName" name="txtItemName" onChange={this.handleChangeCartItemName}></input>
          </div>
          <div className="row">&nbsp;</div>
          <div className="row">
            <div className="col-xs-12 col-md-8 h-50 d-inline-block"><Button disabled={(this.state.cartId !== "" ? false : true) || (this.state.cartCheckedOut) } id="btnCreateCartItem" name="btnCreateCart" onClick={this.CreateCartItem.bind(this)}>Create Cart Item</Button></div>
          </div>
          <div className="row">&nbsp;</div>
          <div class="row">
            <div className="col-xs-12 col-md-8"><Button disabled={(this.state.cartId !== "" ? false : true) || (this.state.cartCheckedOut) } id="btnCheckOutCart" name="btnCheckOutCart" onClick={this.CheckOutCart.bind(this)}>Check Out Cart</Button></div>
          </div>
        </div>
        <div className="row">&nbsp;</div>
        <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Cart Item</th>
          </tr>
        </thead>
        <tbody>
          {this.state.cartItems.map(item =>
            <tr key={item}>
              <td>{item}</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    );
  }

  async CheckOutCart() {
    withAITracking.trackMetric("Create Cart CheckoutCart");
    var cartId = this.state.cartId;
    var url = this.state.backendUrl;

    this.setState({cartCheckedOut: true });
  }

  async CreateCartItem() {
    var url = this.state.backendUrl;
    var cartId = this.state.cartId;
    var itemName = this.state.cartItemName;
    var cartItems = this.state.cartItems;
    cartItems.push(itemName);
    this.setState({cartItems: cartItems});

    await fetch(url + 'AddCartItem?cartId=' + cartId + '&itemName=' + itemName);
  }

  async CreateCart() {
    withAITracking.trackMetric("Create Cart CreateCart");
    var url = this.state.backendUrl;

    const response = await fetch(url + 'CreateCart');
    const data = await response.json();
    this.setState({ cartId: data.cartId });
  }

}

export default withAITracking(reactPlugin, CreateCart);