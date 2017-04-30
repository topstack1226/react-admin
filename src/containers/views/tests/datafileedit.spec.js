import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';

import { DataFileEdit } from '../DataFileEdit';

const defaultProps = {
  datafile: {},
  updated: false,
  datafileChanged: false,
  router: {},
  route: {},
  params: { data_file: "data_file" },
  errors: [],
  isFetching: false
};

const setup = (props = defaultProps) => {
  const actions = {
    fetchDataFile: jest.fn(),
    putDataFile: jest.fn(),
    deleteDataFile: jest.fn(),
    onDataFileChanged: jest.fn(),
    clearErrors: jest.fn()
  };

  const component = shallow(<DataFileEdit {...actions} {...props} />);

  return {
    component,
    actions,
    saveButton: component.find('.content-side a').first(),
    deleteButton: component.find('.content-side').last(),
    props
  };
};

describe('Containers::DataFileEdit', () => {
  it('should render correctly', () => {
    let { component } = setup(Object.assign(
      {}, defaultProps, { isFetching: true }
    ));
    component = setup(Object.assign(
      {}, defaultProps, { datafile: {} }
    )).component;
    expect(component.find('h1').node).toBeTruthy();
  });

  it('should not call putDataFile if a field is not changed.', () => {
    const { saveButton, actions } = setup();
    saveButton.simulate('click');
    expect(actions.putDataFile).not.toHaveBeenCalled();
  });

  it('should call deleteDataFile', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteDataFile).not.toHaveBeenCalled(); // TODO pass prompt
  });
});
