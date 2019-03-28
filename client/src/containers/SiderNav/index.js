import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import { Layout, Menu, Icon, Button } from 'antd'
import { showModal } from '../../action-creators/upload'
import { Link } from 'react-router-dom'

const { Sider } = Layout

const SiderWrapper = props => (
  <Sider width={200}>
    <h1
      style={{
        background: '#fff',
        backgroundColor: '#001529',
        color: 'white',
        textAlign: 'center',
        marginTop: '15px',
        fontSize: '30px'
      }}
    >
      SmartDrive
    </h1>

    <Button
      type='primary'
      shape='round'
      icon='upload'
      size='large'
      style={{ margin: '0 0 40px 20px' }}
      onClick={() => {
        props.showModal()
      }}
    >
      Upload
    </Button>

    <Menu mode='vertical' theme='dark' style={{ height: '100%' }}>
      <Menu.Item style={{ margin: '30px' }}>
        {/* <Icon type='home' style={{ fontSize: '25px' }} /> Home
      </Menu.Item>
      {/* <Menu.Item
        style={{ margin: '30px' }}
        onClick={() => {
          props.uploadBegin()
        }}
      >
        <Icon type='upload' style={{ fontSize: '25px' }} /> Upload */}
        <Link to='/'>
          <Icon type='home' style={{ fontSize: '25px' }} /> Home
        </Link>
      </Menu.Item>

      <Menu.Item style={{ margin: '30px' }}>
        <Link to='/trash'>
          <Icon type='delete' style={{ fontSize: '25px' }} /> Trash
        </Link>
      </Menu.Item>
    </Menu>
  </Sider>
)

SiderWrapper.propTypes = {
  showModal: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(showModal())
})

export default connect(
  null,
  mapDispatchToProps
)(SiderWrapper)
