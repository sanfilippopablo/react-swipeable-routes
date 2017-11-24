import React from "react";
import { MemoryRouter, Route } from "react-router";
import { mount } from "enzyme";
import SwipeableRoutes from "../src";

const RedView = () => <div>RedView</div>;
const BlueView = () => <div>BlueView</div>;

const Main = ({ initialPath }) =>
  <MemoryRouter initialEntries={[initialPath]}>
    <SwipeableRoutes>
      <Route path="/red" component={RedView} />
      <Route path="/blue" component={BlueView} />
    </SwipeableRoutes>
  </MemoryRouter>;

test("render when using Route render method and pass all props", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/red"]}>
      <SwipeableRoutes>
        <Route
          path="/red"
          render={props => {
            expect(Object.keys(props)).toEqual(
              expect.arrayContaining(["location", "history", "staticContext"])
            );
            return <RedView />;
          }}
        />
      </SwipeableRoutes>
    </MemoryRouter>
  );

  expect(wrapper.text()).toBe("RedView");
});

test("render when using Route render method", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/red"]}>
      <SwipeableRoutes>
        <Route path="/red" render={() => <RedView />} />
      </SwipeableRoutes>
    </MemoryRouter>
  );
});

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

// test("changes the url when the visible view changes", () => {
//   const wrapper = mount(<Main initialPath="/red" />);
//   const SwipeableViewsWrapper = wrapper.find("SwipeableViews");
//   const RedViewWrapper = wrapper.find("RedView").parent();

//   // RedView is visible
//   expect(RedViewWrapper.getDOMNode().getAttribute("aria-hidden")).toBe("false");

//   // Swipe

//   // Now RedView is hidden
//   expect(RedViewWrapper.getDOMNode().getAttribute("aria-hidden")).toBe("true");
// });
