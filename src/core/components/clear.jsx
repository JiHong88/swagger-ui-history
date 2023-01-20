import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Clear extends Component {

  onClick =() => {
    let { specActions, path, method, onExecuteHistory } = this.props
    specActions.clearResponse( path, method )
    specActions.clearRequest( path, method )
    onExecuteHistory()
  }

  render(){
    return (
      <button className="btn btn-clear opblock-control__btn" onClick={ this.onClick }>
        Clear
      </button>
    )
  }

  static propTypes = {
    specActions: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    onExecuteHistory: PropTypes.func.isRequired,
  }
}
