import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// react-bootstrap
import { Button, Modal, InputGroup, Form, FormGroup, FormControl, ControlLabel, Label, Checkbox } from 'react-bootstrap';

import saveUserPlan from '../actions/saveUserPlan';

class SaveUserPlan extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleUserSave = this.handleUserSave.bind(this);
    this.handleUserCancel = this.handleUserCancel.bind(this);

    this.state = {
      hasOpenModal: false
    };
  }

  handleClick(e) {

    // All we want to do is open the modal that captures the Plan Name and Comments.....
    this.setState({hasOpenModal: true});
  }

  handleUserSave(e) {

    e.preventDefault();

    console.log("user clicked save: ", e.target);

    let formData = {planName: e.target[0].value,
                    planComments: e.target[1].value,
                    planUpdateExisting: e.target[2].checked};

    console.log("formData: ", formData);

    this.setState({hasOpenModal: false});

    this.props.saveUserPlan(this.props, formData);
  }

  handleUserCancel(e) {

    console.log("user clicked cancel: ", e.target);
    this.setState({hasOpenModal: false});
  }


  render() {

    console.log("Rendering....SaveUserPlan: ################ ");

    console.log("SaveUserPlan props: ", this.props);

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
            container={this}
            aria-labelledby="contained-modal-container">
            <Modal.Header>
              <Modal.Title id="contained-modal-title">Please enter Plan Name.  Comments are optional.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup>
              <Form inline onSubmit={this.handleUserSave}>
                <FormGroup controlId="formInlineName">
                  <ControlLabel>Plan Name:</ControlLabel>{' '}
                  <FormControl required type="text" placeholder="Plan Name" defaultValue={this.props.planObject ? this.props.planObject.planSummary.user_plan_name : ''} />
                </FormGroup>{' '}
                <FormGroup controlId="formInlineComments">
                  <ControlLabel>Comments:</ControlLabel>{' '}
                  <FormControl type="text" placeholder="Comments" />
                </FormGroup>{' '}
                <FormGroup controlId="new-version">
                  <Checkbox defaultChecked inline>Replace existing?</Checkbox>{' '}
                </FormGroup>
                <Button id="btn-save-plan" bsStyle="success" type="submit">Save Plan</Button>
              </Form>
            </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button id="btn-cancel" bsStyle="danger" type="submit" onClick={this.handleUserCancel}>Cancel</Button>
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
