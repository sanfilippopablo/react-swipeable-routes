import React from "react";
import { MemoryRouter, Route } from "react-router";
import { mount } from "enzyme";
import SwipeableRoutes from "../src";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  getByText,
  wait
} from "react-testing-library";

const RedView = () => <div>RedView</div>;
const BlueView = () => <div>BlueView</div>;

test("render when using Route render method and pass all props", () => {
  const { container } = render(
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

  getByText(container, "RedView");
});

test("render when using Route render method", () => {
  render(
    <MemoryRouter initialEntries={["/red"]}>
      <SwipeableRoutes>
        <Route path="/red" render={() => <RedView />} />
      </SwipeableRoutes>
    </MemoryRouter>
  );
});

test("renders all the child routes", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/"]}>
      <SwipeableRoutes>
        <Route path="/red" component={RedView} />
        <Route path="/blue" component={BlueView} />
      </SwipeableRoutes>
    </MemoryRouter>
  );
  getByText("RedView");
  getByText("BlueView");
});

test("shows the route matching the location", async () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/blue"]}>
      <SwipeableRoutes>
        <Route path="/red" component={RedView} />
        <Route path="/blue" component={BlueView} />
      </SwipeableRoutes>
    </MemoryRouter>
  );

  const RedViewWrapper = getByText("RedView").parentElement;
  const BlueViewWrapper = getByText("BlueView").parentElement;

  setTimeout(() => {
    // RedView should be invisible
    expect(RedViewWrapper.getAttribute("aria-hidden")).toBe("true");

    // BlueView should be visible
    expect(BlueViewWrapper.getAttribute("aria-hidden")).toBe("false");
  }, 1);
});

test("changes the url when the visible view changes", () => {
  // jsdom doesn't support touch events, so let's use
  // enableMouseEvents so we can use mouse events to
  // trigger swipe instead
  const { getByText } = render(
    <MemoryRouter initialEntries={["/red"]}>
      <SwipeableRoutes enableMouseEvents>
        <Route path="/red" component={RedView} />
        <Route path="/blue" component={BlueView} />
      </SwipeableRoutes>
    </MemoryRouter>
  );

  const RedViewWrapper = getByText("RedView").parentElement;

  // RedView is visible
  expect(RedViewWrapper.getAttribute("aria-hidden")).toBe("false");

  // Swipe
  const start = { pageX: 1000, pageY: 10 };
  const end = { pageX: 20, pageY: 10 };
  fireEvent.mouseDown(RedViewWrapper, start);
  fireEvent.mouseMove(RedViewWrapper, end);
  fireEvent.mouseUp(RedViewWrapper, end);

  setTimeout(() => {
    // Now RedView is hidden
    expect(RedViewWrapper.getAttribute("aria-hidden")).toBe("true");
    expect(window.location.pathname).toBe("/blue");
  }, 300);
});
