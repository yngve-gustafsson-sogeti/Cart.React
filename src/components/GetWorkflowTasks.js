import React, { Component } from 'react';

// import { withAITracking } from '@microsoft/applicationinsights-react-js';
// import { reactPlugin, appInsights } from './ApplicationInsights';
import withAppInsights from './ApplicationInsights';
// const getCustomerFromDB = useTrackEvent(appInsights, "GetCustomers", "https://localhost:44332/Customer");
import { VariableTable } from './VariableTable';
import developConfig from './SettingsDevelopment.json';
import productionConfig from './SettingsProduction.json';
import Button from 'react-bootstrap/Button';


export class GetWorkflowTasks extends Component {
  static displayName = "GetWorkflowTasks";

  constructor(props) {
    super(props);
    
    var backendUrl = "";
    if(process.env.NODE_ENV == 'development'){
      backendUrl = developConfig.BACKEND_URL;
    } else{
      backendUrl = productionConfig.BACKEND_URL;
    }

    this.state = { backendUrl: backendUrl, workflowTasks: [], loading: true, taskClaimStatus: "", taskIdReadyForShipping: "" };
    this.ClaimTask = this.ClaimTask.bind(this);
    this.CompleteTask = this.CompleteTask.bind(this);
    this.cartReadyForShipping = this.cartReadyForShipping.bind(this);


  }

  componentDidMount() {
    this.GetWorkflowTasks();
  }

  cartReadyForShipping(event){
    const target = event.currentTarget;
    const name = target.name
    const id = target.id;
    const checked = target.checked;
    this.setState({taskIdReadyForShipping: id});  

    alert('Ready');
  }

    renderTasks(workflowTasks) {
    return (
      <div>
        
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
          <th>taskId</th>
          <th></th>
          <th></th>
          <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {workflowTasks.map(task =>
            <tr key={task.userTasks.taskId}>
              <td>
                {task.userTasks.taskId}
              </td>
              <td><Button disabled={task.userTasks.assignee != null ? true : false} id={task.userTasks.taskId} name={task.userTasks.taskId} onClick={() => this.ClaimTask(task.userTasks.taskId)}>Claim Task</Button></td>
              <td><Button disabled={task.userTasks.assignee == null ? true : false} onClick={() => this.CompleteTask(task.userTasks.taskId)}>Complete Task</Button></td>
              <td>
                <div>Ready for shipping</div>
                <input id={task.userTasks.taskId} name={task.userTasks.taskId} 
                      type="checkbox" value="OK" onChange={this.cartReadyForShipping}>
                </input>
              </td>
              <td>{task.userTasks.name}</td>
              <td>{task.userTasks.Description}</td>
              <td>{task.userTasks.assignee}</td>
              <td><VariableTable variables={task.variables}></VariableTable></td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : this.renderTasks(this.state.workflowTasks);

    return (
      <div>
        <h1 id="tabelLabel" >User Tasks</h1>
        {contents}
      </div>
    );
  }

  async GetWorkflowTasks() {
    var url = this.state.backendUrl;

    const response = await fetch(url + 'GetCartTasks');
    const data = await response.json();
    this.setState({ workflowTasks: data, loading: false });
  }

  async ClaimTask(taskId)
  {
    var url = this.state.backendUrl;

    const response = await fetch(url + 'ClaimTask?taskId=' + taskId + '&user=demo');
    const data = await response.json();
    var wfs = this.state.workflowTasks;
    const workflowTask = wfs.find(e => e.userTasks.taskId === taskId);
    workflowTask.userTasks.assignee = 'demo';

    this.setState({ workflowTasks: wfs, taskClaimStatus: data }); // 

  }

  async CompleteTask(taskId)
  {
    var url = this.state.backendUrl;

    var taskIdReadyForShipping = this.state.taskIdReadyForShipping;
    var readyForShipping = false;

    if(taskIdReadyForShipping == taskId)
    {
      readyForShipping = true;
    }
    
    const response = await fetch(url + 'CompleteTask?taskId=' + taskId + '&readyForShipping=' + readyForShipping);
   const data = await response.json();
   this.setState({ taskClaimStatus: data });

    var wfs = this.state.workflowTasks;
    const workflowTask = wfs.find(e => e.userTasks.taskId != '11');

 //   this.setState({ workflowTasks: workflowTask }); // 

  }

}

export default GetWorkflowTasks;