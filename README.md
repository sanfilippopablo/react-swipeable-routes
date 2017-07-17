# react-swipeable-routes

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Utility for integrating [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) with [react-router](https://github.com/ReactTraining/react-router).

[build-badge]: https://img.shields.io/travis/sanfilippopablo/react-swipeable-routes/master.png?style=flat-square
[build]: https://travis-ci.org/sanfilippopablo/react-swipeable-routes

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/sanfilippopablo/react-swipeable-routes/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/sanfilippopablo/react-swipeable-routes

## Example

Notice how the url changes when swipping.

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

Any additional props will be passed down to `SwipeableViews`:
````es6
<SwipeableRoutes containerStyle={{"height: 100%"}}>
  <Route path="/red" component={RedView} />
  <Route path="/blue" component={BlueView} />
  <Route path="/green" component={GreenView} />
  <Route path="/yellow" component={YellowView} />
</SwipeableRoutes>
````