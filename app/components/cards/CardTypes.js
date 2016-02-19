import React from 'react';
import classNames from 'classnames';

export class AlertCard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {hide: false};
  }

  render() {

    var {type = 'info', dismissable} = this.props,
        {hide} = this.state,
        alertType = `alert-${type}`,
        classes = classNames(
          'alert', 
          {[alertType]: true }, 
          {'alert-dismissible': dismissable},
          'm-b-md hidden-xs',
          {hide}
        );

    return (
      <div className={classes}>
        { 
          dismissable && 
          <button 
            type="button" 
            className="close" 
            data-dismiss="alert" 
            aria-label="Close" 
            onClick={() => this.setState({hide: true})}
          >
            <span aria-hidden="true">×</span>
          </button> 
        }
        {this.props.children}
      </div>
    )
  }
}

export class BasicCard extends React.Component {
 
  render() {
    return (
      <div className="panel panel-default visible-md-block visible-lg-block">
        <div className="panel-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}