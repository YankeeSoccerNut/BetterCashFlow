import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';

// react-bootstrap-table...

import importTransactions from '../actions/importTransactions';


import Papa from 'papaparse';

class ImportCSV extends Component {

  constructor(props) {
    super(props);
    this.state = {fileSelected: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChooseFile = this.handleChooseFile.bind(this);
    this.handleParseResults = this.handleParseResults.bind(this);
    this.handleParseError = this.handleParseError.bind(this);
  }

  handleChooseFile(e){

    if (e.target.value.length > 0){
      console.log("file selected: ", e.target.value);
      this.setState({fileSelected: true});
    } else {
      this.setState({fileSelected: false});
    };
  };

  handleParseResults(results, file){
    console.log("Parsing complete:", results, file);
    let matchCount = 0;
    //confirm that the source file has 1 and only 1 of the required named columns.  If not, then alert and abort the import...

    const requiredColumns = ["type", "dueDate", "accountName", "payee", "amount", "scheduledDate"];

    if (results.meta.fields.length < requiredColumns.length) {

      Alert.error(`Parser error on selected file - ${file.name} \n Error: insufficient columns.  Required columns are: ${requiredColumns}`, {effect: 'stackslide', stack:{limit:3}, position:'top-right', offset: 150, timeout: 5000});

      // alert(
      //   `Parser error on selected file - ${file.name} \n Error: insufficient columns.  Required columns are: ${requiredColumns}`
      // );

      return(null);
    };

    //have a few choices here....I decided to loop through the requiredColumns array and alert for every missing column versus breaking out on first error...

    requiredColumns.forEach((column) => {

      let matchIndex = results.meta.fields.indexOf(column);

      if (matchIndex >= 0){
        matchCount += 1;
      } else {
        Alert.error(`Parser error on selected file - ${file.name} \n Error: Missing required column ${column}.`, {effect: 'stackslide', stack:{limit:3}, position:'top-right', offset: 150, timeout: 5000});

        // alert(
        //   `Parser error on selected file - ${file.name} \n Error: Missing required column ${column}.  Required columns are: ${requiredColumns}`
        // );

        return(null);
      };

      if (matchIndex < results.meta.fields.length) {
        let startIndex = matchIndex + 1;
        matchIndex = results.meta.fields.indexOf(column, startIndex);
        if (matchIndex >= startIndex) {
          Alert.error(`Parser error on selected file - ${file.name} \n Error: duplicate column name ${column}.`, {effect: 'stackslide', stack:{limit:3}, position:'top-right', offset: 150, timeout: 5000});

          // alert(
          //   `Parser error on selected file - ${file.name} \n Error: duplicate column name ${column}.  Required columns are: ${requiredColumns}`
          // );
          return(null);
        };
      };
    });

    if (matchCount !== requiredColumns.length) {
      Alert.error(`Parser error on selected file - ${file.name} \n Matched ${matchCount} of ${requiredColumns.length} required columns. Required columns are: \n ${requiredColumns}.`, {effect: 'stackslide', stack:{limit:3}, position:'top-right', offset: 150, timeout: 'none'});

      // alert(
      //   `Parser error on selected file - ${file.name} \n Only matched ${matchCount} of ${requiredColumns.length}. Required columns are: ${requiredColumns}.`
      // );
      return(null);
    };

    this.props.importTransactions(results.data);
  };

  handleParseError(error, file){
    console.log("Parse error:", error, file.name);
    Alert.error(
      `Parser error on selected file - ${file.name} \n Error: ${error}`, {effect: 'stackslide', stack:{limit:3}, position:'top-right', offset: 150, timeout: 5000}
    );
  };

  handleSubmit(event) {
    event.preventDefault();

    if(!this.state.fileSelected){
      return;
    };

    const parserObject = {
      delimiter: "",  // auto-detect
      newline: "",  // auto-detect
      quoteChar: '"',
      header: true,
      dynamicTyping: false,
      preview: 20, // limit number of rows...0 is no limit
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

  }

  render() {

    console.log("ImportCSV: ################ ");

    let importBtnState = 'disabled';

    if (this.state.fileSelected){
      importBtnState = 'active';
    };

    let jsxImportBtnClassName = `btn btn-danger btn-sm ${importBtnState}`;

    return (
      <form className="form-horizontal" id="importcsv"
        onChange={this.handleChooseFile} onSubmit={this.handleSubmit}>
          <input
            type="file"
            ref={input => {
              this.fileInput = input;
            }}>
          </input>
          <button id="btnimport" type="submit" className={jsxImportBtnClassName}><span><i className="fa glyphicon glyphicon-import fa-import"></i> Import</span>
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
