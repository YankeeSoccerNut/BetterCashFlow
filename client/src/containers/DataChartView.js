import React, {Component} from 'react';
import {accountNameTypes} from '../util/data.mock';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

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

    this.handleChartHighlight = this.handleChartHighlight.bind(this);

    this.state = {chartObject: {},
                  chartInfoBox: []};
  };

  componentWillReceiveProps(nextProps){
    console.log("nextProps in DataChartView\n", nextProps);
  };

  componentDidUpdate(){
    console.log("componentDidUpdate in DataChartView\n", this.props);
    // we've rendered a new projection....let every reducer know via an Action...
    this.props.newProjection(this.props.projections);
  };


  handleChartHighlight(chartObject){

    if (chartObject === {} || chartObject === null){
      this.setState({chartObject: {},
                    chartInfoBox: []});
      return;
    };

    const balText = ((chartObject.event.get(chartObject.column)).toFixed(2)).toString();

    let dateText = chartObject.event.indexAsString(chartObject.event);

    dateText = moment(dateText).format("ddd, MMM D");

    const colText = chartObject.column;

    let hoverTextObjs = [{label: "Date", value: dateText},{label: "Acct", value: colText},{label: "Bal", value: balText}];

    this.setState({chartObject: chartObject,
                  chartInfoBox: hoverTextObjs});

  };


  render() {

    console.log("IN render() IN DatachartView*********", this.props);

    if (this.props.projections === null  || this.props.projections.timeSeries == undefined){
      console.log("No RENDER")
      console.log(this.props);
      return null;
    };


    console.log("chartObject: \n", this.state.chartObject);

    // // we're rendering a new projection....let every reducer know via an Action...
    // this.props.newProjection(this.props.projections);

    const style = styler([
        { key: accountNameTypes[0], color: 'blue'},
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
              min={-10000}
              max={10000}
              width="70"
              type="linear"
            />
            <Charts>
              <BarChart
                axis="balances"
                display="range"
                style={style}
                spacing={2}
                columns={[accountNameTypes[0],accountNameTypes[1]]}
                series={balances.dailyBalances}
                highlighted={this.state.chartObject}
                onHighlightChange={this.handleChartHighlight}
                info={this.state.chartInfoBox}
                infoStyle = {{ stroke: "black", fill: "yellow", opacity: 1, pointerEvents: "none" }}
                infoHeight={60}
                infoWidth={120}
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
    transactions: state.transactions,
    accountObjects: state.accountObjects
  };
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    newProjection: newProjection
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(DataChartView);
