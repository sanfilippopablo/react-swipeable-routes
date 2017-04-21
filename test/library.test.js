import React from "react";
import { MemoryRouter, Route } from "react-router";
import { SwipeableViews } from "react-swipeable-views";
import { mount } from "enzyme";

function createClientXY(x, y) {
  return { clientX: x, clientY: y };
}

export function createStartTouchEventObject({ x = 0, y = 0 }) {
  return { touches: [createClientXY(x, y)] };
}

export function createMoveTouchEventObject({ x = 0, y = 0}) {
  return { changedTouches: [createClientXY(x, y)] };
}

import SwipeableRoutes from "../lib";

const RedView = () => <div>RedView</div>;
const BlueView = () => <div>BlueView</div>;

const Main = ({ initialPath }) => (
  <MemoryRouter initialEntries={[initialPath]}>
    <SwipeableRoutes>
      <Route path="/red" component={RedView} />
      <Route path="/blue" component={BlueView} />
    </SwipeableRoutes>
  </MemoryRouter>
);

test("renders all the child routes", () => {
  const wrapper = mount(<Main initialPath="/" />);
  expect(wrapper.text()).toEqual("RedViewBlueView");
});

test("shows the route matching the location", () => {
  const wrapper = mount(<Main initialPath="/blue" />);

  // RedView should be invisible
  const RedViewWrapper = wrapper.find("RedView").parent();
  expect(RedViewWrapper.getDOMNode().getAttribute("aria-hidden")).toBe("true");

  // BlueView should be visible
  const BlueViewWrapper = wrapper.find("BlueView").parent();
  expect(BlueViewWrapper.getDOMNode().getAttribute("aria-hidden")).toBe(
    "false"
  );
});

/*
test("changes the url when the visible view changes", () => {
  const wrapper = mount(<Main initialPath="/red" />);
  const SwipeableViewsWrapper = wrapper.find("SwipeableViews");
  const RedViewWrapper = wrapper.find("RedView").parent();

  // RedView is visible
  expect(RedViewWrapper.getDOMNode().getAttribute("aria-hidden")).toBe("false");

  // Swipe
  // I'm not exactly sure what to put here

  // Now RedView is hidden
  expect(RedViewWrapper.getDOMNode().getAttribute("aria-hidden")).toBe("true");
});
*/
