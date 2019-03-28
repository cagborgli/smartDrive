import React from 'react'
import { Modal, Icon } from 'antd'
import PropTypes from 'prop-types'
import { del } from '../async-actions/delete'
import { connect } from 'react-redux'

export class DeleteButton extends React.Component {
  constructor (props) {
    super(props)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.state = { visible: false }
  }

  showModal () {
    this.setState({
      visible: true
    })
  }
  hideModal (e) {
    this.setState({
      visible: false
    })
  }

  handleOk (e) {
    const { id, del } = this.props
    del(id)
    this.setState({
      visible: false
    })
    // Dispatch action to delete here
  }

  render () {
    const { name } = this.props
    return (
      <button onClick={this.showModal}>
        <Icon type='delete' style={{ fontsize: '10px' }} color='red' />
        <Modal
          title='Delete!'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
          value={name}
        >
          <p>Are you sure you want to delete the following file?</p>
          <p>{this.props.value}</p>
        </Modal>
      </button>
    )
  }
}

DeleteButton.propTypes = {
  name: PropTypes.any,
  id: PropTypes.number,
  del: PropTypes.func,
  value: PropTypes.string
}

const mapDispatchToProps = dispatch => ({
  del: id => dispatch(del(id))
})

export default connect(
  null,
  mapDispatchToProps
)(DeleteButton)
