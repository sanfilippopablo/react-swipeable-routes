import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwipeableRoutes from "../../lib";

const RedView = () =>
  <div style={{ height: 300, backgroundColor: "red" }}>Red</div>;
const BlueView = () =>
  <div style={{ height: 300, backgroundColor: "blue" }}>Blue</div>;
const GreenView = () =>
  <div style={{ height: 300, backgroundColor: "green" }}>Green</div>;
const YellowView = () =>
  <div style={{ height: 300, backgroundColor: "yellow" }}>Yellow</div>;

class App extends Component {
  state = {
    index: 0
  };

  render() {
    return (
      <Router>
        <div>
          <h2>Demo</h2>
          <div>
            <h3>Simple example</h3>

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

          <div>
            <h3>
              With index {this.state.index.toFixed(1)}
            </h3>

            <div>
              <Link to="/red">Red</Link> |
              <Link to="/blue">Blue</Link> |
              <Link to="/green">Green</Link> |
              <Link to="/yellow">Yellow</Link>
            </div>

            <SwipeableRoutes onChangeIndex={index => this.setState({ index })}>
              <Route path="/red" component={RedView} />
              <Route path="/blue" component={BlueView} />
              <Route path="/green" component={GreenView} />
              <Route path="/yellow" component={YellowView} />
            </SwipeableRoutes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
