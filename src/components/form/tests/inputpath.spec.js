import React from 'react';
import { Link } from 'react-router';
import expect from 'expect';
import { mount } from 'enzyme';
import { capitalize } from '../../../utils/helpers';
import moment from 'moment';
import InputPath from '../InputPath';

const props = {
  path: "test.md",
  type: "posts",
  splat: "test/some/other"
};

function setup(defaultProps = props) {
  const actions = {
    onChange: expect.createSpy()
  };

  let component = mount(
    <InputPath {...defaultProps} {...actions}/>
  );

  return {
    component: component,
    input: component.find('textarea'),
    actions
  };
}

describe('Components::InputPath', () => {
  it('should render correctly', () => {
    const { component, links, input } = setup();
    expect(input.node).toExist();
  });

  it('should prepend date to input value/placeholder for new post', () => {
    const { input } = setup(Object.assign({}, props, {
      type: 'posts'
    }));
    const expectedValue = moment().format('YYYY-MM-DD') + '-your-title.md';
    expect(input.prop('placeholder')).toBe(expectedValue);
  });

  it('should call onChange', () => {
    const { input, actions } = setup();
    input.simulate('change');
    expect(actions.onChange).toHaveBeenCalled();
  });
});
