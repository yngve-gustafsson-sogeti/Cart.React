import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { GetCarts } from './components/GetCarts';
import { KeyVaultSecret } from './components/KeyVaultSecret';
import { CreateBlobStorage} from './components/CreateBlobStorage'
import {CamundaStartProcessDMN} from './components/CamundaStartProcessDMN'
import {GetWorkflowTasks} from './components/GetWorkflowTasks'
import {CamundaDirectCallDMN} from './components/CamundaDirectCallDMN'
import {CreateCart} from './components/CreateCart'

import 'bootstrap/dist/css/bootstrap.min.css';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/GetCarts' component={GetCarts} />
        <Route path='/CreateCart' component={CreateCart} />
        <Route path='/KeyVaultSecret' component={KeyVaultSecret} />
        <Route path='/CreateBlobStorage' component={CreateBlobStorage} />
        <Route path='/CamundaStartProcessDMN' component={CamundaStartProcessDMN} />
        <Route path='/GetWorkflowTasks' component={GetWorkflowTasks} />
        <Route path='/CamundaDirectCallDMN' component={CamundaDirectCallDMN} />
        
      </Layout>
    );
  }
}
