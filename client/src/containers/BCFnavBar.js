import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {connect} from 'react-redux';
import FinSummary from '../components/FinSummary';


class BCFnavBar extends Component {

componentWillReceiveProps(newProps){
  console.log("BCFnavBar componentWillReceiveProps\n", newProps);

  if(newProps === null){
    return;
  } else {
    console.log("BCFNavBar newProps: ", newProps);
  };
};


render(){

    if (this.props === null){
      return;
    };

    let endingCash = 0;
    let endingCredit = 0;

    if (this.props.projections !== null){
      endingCash = this.props.projections.timeSeries.endingCash;
      endingCredit = this.props.projections.timeSeries.endingCredit;
    };

    return(
      <Navbar fixedTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">BetterCashFlow</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={ e => this.props.history.push("/home") } href="#">Home</NavItem>

            <NavDropdown eventKey={2} title="Planning" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1} onClick={ e => this.props.history.push("/better-cash-flow") }>Dashboard</MenuItem>
              <MenuItem eventKey={2.2}>Plan History</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Linked Accounts</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={4} title="Welcome" id="user-dropdown" pullRight={true}>
              <MenuItem eventKey={4.1}>Profile</MenuItem>
              <MenuItem eventKey={4.2}>Preferences</MenuItem>
              <MenuItem eventKey={4.3}>Logout</MenuItem>
            </NavDropdown>
            <Navbar.Text>
              <FinSummary endCash={endingCash} endCredit={endingCredit} />
            </Navbar.Text>
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

//withRouter gives the NavBar access to match, location, and history properties.  I needed it to avoid nested <a> issue with Link
export default connect(mapStateToProps)(withRouter(BCFnavBar));
