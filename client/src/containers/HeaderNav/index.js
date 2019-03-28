import React from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'

import { Layout } from 'antd'
import ButtonElement from '../../components/ButtonElement'

const { Header } = Layout

const HeaderNav = props => (
  <Header className='header' style={{ display: 'flex', flexDirection: 'row' }}>
    <ButtonElement handleView={props.handleView} view={props.view} />
  </Header>
)

HeaderNav.propTypes = {
  handleView: PropTypes.func,
  view: PropTypes.string
}

export default HeaderNav
