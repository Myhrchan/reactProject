import React, { Component } from 'react';
import {Container, Row , Col, Button, Form, Input, FormGroup,Label, Table} from 'reactstrap';
import data from './data.json'
import RowRender from './RowRender.js'
import Graph from './Graph.js'
import './Elements.css';

class Management extends Component{


  constructor(props) {
    super(props);
    this.state = { data: data, tablename: this.props.tablename, insert: false, filterText: "", insertInfo:{}, missingField: {}};
    this.handleChange = this.handleChange.bind(this)
    this.displayHead = this.displayHead.bind(this);
    this.displayBody = this.displayBody.bind(this);
    this.displayFilteredLine = this.displayFilteredLine.bind(this);
    this.insertLine = this.insertLine.bind(this);
    this.cancelInsertLine = this.cancelInsertLine.bind(this);
    this.newLine = this.newLine.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeForInsert = this.handleChangeForInsert.bind(this);
    this.saveNewLine = this.saveNewLine.bind(this);
    this.checkDataId = this.checkDataId.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(event){
    this.setState({ filterText: event.target.value })
  }

  handleUpdate(id,d){

    //find index of element
    var i=0, cond=false, index=null;;
    while(i <this.state.data[this.state.tablename].data.length && cond == false){
      if(this.state.data[this.state.tablename].data[i][0] == id){
        cond = true;
        index=i;
        break;
      }
      i++;
    }

    if(index != null){

      this.setState(data[this.state.tablename].data[i]: d);
    }

  }

  handleDelete(id){
    //find index of element
    var i=0, cond=false, index=null;;
    while(i <this.state.data[this.state.tablename].data.length && cond == false){
      if(this.state.data[this.state.tablename].data[i][0] == id){
        cond = true;
        index=i;
        break;
      }
      i++;
    }

    //delete element by index
    if(index != null){
      var newArray = this.state.data;
      newArray[this.state.tablename].data.splice(index, 1);
      this.setState(data: newArray);
    }
  }

  displayHead(){
    return(
      <thead>
        <th></th>
        {
          //console.log(this.state.data)
          this.state.data[this.state.tablename].head.map(function(colname){
            return <th>{colname}</th>
          })
        }
      </thead>

    );
  }

  displayFilteredLine(line){
    let displayLine = false
    for(let value in line){
      if(line[value].toString().toLowerCase().includes(this.state.filterText.toLowerCase())){
        displayLine = true
      }
    }
    if(displayLine){
      return(
        <RowRender key={line[0]} onSend={this.handleDelete} data={line} labels={this.state.data[this.state.tablename].head}/>)
    }
  }

  displayBody(){
    return(
      <tbody>
      {this.newLine()}

        {
          this.state.data[this.state.tablename].data.map((line) => {
            if(this.state.filterText){
              return(
                this.displayFilteredLine(line)
              )
            }
            else{
              return(
                <RowRender onUpdate={this.handleUpdate} key={line[0]} onSend={this.handleDelete} data={line} labels={this.state.data[this.state.tablename].head}/>)
            }
          })
        }
      </tbody>

    );
  }

  insertLine(){
    this.setState({insert: true});
  }

  cancelInsertLine(){
    this.setState({insert: false});
    this.setState({missingField: {}});
  }

  handleChangeForInsert = (event) => {
    let info = this.state.insertInfo;
    info[event.target.name] = event.target.value;
    this.setState({ insertInfo: info });
  }

  //Return true if the id does not exist in the database
  checkDataId(){
    let size = this.state.data[this.state.tablename].data.length;
    let currentMax = this.state.data[this.state.tablename].data[size-1][0];
    console.log(currentMax);

    return (currentMax + 1);
  }

  saveNewLine(){
    let ok = true;
    var data = this.state.data;
    let missing = null;

    var newArray = [];
    let info = this.state.insertInfo;
    info["ID"] = this.checkDataId();
    this.setState({ insertInfo: info });

    this.state.data[this.state.tablename].head.map((line) => {
      if(this.state.insertInfo.hasOwnProperty(line)){
        newArray.push(this.state.insertInfo[line]);

        if(line in this.state.missingField){
          missing = this.state.missingField;
          delete missing[line];
          this.setState({missingField: missing});
        }
      }
      else{
        missing = this.state.missingField;
        missing[line] = " Ce champ est obligatoire";
        this.setState({missingField: missing});
        ok = false;
      }
     });

    console.log(ok);

    if(ok == true){
      data[this.state.tablename].data.push(newArray);
      this.setState({data: data });
      this.setState({insertInfo : {}});
      this.setState({insert: false});
      this.setState({missingField: {}})

    }
  }

  errorMessage(key){
    if(key in this.state.missingField){
      return (
        <p style={{color:'red'}}>{this.state.missingField[key]}</p>
      );
    }
  }

  newLine = () => {
    if(this.state.insert == true){
        return(
          <tr>
            <td>
              <Button color="primary" onClick={() => this.saveNewLine()}>Enregistrer</Button>
              <Button color="danger" onClick={() => this.cancelInsertLine()}>Annuler</Button>
            </td>
            {
              this.state.data[this.state.tablename].head.map((line, index) => {
                if(this.state.data[this.state.tablename].head[index].toLowerCase().includes("date")){
                  return(
                    <td>
                      <Form>
                        <input type="date" name={line} onChange={this.handleChangeForInsert}/>
                      </Form>
                      {this.errorMessage(line)}
                    </td>);
                }
                else if(this.state.data[this.state.tablename].head[index].toLowerCase().includes("id")){
                  return(
                    <td></td>
                  );
                }
                else return(
                  <td>
                    <Form>
                      <input type="text" name={line} onChange={this.handleChangeForInsert}/>
                    </Form>
                    {this.errorMessage(line)}
                  </td>);
              })
            }
          </tr>
        );
      }
    }



  render() {
    return(
      <div>
        <Row>
          <Col>
            <h2>{this.state.tablename}</h2>
          </Col>
        </Row>
        <Row>
          <Graph data={this.state.data[this.state.tablename].data} tablename={this.state.tablename}/>
        </Row>
        <Row>
          <Col xs="8">
            <Row>
              <Col>
                <Button color="primary" onClick={() => {this.insertLine()}}>Ajouter Ligne</Button>
              </Col>
              <Col>
                <Form>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="filter" placeholder="Filtrer" onChange={this.handleChange} value={this.state.filterText}/>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col xs ="1">
          </Col>
          <Col xs="3">
            <p>Télécharger</p>
          </Col>
        </Row>
        <Row>
          {' '}
        </Row>
        <Row>
          <Table striped className="tableau">
            {this.displayHead()}
            {this.displayBody()}
          </Table>
        </Row>
      </div>
    );
  }
}
export default Management;
