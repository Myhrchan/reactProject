import React, { Component } from 'react';
import {Container, Row , Col, ListGroup, ListGroupItem,Nav,NavItem,NavLink} from 'reactstrap';
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Management from './Elements/Management.js'

class App extends Component {

  setSelected(elem){
    console.log(elem+"o")

  }
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
              <header>
                <h1>Gestion React - Champalier Mariane - Castel Antoine</h1>
              </header>
          </Row>
          <BrowserRouter>
            <div>
              <Row>

              </Row>
              <Row>
                <Col xs="12" md="3">
                  <Nav vertical className="menu">
                    <NavItem className="item">
                      <NavLink><Link onClick={this.setSelected(0)} to="/" className="linkItem">Attractions</Link></NavLink>
                    </NavItem>
                    <NavItem className="item">
                      <NavLink><Link onClick={this.setSelected(1)} to="/buildings" className="linkItem">Batiments</Link></NavLink>
                    </NavItem>
                    <NavItem className="item">
                      <NavLink><Link onClick={this.setSelected(2)} to="/staff" className="linkItem">Personnel</Link></NavLink>
                    </NavItem>
                    <NavItem className="item">
                      <NavLink><Link onClick={this.setSelected(3)} to="/maintenance" className="linkItem">Maintenance</Link></NavLink>
                    </NavItem>
                    <NavItem className="item">
                      <NavLink><Link onClick={this.setSelected(4)} to="/statistics" className="linkItem">Statistiques</Link></NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col xs="12" md="9">
                  <Route exact path="/" component={() => <Management tablename="attractions"/>}/>
                  <Route path="/buildings" component={() => <Management tablename="buildings"/>}/>
                  <Route path="/staff" component={() => <Management tablename="staff"/>}/>
                  <Route path="/maintenance" component={() => <Management tablename="maintenance"/>}/>
                  <Route path="/statistics" component={() => <Management tablename="statistics"/>}/>
                </Col>
              </Row>
            </div>
          </BrowserRouter>
        </Container>
      </div>
    );
  }
}

export default App;
