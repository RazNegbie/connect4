import React, { Component } from "react";

export default class FinishScreen extends Component {
  render() {
    return (
      <div className="finishScreen">
        <button className="startOverButton" onClick={this.props.onClick}>
          start over
        </button>
        <div className="textWinner">
          The winner is:{" "}
          {this.props.currentPlayer === "Greeny" ? (
            <p className="pinky"> Pinky :)</p>
          ) : (
            <p className="greeny"> Greeny :)</p>
          )}
        </div>
      </div>
    );
  }
}
