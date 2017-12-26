import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {connect} from 'react-redux';

class BCFnavBar extends Component {

componentWillReceiveProps(newProps){
  console.log("BCFnavBar componentWillReceiveProps\n", newProps);

  if(newProps === null){
    return;
  } else {
    console.log(newProps);
  };
};

render(){
    return(
      <Navbar fixedTop="true">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">BetterCashFlow</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
  };
};

function mapStateToProps(state){
  return{
    projections: state.projections
  };
};


export default connect(mapStateToProps)(BCFnavBar);
