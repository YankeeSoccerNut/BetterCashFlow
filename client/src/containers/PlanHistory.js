import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import getUserPlanHistory from '../actions/getUserPlanHistory';
import planSelected from '../actions/planSelected';

class PlanHistory extends Component {

  constructor(props) {
     super(props);
  }

  componentWillMount(){
    console.log("componentWillMount PlanHistory auth: ", this.props.auth);

    // Don't do anything if the user is not logged in...
    if (!this.props.auth.userLoggedIn){
      return(null);
    };

    //otherwise, we can get the user_plans (Plan History)...
    this.props.getUserPlanHistory();

  };



  render() {
    console.log("RENDERING>>>>>>Plan History this.props: ", this.props)

    // Don't render if no token....
    if (!this.props.auth.userLoggedIn){
      console.log("no render...not logged in")
      this.props.history.push("/");
      return null;
    };

    return(
      <div>
        <h1>Plan History</h1>
      </div>
    );
  };

};

function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  // in this component it is the bank account info
  // console.log("mapStateToProps....FinAccount")
  // console.log(state);
  return{
    auth: state.auth,
    planHistory: state.planHistory
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getUserPlanHistory: getUserPlanHistory,
    planSelected: planSelected
  }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(PlanHistory);
