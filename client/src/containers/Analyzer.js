import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import newObservations from '../actions/newObservations';

class Analyzer extends Component {

  componentWillReceiveProps(nextProps){
    console.log("nextProps in Analyzer\n", nextProps);
  };


  render() {

    console.log("IN render() IN Analyzer*********", this.props);


    return (
      <div>
        <h4>Analyzer Component Goes Here</h4>
      </div>
    );
  }
}
function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  return{
    projections: state.projections,
  };
};

// I don't think I need this.....
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    newObservations: newObservations
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Analyzer);
