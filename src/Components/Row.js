import React, { Component } from "react";
import Cell from "./Cell";
export default class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowIndex: props.rowIndex
    };
  }

  renderCells = () => {
    return this.props.cells.map((cell, index) => {
      return (
        <Cell
          text={cell}
          onCellClick={this.props.onCellClick}
          rowIndex={this.props.rowIndex}
          cellID={index}
        />
      );
    });
  };

  render() {
    return <tr>{this.renderCells()}</tr>;
  }
}
