import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-bootstrap-table...

import saveUserPlan from '../actions/saveUserPlan';

class SaveUserPlan extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {

    console.log("user clicked save: ", event);
    this.props.saveUserPlan(this.props);

  }

  render() {

    console.log("SaveUserPlan: ################ ");

    return (
      <button type='button' id="btnsave" onClick={ this.handleClick }
        className={ "btn btn-primary btn-sm" }><span><i className="fa glyphicon glyphicon-floppy-disk fa-floppy-disk"></i></span>
        Save Plan
      </button>
    );
  }
}


function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  // in this scenario it is the whole dataTable
  return{
    transactions: state.transactions,
    planObject: state.planObject
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    saveUserPlan: saveUserPlan
  }, dispatch);
};


export default connect(mapStateToProps,mapDispatchToProps)(SaveUserPlan);
