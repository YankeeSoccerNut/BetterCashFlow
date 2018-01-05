import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-bootstrap-table...

import importTransactions from '../actions/importTransactions';

import Papa from 'papaparse';

class ImportCSV extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleParseResults = this.handleParseResults.bind(this);
    this.handleParseError = this.handleParseError.bind(this);

  }

  handleParseResults(results, file){
    console.log("Parsing complete:", results, file);
    this.props.importTransactions(results.data);
  };

  handleParseError(error, file){
    console.log("Parse error:", error, file);
    alert(
      `Parser error on selected file - ${file} \n Error: ${error}`
    );
  };

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
      complete: this.handleParseResults,
      error: this.handleParseError,
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
    importTransactions: importTransactions
  }, dispatch);
};


export default connect(mapStateToProps,mapDispatchToProps)(ImportCSV);
