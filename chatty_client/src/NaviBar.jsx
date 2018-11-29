import React, { Component } from "react";

class NaviBar extends Component {
  render() {
    return (
      <div>
        <span className="navibar">Chatty</span>
        <span className="navibar-online-user">
          Online:{this.props.connectedUsers}
        </span>
      </div>
    );
  }
}

export default NaviBar;
