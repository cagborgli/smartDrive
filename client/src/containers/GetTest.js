import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllFiles } from '../async-actions/getAllFiles'

class GetTest extends React.Component {
  render () {
    const { files, loading, error, errorMessage, getAllFiles } = this.props
    let mappedFiles
    if (error) {
      return <p>Error: {errorMessage}</p>
    }
    if (loading) {
      return <p>Getting files...</p>
    }

    if (files) {
      mappedFiles = files.map((file, idx) => <p key={idx}>{file.name}</p>)
    } else {
      mappedFiles = <p />
    }
    return (
      <div>
        <label>Files at /files:</label>
        {mappedFiles}
        <button onClick={() => getAllFiles()}>Get</button>
      </div>
    )
  }
}

GetTest.propTypes = {
  getAllFiles: PropTypes.func,
  files: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
}

const mapStateToProps = state => ({
  files: state.home.fileList,
  loading: state.home.loading,
  error: state.home.error,
  errorMessage: state.home.errorMessage
})

const mapDispatchToProps = {
  getAllFiles
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetTest)
