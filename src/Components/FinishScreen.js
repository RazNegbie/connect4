import React, { Component } from "react";

export default class FinishScreen extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onClick}>start over</button>
      </div>
    );
  }
}
