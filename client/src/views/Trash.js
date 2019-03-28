import React from 'react'
import { Layout, Radio, Menu, Icon, List } from 'antd'
import { Link } from 'react-router-dom'
import ListView from '../components/ListViewTrash'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

const { Header, Content, Sider } = Layout

class Trash extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      view: 'list',
      files: ['file1', 'file2', 'file3']
    }
    this.handleView = this.handleView.bind(this)
  }

  handleView (e) {
    this.setState({
      view: e.target.value
    })
  }

  render () {
    const { files } = this.props
    return (
      <Layout>
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

          <Menu
            mode='vertical'
            theme='dark'
            style={{ height: '100%', marginTop: 95 }}
          >
            <Menu.Item style={{ margin: '30px' }}>
              <Link to='/'>
                <Icon type='home' style={{ fontSize: '25px' }} /> Home
              </Link>
            </Menu.Item>

            <Menu.Item style={{ margin: '30px' }}>
              <Icon type='delete' style={{ fontSize: '25px' }} /> Trash
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <div>
              <Radio.Group value='button'>
                <Radio.Button value='list' onClick={this.handleView}>
                  List
                </Radio.Button>
                <Radio.Button value='grid' onClick={this.handleView}>
                  Grid
                </Radio.Button>
              </Radio.Group>
            </div>
          </Header>
          <Layout style={{ boxSizing: 'border-box' }}>
            <Content
              style={{
                background: '#fff',
                width: '100%',
                height: '82vh',
                padding: 30
              }}
            >
              {this.state.view === 'list' ? (
                <ListView />
              ) : (
                <List
                  grid={{ gutter: 10, column: 8 }}
                  dataSource={files}
                  renderItem={item => (
                    <List.Item
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon
                        type='file'
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          fontSize: '40px',
                          justifyContent: 'center'
                        }}
                      />
                      {item.name}
                    </List.Item>
                  )}
                />
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

Trash.propTypes = {
  files: PropTypes.array
}

const mapStateToProps = state => ({
  files: state.trash.fileObjects
})

export default connect(mapStateToProps)(Trash)
