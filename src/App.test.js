import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import { declareVariable } from "@babel/types";

//connection adather from enzyme
configure({ adapter: new Adapter() });

test("There is text Text example", () => {
  const { getByText } = render(<App />);
  const content = getByText(/Bird sighting log/i);
  expect(content).toBeInTheDocument();
});

describe("Testing App", () => {
  //Enzyme enables rendering isolated componentent
  it("Should return one div", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div")).toHaveLength(1);
  });
  it("Should return three p", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("p")).toHaveLength(3);
  });
  it("Should return two Links", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Link")).toHaveLength(2);
  });

});
