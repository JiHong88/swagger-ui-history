import React from "react"
import PropTypes from "prop-types"
import Axios from "axios"

export default class HistoryPopup extends React.Component {
  static propTypes = {
    tagId: PropTypes.string.isRequired,
    specActions: PropTypes.object.isRequired,
    onClickClose: PropTypes.object.isRequired,
    onClickItem: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      stack: []
    }
  }

  async componentDidMount() {
    const { specActions, tagId } = this.props
    const stack = await specActions.getHistory({ tagId })
    this.setState({
      stack: stack || []
    })
  }

  close = () => {
    this.props.onClickClose();
  }

  onClickStack = (paramData) => {
    this.props.onClickItem(paramData);
    this.close();
  }

  render() {
    return (
      <div className="dialog-ux">
        <div className="backdrop-ux"></div>
        <div className="modal-ux">
          <div className="modal-dialog-ux">
            <div className="modal-ux-inner">
              <div className="modal-ux-header">
                <h3>Parameters history</h3>
                <button type="button" className="close-modal" onClick={ this.close }>
                  <svg width="20" height="20">
                    <use href="#close" xlinkHref="#close" />
                  </svg>
                </button>
              </div>
              <div className="modal-ux-content history-popup">
                  {
                    this.state.stack.length > 0 ? 
                    this.state.stack.map((v) => {
                      return (
                        <div key={`history-stack-${v.id}`} className={`opblock opblock`}>
                          <div key={v.id} className={`opblock-summary opblock-summary`} >
                            <button
                              className="opblock-summary-control"
                              onClick={()=>this.onClickStack(v)}
                            >
                              <div className="opblock-summary-description">
                                { v.name }
                              </div>
                            </button>
                          </div>
                        </div>
                      )
                    })
                    : <div>Empty</div>
                  }
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
