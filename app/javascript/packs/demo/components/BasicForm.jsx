// Vendor
import React, { Component } from 'react';
import { connect } from 'react-redux';

//App
import { StylishInput } from './common';
import { emailChanged, passwordChanged, nameChanged, submitAccount } from '../actions';
import TestClass from '../testClass';

class BasicForm extends Component {

  submit(event){
    event.preventDefault();
    console.log("Submitted");
    // if(this.props.user.isEmpty()){
    //   this.props.findUserByEmail(this.props.email, this.props.history);  
    // }
    // else{
    //   this.props.loginUser(this.props.email, this.props.password, this.props.history);
    // }
  }

  onEmailChange(event) {
    let text = event.target.value;
    this.props.emailChanged(text);
  }

  onPasswordChange(event) {
    let text = event.target.value;
    this.props.passwordChanged(text);
  }

  onNameChange(event) {
    let text = event.target.value;
    this.props.nameChanged(text);
  }

  // {
  //             (this.props.invalid_password) &&
  //             <div className="form-errors">That's an invalid password</div>
  //           }

  render() {
    return (
      <div className="row p-t-4">
        <div className="col-md-4 col-sm-5 col-xs-10 centered">
          <form className="stylish" onSubmit={this.submit.bind(this)}>
            <h2 className="m-b-1">Basic Form Submission</h2>
            <div className="row">
              <div className="col-lg-12">
                <StylishInput label="Name" name="Name" value={this.props.name} onChange={this.onNameChange.bind(this)} type="text" />
                <StylishInput label="Email" name="Email" value={this.props.email} onChange={this.onEmailChange.bind(this)} type="text" />
                <StylishInput label="Password" name="Password" value={this.props.password} onChange={this.onPasswordChange.bind(this)} type="password" autoFocus="true" />
                <input className="button button-primary" name="commit" type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ core }) => {
  let { name, email, password } = core;
  return { name, email, password };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, nameChanged, submitAccount })(BasicForm);
