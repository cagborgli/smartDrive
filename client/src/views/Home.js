import React from 'react'
import 'antd/dist/antd.css'
import './index.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Layout, List, Radio, Icon } from 'antd'
import { getAllFiles } from '../async-actions/getAllFiles'

import SiderWrapper from '../containers/SiderNav'
import UploadModal from '../containers/UploadModal'
import ListView from '../components/ListView'

import { showModal, hideModal } from '../action-creators/upload'

const { Content, Header } = Layout

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      modalFileInput: React.createRef(),
      uploadedFiles: [],
      fileNames: [],
      fileList: [],
      view: 'list'
    }

    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleView = this.handleView.bind(this)
  }

  showModal () {
    this.setState({
      visible: true
    })
  }

  handleOk (e) {
    e.preventDefault()
    this.setState({
      visible: false
    })
  }

  handleCancel (e) {
    e.preventDefault()
    this.setState({
      visible: false
    })
  }

  handleSubmit (e) {
    // e.preventDefault()
    this.setState(prevState => ({
      // modalFileInput: this.fileInput,
      // uploadedFiles: prevState.uploadedFiles.concat(this.state.modalFileInput),
      // fileNames: prevState.fileNames.concat(
      //   this.fileInput.current.files[0].name
      // )
    }))
  }

  handleChange (e) {
    this.setState({
      modalInput: e.target.value
    })
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
        <SiderWrapper addFiles={this.showModal} />

        <Layout>
          <Header
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around'
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

          <Layout>
            <Content
              style={{
                background: '#fff',
                padding: 24,

                minHeight: 280,
                height: '100vh'
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
              <UploadModal

              // multiple
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

Home.propTypes = {
  // getAllFiles: PropTypes.func,
  files: PropTypes.array
}

const mapStateToProps = state => ({
  files: state.home.fileList
})

const mapDispatchToProps = {
  getAllFiles,
  showModal,
  hideModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
