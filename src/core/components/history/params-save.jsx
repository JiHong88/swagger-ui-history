import React, { Component } from "react"
import PropTypes from "prop-types"

export default class ParamsSave extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    onClickSave: PropTypes.object
  }

  // @excute
  render(){
    const { disabled, onClickSave } = this.props
    return (
        <button className="btn btn-save cancel opblock-control__btn" onClick={ onClickSave } disabled={disabled}>
          Save
        </button>
    )
  }
}
