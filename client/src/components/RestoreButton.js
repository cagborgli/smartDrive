import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Icon } from 'antd'
import { untrash } from '../async-actions/update'

class RestoreButton extends React.Component {
  render () {
    const { id, untrash } = this.props
    return (
      <button onClick={() => untrash(id)}>
        <Icon type='rollback' style={{ fontsize: '10px' }} />
      </button>
    )
  }
}

RestoreButton.propTypes = {
  id: PropTypes.number,
  untrash: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  untrash: id => dispatch(untrash(id))
})

export default connect(
  null,
  mapDispatchToProps
)(RestoreButton)
