import React, {Component} from 'react';
import {accountNameTypes} from '../util/data.mock';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import newProjection from '../actions/newProjection';

import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    BarChart,
    Resizable,
    styler
} from "react-timeseries-charts";

// import { TimeSeries } from 'pondjs';


class DataChartView extends Component {


  constructor(props) {
	   super(props);
     console.log("props in DataChartView constructor\n", props);
  };

  componentWillReceiveProps(nextProps){
    console.log("nextProps in DataChartView\n", nextProps);
  };

  render() {

    console.log("IN render() IN DatachartView*********", this.props);


    if (this.props.projections === null){
      console.log("this.props.projections === undefined...No RENDER")
      console.log(this.props);
      return null;
    };

    // we're rendering a new projection....let every reducer know via an Action...
    this.props.newProjection(this.props.projections);

    const style = styler([
        { key: accountNameTypes[0], color: "blue"},
        { key: accountNameTypes[1], color: "red"},
    ]);

    console.log("style: \n", style);

    let balances = this.props.projections.timeSeries;  //some shorthand

    return (
      <Resizable>
        <ChartContainer
          timeRange={balances.dailyBalances.range()}
          format="day"
          >
          <ChartRow height="150">
            <YAxis
              id="balances"
              label="Projected Balances"
              min={balances.min}
              max={balances.max}
              width="70"
              type="linear"
              />
            <Charts>
              <BarChart
                axis="balances"
                style={style}
                spacing={2}
                columns={[accountNameTypes[0],accountNameTypes[1]]}
                series={balances.dailyBalances}
                />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }
}
function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  return{
    projections: state.projections,
    transactions: state.transactions
  };
};

// I don't think I need this.....
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    newProjection: newProjection
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(DataChartView);
