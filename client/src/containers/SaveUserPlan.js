import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-bootstrap
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, Label, Checkbox } from 'react-bootstrap';

import saveUserPlan from '../actions/saveUserPlan';

class SaveUserPlan extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleUserChoice = this.handleUserChoice.bind(this);

    this.state = {
      hasOpenModal: false
    };
  }

  handleClick(event) {

    console.log("user clicked save: ", event);
    console.log("this.props in click SaveUserPlan: ", this.props);

    this.setState({hasOpenModal: true});

    //put together async request...promise?  .then would capture modal inputs and then initiate the save.

    // This probably where you would have an `ajax` call
    // setTimeout(() => {
    //   // Completed of async action, set loading state back
    //   this.setState({ isLoading: false });
    // }, 2000);

  }

  handleUserChoice(event) {

    console.log("user clicked save: ", event.target);
    console.log("this.props in click handleUserChoice: ", this.props);
    this.setState({hasOpenModal: false});

    // this.props.saveUserPlan(this.props);  //if save!

  }


  render() {

    console.log("Rendering....SaveUserPlan: ################ ");

    let saveBtnState = '';
    let isActive = false;

    if (this.props.transactions === null || this.props.transactions.length <= 0){
      saveBtnState = 'disabled';
    } else {
      saveBtnState = 'active';
      isActive = true;
    };

    return (
      <span>
        <Button bsStyle="primary" bsSize="small" className={saveBtnState}  id="btnsave" onClick={ isActive ? this.handleClick : null }><span><i className="fa glyphicon glyphicon-floppy-disk fa-floppy-disk"></i></span>
          Save Plan
        </Button>
        <div className="modal-container">
          <Modal
            show={this.state.hasOpenModal}
            onHide={this.handleUserChoice}
            container={this}
            aria-lablelledby="contained-modal-container">
            <Modal.Header>
              <Modal.Title id="contained-modal-title">Please enter Plan Name.  Comments are optional.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form inline>
                <FormGroup controlId="formInlineName">
                  <ControlLabel>Plan Name:</ControlLabel>{' '}
                  <FormControl required type="text" placeholder="Plan Name" />
                </FormGroup>{' '}
                <FormGroup controlId="formInlineComments">
                  <ControlLabel>Comments:</ControlLabel>{' '}
                  <FormControl type="text" placeholder="Comments" />
                </FormGroup>{' '}
                <FormGroup controlId="new-version">
                  <Checkbox defaultChecked inline>Replace existing?</Checkbox>{' '}
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button id="btn-save-plan" bsStyle="success" type="submit" onClick={this.handleUserChoice}>Save Plan</Button>
              <Button id="btn-cancel" bsStyle="danger" type="submit" onClick={this.handleUserChoice}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </span>
    );
  }
}


function mapStateToProps(state){
  // state in this context is the root reducers
  // this function's only job is to map props to pieces of state that THIS component is interested in
  // in this scenario it is the whole dataTable
  return{
    transactions: state.transactions,
    planObject: state.planObject
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    saveUserPlan: saveUserPlan
  }, dispatch);
};


export default connect(mapStateToProps,mapDispatchToProps)(SaveUserPlan);
