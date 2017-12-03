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
    { key: accountNameTypes[0], color: "#A5C8E1" , selected: "#2CB1CF"},
    { key: accountNameTypes[1], color: "#FFCC9E", selected: "#2CB1CF"  }
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
