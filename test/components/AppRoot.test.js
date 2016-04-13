import { shallow, mount, render } from 'enzyme';
import AppRoot from "../../app/components/AppRoot";
import React, {Component} from 'react';
import chai,{expect} from "chai";
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

describe("AppRoot Component", function() {

  it('should render as a `.container`', () => {
    const wrapper = shallow(<AppRoot />);
    expect(wrapper).to.have.className('container');
    expect(wrapper).to.not.have.className('fetching');
  });

  it('should render as `.fetching` when fetching prop is true', () => {
    const wrapper = shallow(<AppRoot fetching={true} />);
    expect(wrapper).to.have.className('fetching');
  });

});
