import React, {Component} from 'react';
import {accountNameTypes} from '../util/data.mock';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import initSeries from '../actions/initSeries';

import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    BarChart,
    Resizable,
    styler
} from "react-timeseries-charts";

import { TimeSeries } from 'pondjs';


class DataChartView extends Component {


  constructor(props) {
	   super(props);
     console.log("props in DataChartView constructor\n", props)
  };

  render() {

    console.log("IN render() IN DatachartView*********", this.props);


    if (this.props.projections === null){
      console.log("this.props.projections === undefined...No RENDER")
      console.log(this.props);
      return null;
    };

    const style = styler([
        { key: "amount", color: "#A5C8E1"},
    ]);

    console.log("style: \n", style);

    let balances = this.props.projections.timeSeries;  //some shorthand

    return (
      <Resizable>
        <ChartContainer
          timeRange={balances.range()}
          format="day"
          >
          <ChartRow height="150">
            <YAxis
              id="balances"
              label="Projected Balances"
              min={-100}
              max={3000}
              width="70"
              type="linear"
              />
            <Charts>
              <BarChart
                axis="balances"
                // style={style}
                spacing={2}
                columns={["amount"]}
                series={balances}
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
    projections: state.projections
  };
};

// I don't think I need this.....
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    initSeries: initSeries
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(DataChartView);
