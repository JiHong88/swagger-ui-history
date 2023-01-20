import React from "react"
import PropTypes from "prop-types"
import Axios from "axios"

export default class ParamsSavePopup extends React.Component {
  static propTypes = {
    tagId: PropTypes.string.isRequired,
    specActions: PropTypes.object.isRequired,
    operation: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    onExecute: PropTypes.func,
    onClickClose: PropTypes.object.isRequired,
    getConfigs: PropTypes.func.isRequired,
    onExecuteHistory: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      invalid: ''
    }
  }

  componentDidMount() {
    
  }

  close = () => {
    this.props.onClickClose();
  }

  onInputChange = (e) => {
    this.setState({
      name: e.target.value,
      invalid: ''
    })
  }

  onKeyDown = (e) => {
    // enter
    if (e.keyCode === 13) {
      this.onSave()
    }
  }

  onSave = () => {
    const name = this.state.name;
    if (!name) {
      this.setState({
        invalid: 'invalid'
      })
      return;
    }

    this.close();

    const { specActions, operation, path, method, tagId, getConfigs, onExecuteHistory } = this.props
    const { historyServerUrl } = getConfigs()
    const serverUrl = `${historyServerUrl}/${tagId}`

    if (this.props.onExecute) {
      // loading spinner
      this.props.onExecute()
    }
    
    specActions.save({ operation, path, method, serverUrl, name }).then(status => onExecuteHistory(status))
  }

  render() {
    return (
      <div className="dialog-ux">
        <div className="backdrop-ux"></div>
        <div className="modal-ux">
          <div className="modal-dialog-ux">
            <div className="modal-ux-inner">
              <div className="modal-ux-header">
                <h3>Parameters save</h3>
                <button type="button" className="close-modal" onClick={ this.close }>
                  <svg width="20" height="20">
                    <use href="#close" xlinkHref="#close" />
                  </svg>
                </button>
              </div>
              <div className="modal-ux-content history-popup">
                  <div className="parameter__name required">Name<span>&nbsp;*</span></div>
                  <input type="text" className={`history-name ${this.state.invalid}`} onChange={ this.onInputChange } onKeyDown={ this.onKeyDown } autoFocus/>
                  <button type="button" className="btn btn-clear opblock-control__btn" onClick={ this.onSave }>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  static propTypes = {
    onClickClose: PropTypes.func.isRequired,
    onClickItem: PropTypes.func.isRequired,
    tagId: PropTypes.string.isRequired
  }
}
