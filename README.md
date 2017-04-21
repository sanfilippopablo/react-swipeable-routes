react-swipeable-routes
======================

Utility for integrating [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) with [react-router](https://github.com/ReactTraining/react-router).

## Example

Notice how the url changes when swapping.

![Example](https://fat.gfycat.com/WellinformedInfamousBuckeyebutterfly.gif)

This example is available on /example.

## Usage

````es6
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";

const RedView = () => (
  <div style={{ height: 300, backgroundColor: "red" }}>Red</div>
);
const BlueView = () => (
  <div style={{ height: 300, backgroundColor: "blue" }}>Blue</div>
);
const GreenView = () => (
  <div style={{ height: 300, backgroundColor: "green" }}>Green</div>
);
const YellowView = () => (
  <div style={{ height: 300, backgroundColor: "yellow" }}>Yellow</div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>React Swipeable Routes example</h2>
          </div>

          <div>
            <Link to="/red">Red</Link> |
            <Link to="/blue">Blue</Link> | 
            <Link to="/green">Green</Link> | 
            <Link to="/yellow">Yellow</Link>
          </div>

          <SwipeableRoutes>
            <Route path="/red" component={RedView} />
            <Route path="/blue" component={BlueView} />
            <Route path="/green" component={GreenView} />
            <Route path="/yellow" component={YellowView} />
          </SwipeableRoutes>
        </div>
      </Router>
    );
  }
}

export default App;

````

You can also pass props to SwipeableViews using the `swipeableViewsProps`:
````es6
<SwipeableRoutes swipeableViewsProps={{style: "height: 100%"}}>
  <Route path="/red" component={RedView} />
  <Route path="/blue" component={BlueView} />
  <Route path="/green" component={GreenView} />
  <Route path="/yellow" component={YellowView} />
</SwipeableRoutes>
````