import React, { Component } from 'react';
import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
class DataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: [
        [{value:  1}, {value:  3}],
        [{value:  2}, {value:  4}]
      ]
    }
  }

  render() {
    return (
      <ReactDataSheet
        data={this.state.grid}
        valueRenderer={(cell) => cell.value}
        onChange={(cell, rowI, colJ, value) =>
          this.setState({
            grid: this.state.grid.map((col) =>
              col.map((rowCell) =>
                (rowCell == cell) ? ({value: value}) : rowCell
              )
            )
          })
        }
      />
    )
  }
}

export default DataTable;
