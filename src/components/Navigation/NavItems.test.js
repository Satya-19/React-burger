import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavItems from "./NavItems";
import Nav from "./Nav";

configure({ adapter: new Adapter() });

describe("NavItems", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });

  it("should render 2 NavItems", () => {
    expect(wrapper.find(Nav)).toHaveLength(2);
  });

  it("should render 3 NavItems", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(Nav)).toHaveLength(3);
  });

  it("should render 3 NavItems", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<Nav link="/logout">Logout</Nav>)).toEqual(true);
  });
});
