import React, { Component } from 'react';
import {Container, Row , Col, Button, Form, Input, FormGroup,Label} from 'reactstrap';
import DataRender from './DataRender.js';
import trash from '../img/trash.png';


class RowRender extends Component{

  constructor(props){
    super(props);
    this.state = {data: this.props.data, labels: this.props.labels, change:false};
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.displayButton = this.displayButton.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // let newData = this.state.data;
  }

  handleEdit(index,d){

    this.state.data[index] = d
  }

  handleChange(){
    this.setState({change:true});
  }

  handleDelete(){
    this.props.onSend(this.state.data[0]);
  }

  handleUpdate(){
    console.log(this.state.data);
    //TODO : récupérer et sauvegarder la valeur
    this.setState({change:false});
    this.props.onUpdate(this.state.data[0],this.state.data);
  }

  displayButton(){
    if(!this.state.change){
      return(
        <td className="editButtons">
          <Col xs="8">
            <Row>
              <Col>
                <Button color="warning" size="sm" style={{height:'35px'}} onClick={this.handleChange}>🖊</Button>
              </Col>
              <Col>
                <Button color="danger" size="sm" style={{height:'35px'}} onClick={this.handleDelete}><img src={trash} style={{height:'20px', width:'20px'}} className="trash" alt="Supprimer" /></Button>
              </Col>
            </Row>
          </Col>
        </td>
      );
    }
    else{
      return(
        <td className="editButtons">
          <Button color="primary" inline size="sm" onClick={this.handleUpdate}>Enregistrer</Button>
        </td>
      );
    }
  }

  render() {
    return(
      <tr>
        {this.displayButton()}
        {
          this.state.data.map((value, index) => {
            return(<td><DataRender value={value} label={this.state.labels[index]} change={this.state.change} onEdit={this.handleEdit} index={index}/></td>)
        })}
      </tr>
    );
  }
}
export default RowRender;
