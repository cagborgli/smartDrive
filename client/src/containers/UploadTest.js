import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { upload } from '../async-actions/upload'
import { setUploadFiles } from '../action-creators/upload'

class UploadTest extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    this.props.setUploadFiles([...e.target.files])
  }

  render () {
    const { files, upload, uploading, error, errorMessage } = this.props
    let mappedFiles
    if (error) {
      return <p>{errorMessage}</p>
    }
    if (uploading) {
      return <p>Uploading files...</p>
    }
    if (files) {
      mappedFiles = files.map((file, idx) => <p key={idx}>{file.name}</p>)
    } else {
      mappedFiles = <p />
    }
    return (
      <div>
        <label>Choose files to upload</label>
        <input type='file' multiple onChange={this.handleChange} />
        {mappedFiles}
        <button onClick={upload}>Upload</button>
      </div>
    )
  }
}

UploadTest.propTypes = {
  setUploadFiles: PropTypes.func,
  files: PropTypes.array,
  upload: PropTypes.func,
  uploading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
}

const mapStateToProps = state => ({
  files: state.upload.files,
  uploading: state.upload.uploading,
  error: state.upload.error,
  errorMessage: state.upload.errorMessage
})

const mapDispatchToProps = {
  setUploadFiles,
  upload
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadTest)
