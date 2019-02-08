import React, { Component } from "react";
import "../index.css";
export default class Cell extends Component {
  handleClick = () => {
    this.props.onCellClick(this.props.cellID);
  };
  render() {
    return (
      <td onClick={this.handleClick} id={this.props.cellID} className="col">
        {this.props.text}
      </td>
    );
  }
}
