import React from 'react';
import {Link} from 'react-router';
import ProfileDropdown from '../ProfileDropdown';

class Columns3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-2">
          a
        </div>
        <div className="col-md-7">
          {this.props.children}
        </div>
        <div className="col-md-3">
          c
        </div>
      </div>
    )
  }
}

export default Columns3;