import React from "react";
import { Collapse } from "react-collapse";
import RemoveIcon from "../../remove.png";
import { Popconfirm } from "antd";

class DropdownItem extends React.Component {
  state = {
    isDropdownOpen: false,
  };

  onDropdownClicked = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  render() {
    return (
      <div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: 500,
            }}
          >
            <p onClick={this.onDropdownClicked} className="click" >{this.props.title}</p>
            <Popconfirm
              onConfirm={this.props.removeContract}
              title="delete this address?"
              okText="Yes"
              placement="top"
              cancelText="No"
            >
              <img className="click" src={RemoveIcon} width={24} height={24} alt="" srcset="" />
            </Popconfirm>
          </div>
        </div>
        <Collapse isOpened={this.state.isDropdownOpen}>
          <div>{this.props.children}</div>
        </Collapse>
      </div>
    );
  }
}

export default DropdownItem;
