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

const style = styler([
    { key: accountNameTypes[0], color: "red"},
    { key: accountNameTypes[1], color: "blue"}
]);


class DataChartView extends Component {

  constructor(props) {
	   super(props);
     console.log("props in DataChartView constructor\n", props)
  };

  render() {

    console.log("RENDERING IN DatachartView*********", this.props);

    if (this.props.timeSeries === undefined){
      console.log("this.props.dataChart.timeSeries === undefined...No RENDER")
      console.log(this.props);
      return null;
    };

    return (
      <Resizable>
        <ChartContainer
          timeRange={this.props.timeSeries.series.range()}
          format="day"
          >
          <ChartRow height="150">
            <YAxis
              id="balance"
              label="Balance"
              classed="traffic-in"
              min={this.props.timeSeries.min}
              max={this.props.timeSeries.max}
              width="70"
              type="linear"
              />
            <Charts>
              <BarChart
                axis="balance"
                style={style}
                spacing={3}
                columns={accountNameTypes}
                series={this.props.timeSeries.series}
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
    initialCashBalance: state.initialCashBalance,
    initialCreditBalance: state.initialCreditBalance,
    timeSeries: state.timeSeries
  };
};

// I don't think I need this.....
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    initSeries: initSeries
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(DataChartView);
