import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';

export default class InputFilename extends Component {
  handleChange(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  render() {
    const { path, type } = this.props;

    let placeholder = 'example.md';
    if (type == 'posts') {
      const date = moment().format('YYYY-MM-DD');
      placeholder = `${date}-your-title.md`;
    } else if (type == 'data files') {
      placeholder = 'your-filename.yml';
    }

    let tooltip = null;
    if (type != 'data files') {
      tooltip = (
        <span className="tooltip">
          <i className="fa fa-info-circle" aria-hidden="true" />
          <span className="tooltip-text">
            If you leave <b>path</b> blank, it will be autogenerated from title.
          </span>
        </span>
      );
    }
    return (
      <div className="input-path">
        <label>Path {tooltip}</label>
        <TextareaAutosize
          key={path}
          onChange={e => this.handleChange(e)}
          placeholder={placeholder}
          defaultValue={path}
          ref="input"
        />
      </div>
    );
  }
}

InputFilename.propTypes = {
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
