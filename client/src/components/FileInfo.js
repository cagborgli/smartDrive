import React from 'react'
import { Drawer, Icon } from 'antd'
import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
// import DownloadButton from './DownloadButton'
// import DeleteButton from './DeleteButton'

export class FileInfo extends React.Component {
  constructor (props) {
    super(props)
    this.showDrawer = this.showDrawer.bind(this)
    this.onClose = this.onClose.bind(this)
    this.state = { visible: false }
  }

  showDrawer () {
    this.setState({
      visible: true
    })
  }

  onClose () {
    this.setState({
      visible: false
    })
  }

  render () {
    return (
      <div>
        <a
          type='primary'
          onClick={this.showDrawer}
          value={this.props.value}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <Icon type='file' style={{ fontSize: '25px', marginRight: '10px' }} />
          {this.props.value}
        </a>

        <Drawer
          title={this.props.value}
          placement='right'
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          view={this.props.view}
          record={this.props.record}
        >
          <p>
            <b>Created: </b>
            {this.props.record.created}
          </p>
          <p>
            <b>Size: </b>
            {this.props.record.size}
          </p>
        </Drawer>
      </div>
    )
  }
}

FileInfo.propTypes = {
  value: PropTypes.any,
  view: PropTypes.string,
  record: PropTypes.any
}

export default FileInfo
