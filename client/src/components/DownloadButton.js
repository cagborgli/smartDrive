import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Icon } from 'antd'
import { download } from '../async-actions/download'

class DownloadButton extends React.Component {
  render () {
    const { id, download } = this.props
    return (
      <button onClick={() => download(id)}>
        <Icon type='download' style={{ fontsize: '10px' }} />
      </button>
    )
  }
}

DownloadButton.propTypes = {
  id: PropTypes.number,
  download: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  download: id => dispatch(download(id))
})

export default connect(
  null,
  mapDispatchToProps
)(DownloadButton)
