# react-swipeable-routes

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Utility for integrating [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) with [react-router](https://github.com/ReactTraining/react-router).

[build-badge]: https://img.shields.io/travis/sanfilippopablo/react-swipeable-routes/master.png?style=flat-square
[build]: https://travis-ci.org/sanfilippopablo/react-swipeable-routes
[npm-badge]: https://img.shields.io/npm/v/react-swipeable-routes.png?style=flat-square
[npm]: https://www.npmjs.com/package/react-swipeable-routes
[coveralls-badge]: https://img.shields.io/coveralls/sanfilippopablo/react-swipeable-routes/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/sanfilippopablo/react-swipeable-routes

## Example

Notice how the url changes when swipping.

![Example](https://fat.gfycat.com/WellinformedInfamousBuckeyebutterfly.gif)

This example is available on /example.

## Usage

```es6
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
            <Link to="/red">Red</Link> |<Link to="/blue">Blue</Link> |
            <Link to="/green">Green</Link> |<Link to="/yellow">Yellow</Link>
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
```

Any additional props will be passed down to `SwipeableViews`:

```es6
<SwipeableRoutes containerStyle={{"height: 100%"}}>
  <Route path="/red" component={RedView} />
  <Route path="/blue" component={BlueView} />
  <Route path="/green" component={GreenView} />
  <Route path="/yellow" component={YellowView} />
</SwipeableRoutes>
```

### Replace url instead of push

You can add a `replace` prop to `SwipeableRoutes` and it will replace location instead of pushing it when swiping.

```es6
<SwipeableRoutes replace containerStyle={{"height: 100%"}}>
  <Route path="/red" component={RedView} />
  <Route path="/blue" component={BlueView} />
  <Route path="/green" component={GreenView} />
  <Route path="/yellow" component={YellowView} />
</SwipeableRoutes>
```

### Scroll to top on swipe

```es6
class App extends Component {
  scrollToTop = index => {
    Array.from(this.el.containerNode.children).forEach((child, i) => {
      if (index !== i) {
        child.scrollTo(0, 0);
      }
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <SwipeableRoutes
            replace
            onChangeIndex={this.scrollToTop}
            innerRef={el => (this.el = el)}
            containerStyle={{ height: 200 }}
          >
            <Route path="/red" component={RedView} />
            <Route path="/blue" component={BlueView} />
          </SwipeableRoutes>
        </div>
      </Router>
    );
  }
}
```

### Routes with parameters

You can include routes with parameters in the path. However, you can't swipe to them directly, you have to enter through a link or a url change. If you want to be able to swipe to them, you can include a `defaultParams` props specifying the default parameters for when swipping to them.

```es6
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
const OtherColorView = ({ match }) => (
  <div style={{ height: 300, backgroundColor: match.params.color }}>
    {match.params.color}
  </div>
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
            <Link to="/red">Red</Link> |<Link to="/blue">Blue</Link> |
            <Link to="/green">Green</Link> |<Link to="/yellow">Yellow</Link> |
            <Link to="/other/palevioletred">Pale Violet Red</Link> |
            <Link to="/other/saddlebrown">Saddle Brown</Link>
          </div>

          <SwipeableRoutes>
            <Route path="/red" component={RedView} />
            <Route path="/blue" component={BlueView} />
            <Route path="/green" component={GreenView} />
            <Route path="/yellow" component={YellowView} />
            <Route
              path="/other/:color"
              component={OtherColorView}
              defaultParams={{ color: "grey" }}
            />
          </SwipeableRoutes>
        </div>
      </Router>
    );
  }
}

export default App;
```

Unlike react-router, with react-swipeable-routes all routes have to be rendered at all times. Because of that, unlike react-router, in which your component gets a match object only if there was a match, here your rendered component will always receive a `match` prop with same structure as the `match` prop in react-router except for one difference: it includes a type object indicating what type of match it is:

- `none`: The view was never rendered and its parameters are the specified defaults.
- `outOfView`: The view has different parameters than default, but it's currently out of the screen.
- `full`: The view is currently on screen an it has different parameters than default.
