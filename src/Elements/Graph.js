import React, { Component } from 'react';
import './Elements.css';
import {Line} from 'react-chartjs-2';

class Graph extends Component{
  constructor(props) {
    super(props);
    this.state = {data: this.props.data, tablename:this.props.tablename};
  }

  render(){
    if(this.state.tablename.includes("statistics")){

      let info = {
        labels: [],
        datasets: [],
        fillColor:"red"};
      let nbClients = [];
      let income = [];

      this.state.data.map(function(line){
        info["labels"].push(line[1]);
        nbClients.push(line[2]);
        income.push(line[3]);
      });

      let var1 = {label:"Nombre de clients", data:nbClients};
      let var2 = {label:"Recette", data:income};

      info["datasets"].push(var1);
      info["datasets"].push(var2);

      return(
        <Line data={info} />
      );
    }
    else return null;

  }
}
export default Graph;
