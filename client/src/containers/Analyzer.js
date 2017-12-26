import React, {Component} from 'react';
import { TimeSeries } from 'pondjs';
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

    if (this.props.projections === null){
      console.log("this.props.projections === undefined...No RENDER")
      return null;
    };

    console.log(this.props);
    let factors = this.props.projections.timeSeries;

    let timeSeriesJSON = factors.dailyBalances.toJSON();

    console.log(timeSeriesJSON);
    
    console.log("\nfactors.endingCash: ", factors.endingCash);
    console.log("\nfactors.endingCredit: ", factors.endingCredit);

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
