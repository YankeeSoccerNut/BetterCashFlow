import React, {Component} from 'react';
import { TimeSeries } from 'pondjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import newObservations from '../actions/newObservations';
import Icon from 'react-icons-kit';
import { cool } from 'react-icons-kit/icomoon';
import Parser from 'html-react-parser';


class Analyzer extends Component {

  componentWillReceiveProps(nextProps){
    console.log("nextProps in Analyzer\n", nextProps);
  };


  render() {

    console.log("IN render() IN Analyzer*********", this.props);

    if (this.props.observations === null){
      console.log("this.props.observations === undefined...No RENDER")
      return null;
    };

    console.log(this.props);

    let htmlObservations = '<ul className="observation-list">';
    let htmlRecommendations = '<ul className="recommendation-list">';

    this.props.observations.forEach((note) => {
      if (note.type === "O") {
        htmlObservations += `<li>${note.text}</li>`
      } else if (note.type === "R") {
        htmlRecommendations += `<li>${note.text}</li>`
      } else {
        console.log("Invalid note.type in observations: ", note);
      };
    });

    htmlObservations += '</ul>';
    htmlRecommendations += '</ul>';

    return (
      <div>
        <Icon size={64} icon={cool} className="col-sm-2"/>
        <div id="analyzer-observations" className="panel panel-info col-sm-10">
          <div className="panel-heading text-center">Observations and Recommendations
          </div>
          <div className="panel-content col-sm-6">{Parser(htmlObservations)}
          </div>
          <div className="panel-content col-sm-6">{Parser(htmlRecommendations)}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  return{
    projections: state.projections,
    observations: state.observations
  };
};

// Will use this to inform NavBar to update...
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    newObservations: newObservations
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Analyzer);
