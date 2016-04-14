import { shallow, mount, render } from 'enzyme';
import TopNav from "../../../app/components/layout/topnav/TopNav";
import React, {Component} from 'react';
import chai,{expect} from "chai";
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

const user = { name: 'Foo', picture: 'bar.png' };

describe("AppRoot Component", function() {

  it('should render as a `.navbar`', () => {
    const wrapper = shallow(<TopNav />);
    expect(wrapper).to.have.className('navbar');
  });

  it('should render as `.authenticated` when user is logged in', () => {
    const wrapper = shallow(<TopNav user={user} />);
    expect(wrapper).to.have.className('authenticated');
  });

});
