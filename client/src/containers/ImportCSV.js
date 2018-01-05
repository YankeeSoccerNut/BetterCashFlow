import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-bootstrap-table...

import loadTransactions from '../actions/loadTransactions';
import newDataTable from '../actions/newDataTable';

import Papa from 'papaparse';

class ImportCSV extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const parserObject = {
      delimiter: "",  // auto-detect
      newline: "",  // auto-detect
      quoteChar: '"',
      header: true,
      dynamicTyping: false,
      preview: 20, //for testing...change to 0
      encoding: "",
      worker: false,
      comments: false,
      step: undefined,
      complete: handleParseResults,
      error: handleParseError,
      download: false,
      skipEmptyLines: true,
      chunk: undefined,
      fastMode: undefined,
      beforeFirstChunk: undefined,
      withCredentials: undefined
    };

    let parseReturn = Papa.parse(this.fileInput.files[0], parserObject);

    //interesting...I expected a Promise but got undefined
    console.log(typeof(parseReturn));
    console.log("parseReturn: ", parseReturn);

    alert(
      `Selected file - ${
        this.fileInput.files[0].name
      }`
    );
  }

  render() {

    console.log("ImportCSV: ################");

    return (
      <form
        onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input
            type="file"
            ref={input => {
              this.fileInput = input;
            }}
          />
        </label>
        <br />
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}


function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  // in this scenario it is the whole dataTable
  return{
    transactions: state.transactions
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    loadTransactions: loadTransactions,
    newDataTable: newDataTable
  }, dispatch);
};

function handleParseResults(results, file){
  console.log("Parsing complete:", results, file);
};

function handleParseError(error, file){
  console.log("Parse error:", error, file);
  alert(
    `Parser error on selected file - ${file} \n Error: ${error}`
  );
};


export default connect(mapStateToProps,mapDispatchToProps)(ImportCSV);
