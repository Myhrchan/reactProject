import React, { Component } from 'react';
import {Container, Row , Col, Button, Form, Input, FormGroup,Label, Table} from 'reactstrap';

class DataRender extends Component{

  constructor(props){
    super(props);
    this.state = {index: this.props.index, value: this.props.value, label: this.props.label, change:this.props.change};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
    this.props.onEdit(this.state.index, event.target.value)
  }

  render(){
    if(this.props.change == true){
      if(this.state.label.toLowerCase().includes("date")){
        return(
         <p>
           <input type="date" name="value" onChange={this.handleChange} value={this.state.value}/>
         </p>
       );
      }
      else if(this.state.label == "ID"){
        return(
          <p>
            {this.state.value}
          </p>
        );
      }
      else return(
        <p>
          <input type="text" name="value" onChange={this.handleChange} value={this.state.value}/>
        </p>
      );
    }
    else{
      return(
        <p>
          {this.state.value}
        </p>
      );
    }

  }

}
export default DataRender;
