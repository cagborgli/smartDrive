import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getAllTrash } from '../async-actions/getAllTrash'
import { Table } from 'antd'
import DeleteButton from './SmartDeleteButton'
import FileInfo from './FileInfo'
import RestoreButton from './RestoreButton'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, record) => (
      <FileInfo record={record} value={text}>
        {text}
      </FileInfo>
    )
  },
  {
    title: 'Created',
    dataIndex: 'created'
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
    render: text => (
      <span>{`${Math.ceil(Number.parseInt(text) / 1024)}KB`}</span>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <a href='javascript:;'>
          <DeleteButton key={record.key} id={record.key} value={record.name} />
        </a>
        <RestoreButton key={record.key} id={record.key} />
      </div>
    )
  }
]

class ListView extends React.Component {
  constructor (props) {
    super(props)
    this.start = this.start.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)

    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    }
  }

  componentDidMount () {
    this.props.getAllTrash()
  }

  start () {
    this.setState({ loading: true })

    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      })
    }, 1000)
  }

  onSelectChange (selectedRowKeys) {
    this.setState({ selectedRowKeys })
  }

  render () {
    const { files } = this.props
    let mappedFiles = []
    if (files) {
      mappedFiles = files.map(file => ({
        key: file.id,
        name: file.name,
        created: file.created,
        size: file.size
      }))
    }
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    const hasSelected = selectedRowKeys.length > 0
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={mappedFiles}
        />
      </div>
    )
  }
}

ListView.propTypes = {
  getAllTrash: PropTypes.func,
  files: PropTypes.array
}

const mapStateToProps = state => ({
  files: state.trash.fileObjects
})

const mapDispatchToProps = dispatch => ({
  getAllTrash: () => dispatch(getAllTrash())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView)
