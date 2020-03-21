import React, { Component } from "react";
import * as actions from "../actions/transactionAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class TransactionForm extends Component {
  state = {
    ...this.returnStateObject()
  };

  returnStateObject() {
    if (this.props.currentIndex === -1)
      return {
        bAccountNo: "",
        iFSC: "",
        bName: "",
        amount: ""
      };
    else return this.props.list[this.props.currentIndex];
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentIndex !== this.props.currentIndex ||
      prevProps.list.length !== this.props.list.length
    )
      this.setState({
        ...this.returnStateObject()
      });
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.props.currentIndex === -1)
      this.props.insertTransaction(this.state);
    else this.props.updateTransaction(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          <input
            name='bAccountNo'
            placeholder='A/C No.'
            value={this.state.bAccountNo}
            onChange={this.handleInputChange}
          />
          <input
            name='iFSC'
            placeholder='iFSC'
            value={this.state.iFSC}
            onChange={this.handleInputChange}
          />
          <input
            name='bName'
            placeholder='bName'
            value={this.state.bName}
            onChange={this.handleInputChange}
          />
          <input
            name='amount'
            placeholder='amount'
            value={this.state.amount}
            onChange={this.handleInputChange}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.list,
    currentIndex: state.currentIndex
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      insertTransaction: actions.insert,
      updateTransaction: actions.update
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
