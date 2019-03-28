import React from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import { Icon } from 'antd'

const File = props => (
  <span>
    <Icon type='file' />
    {`${props.input}.txt`}
  </span>
)

File.propTypes = {
  input: PropTypes.string
}

export default File
