import { shallow, mount, render } from 'enzyme';
import {PureProfileDropdown as ProfileDropdown} from "../../../../app/components/layout/topnav/ProfileDropdown";
import React, {Component} from 'react';
import chai,{expect} from "chai";
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme());

const user = { name: 'Foo', picture: 'bar.png' };

describe("ProfileDropdown Component", function() {

  it('should render as a `.nav`', () => {

    const wrapper = shallow(<ProfileDropdown />);
    expect(wrapper).to.have.className('nav');
    
  });

  it('should start off without the dropdown', () => {

    const wrapper = shallow(<ProfileDropdown />);
	expect(wrapper.find('.dropdown')).to.not.exist;
    
  });

  it('should show auth menu when user authenticated', () => {

    const wrapper = shallow(<ProfileDropdown user={user} />);
	expect(wrapper.find('.menu-auth')).to.have.length(1);
    
  });

  it('should not show dropdown when state `isOpen` is false', () => {

    const wrapper = shallow(<ProfileDropdown user={user} />);
	expect(wrapper.find('.settings')).to.have.length(0);
    
  });

  it('should show dropdown when state `isOpen` is true', () => {

    const wrapper = shallow(<ProfileDropdown user={user} />);
    wrapper.find('#action-toggle').simulate('click');
	expect(wrapper.find('.settings')).to.have.length(1);
    
  });

});
