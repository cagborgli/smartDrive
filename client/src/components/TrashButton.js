import React from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { trash } from '../async-actions/update'

class TrashButton extends React.Component {
  render () {
    const { trash, id } = this.props
    return (
      <button onClick={() => trash(id)}>
        <Icon type='delete' style={{ fontsize: '10px' }} />
      </button>
    )
  }
}

TrashButton.propTypes = {
  id: PropTypes.number,
  trash: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  trash: id => dispatch(trash(id))
})

export default connect(
  null,
  mapDispatchToProps
)(TrashButton)
