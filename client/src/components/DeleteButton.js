import React from 'react'
import { Modal, Icon } from 'antd'
import PropTypes from 'prop-types'

export class DeleteButton extends React.Component {
  constructor (props) {
    super(props)
    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = { visible: false }
  }

  showModal () {
    this.setState({
      visible: true
    })
  }

  handleOk (e) {
    this.setState({
      visible: false
    })
    // Dispatch action to delete here
  }

  handleCancel (e) {
    this.setState({
      visible: false
    })
  }

  render () {
    return (
      <div>
        <Icon
          onClick={this.showModal}
          type='delete'
          style={{ fontsize: '10px' }}
        />
        <Modal
          title='Delete!'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          value={this.props.value}
        >
          <p>Are you sure you want to delete the following file?</p>
          <p>{this.props.value}</p>
        </Modal>
      </div>
    )
  }
}

DeleteButton.propTypes = {
  value: PropTypes.any
}

export default DeleteButton
