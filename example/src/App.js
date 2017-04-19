import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactSwipeableRoutes from "../../lib";

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

          <ReactSwipeableRoutes>
            <Route path="/red" component={RedView} />
            <Route path="/blue" component={BlueView} />
            <Route path="/green" component={GreenView} />
            <Route path="/yellow" component={YellowView} />
          </ReactSwipeableRoutes>
        </div>
      </Router>
    );
  }
}

export default App;
