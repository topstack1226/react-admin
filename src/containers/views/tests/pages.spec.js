import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import { Pages } from '../Pages';

import { page } from './fixtures';

function setup(pages=[page]) {
  const actions = {
    fetchPages: expect.createSpy(),
    deletePage: expect.createSpy(),
    search: expect.createSpy()
  };

  const component = mount(
    <Pages
      pages={pages}
      isFetching={false}
      params={{ splat: 'page-dir' }}
      {...actions} />
  );

  return {
    component: component,
    actions: actions,
    h1: component.find('h1').last(),
    table: component.find('.content-table')
  };
}

describe('Containers::Pages', () => {
  it('should render correctly', () => {
    const { component, table, h1 } = setup();
    expect(h1.node).toNotExist();
  });

  it('should render correctly when there are not any pages', () => {
    const { component, table, h1 } = setup([]);
    const compProps = component.props();
    expect(table.node).toNotExist();
    expect(h1.text()).toBe(`No pages found.`);
  });

  it('should call fetchPages action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchPages).toHaveBeenCalled();
  });
});
