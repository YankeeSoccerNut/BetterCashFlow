import React, {Component} from 'react';
import {accountNameTypes} from './data.mock';
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    BarChart,
    Resizable,
    styler
} from "react-timeseries-charts";

const style = styler([
    { key: accountNameTypes[0], color: "blue"},
    { key: accountNameTypes[1], color: "red"}
]);

class DataChartView extends Component {
    constructor(props) {
	super(props);
    }

    render() {
	return (
            <Resizable>
              <ChartContainer
                timeRange={this.props.seriesStruct.series.range()}
                format="day"
                >
                <ChartRow height="150">
                  <YAxis
                    id="balance"
                    label="Balance"
                    classed="traffic-in"
                    min={this.props.seriesStruct.min}
                    max={this.props.seriesStruct.max}
                    width="70"
                    type="linear"
                    />
                  <Charts>
                    <BarChart
                      axis="balance"
                      style={style}
                      spacing={3}
                      columns={accountNameTypes}
                      series={this.props.seriesStruct.series}
                      />
                  </Charts>
                </ChartRow>
              </ChartContainer>
            </Resizable>
	);
    }
}
export default DataChartView;
