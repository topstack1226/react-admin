import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { ADMIN_PREFIX } from '../../constants';
import Dropzone from 'react-dropzone';
import Button from '../../components/Button';
import FilePreview from '../../components/FilePreview';
import InputSearch from '../../components/form/InputSearch';
import { search } from '../../actions/utils';
import { existingUploadedFilenames } from '../../utils/helpers.js';
import { filterByFilename } from '../../reducers/staticfiles';
import { getOverrideMessage } from '../../constants/lang';
import {
  fetchStaticFiles, uploadStaticFiles, deleteStaticFile
} from '../../actions/staticfiles';

export class StaticFiles extends Component {

  componentDidMount() {
    const { fetchStaticFiles } = this.props;
    fetchStaticFiles();
  }

  onDrop (uploadedFiles) {
    const { uploadStaticFiles, files } = this.props;
    const existingFiles = existingUploadedFilenames(uploadedFiles, files);
    if (existingFiles.length > 0) {
      const confirm = window.confirm(getOverrideMessage(existingFiles.join(', ')));
      if (!confirm) {
        return false;
      }
    }
    uploadStaticFiles(uploadedFiles);
  }

  openDropzone() {
    this.refs.dropzone.open();
  }

  renderDropzone() {
    const { files, deleteStaticFile } = this.props;
    return (
      <Dropzone
        onDrop={(files) => this.onDrop(files)}
        ref="dropzone"
        className="dropzone"
        activeClassName="dropzone-active"
        multiple={true}
        disableClick={true}>
          {
            files.length > 0 &&
            <div className="preview-container">
              {
                _.map(files, (file, i) => {
                  return <FilePreview onClickDelete={deleteStaticFile} key={i} file={file} />;
                })
              }
            </div>
          }
          {
            !files.length &&
            <div className="preview-info">
              <i className="fa fa-upload" aria-hidden="true" />
              <p>Drag and drop file(s) here to upload</p>
            </div>
          }
      </Dropzone>
    );
  }

  render() {
    const { files, isFetching, search } = this.props;

    if (isFetching) {
      return null;
    }

    return (
      <div>
        <div className="content-header">
          <h1>Static Files</h1>
          <Button
            onClick={() => this.openDropzone()}
            type="upload"
            icon="upload"
            active={true} />
          <div className="pull-right">
            <InputSearch searchBy="filename" search={search} />
          </div>
        </div>
        {this.renderDropzone()}
      </div>
    );
  }
}

StaticFiles.propTypes = {
  files: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchStaticFiles: PropTypes.func.isRequired,
  uploadStaticFiles: PropTypes.func.isRequired,
  deleteStaticFile: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  files: filterByFilename(state.staticfiles.files, state.utils.input),
  isFetching: state.staticfiles.isFetching
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchStaticFiles,
  uploadStaticFiles,
  deleteStaticFile,
  search
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StaticFiles);
