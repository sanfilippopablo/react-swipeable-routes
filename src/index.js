import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import { Route, matchPath } from "react-router";
import PropTypes from "prop-types";

class SwipeableRoutes extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired
    }).isRequired
  };

  handleIndexChange = (index, type) => {
    // Trigger the location change to the route path
    const { router: { history } } = this.context;
    const paths = React.Children.map(
      this.props.children,
      element => element.props.path
    );
    history.push(paths[index]);

    // Call the onChangeIndex if it's set
    if (typeof this.props.onChangeIndex === "function") {
      this.props.onChangeIndex(index, type);
    }
  };

  componentDidMount() {
    const { children } = this.props;
    const { router: { history } } = this.context;
    this.unlistenHistory = history.listen(location => {
      // When the location changes, call onChangeIndex with the route index
      React.Children.forEach(children, (element, index) => {
        const { path: pathProp, exact, strict, from } = element.props;
        const path = pathProp || from;

        if (matchPath(location.pathname, { path, exact, strict })) {
          if (typeof this.props.onChangeIndex === "function") {
            this.props.onChangeIndex(index);
          }
        }
      });
    });
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  render() {
    const { children, index, ...rest } = this.props;
    const { history, route, staticContext } = this.context.router;
    const location = this.props.location || route.location;
    const props = { location, history, staticContext };

    let matchedIndex = 0; // If there's no match, render the first route
    if (index) {
      matchedIndex = index;
    } else {
      React.Children.forEach(children, (element, index) => {
        const { path: pathProp, exact, strict, from } = element.props;
        const path = pathProp || from;

        if (matchPath(location.pathname, { path, exact, strict })) {
          matchedIndex = index;
        }
      });
    }

    return (
      <SwipeableViews
        {...rest}
        index={matchedIndex}
        onChangeIndex={this.handleIndexChange}
      >
        {React.Children.map(children, element => {
          const { component, render, children } = element.props;
          // A lot of this code is borrowed from the render method of
          // Route. Why can't I just render the Route then?
          // Because Route only renders the component|render|children
          // if there's a match with the location, while here I render
          // regardless of the location.
          return component
            ? React.createElement(component, props)
            : render
                ? render()
                : children
                    ? typeof children === "function"
                        ? children(props)
                        : !Array.isArray(children) || children.length // Preact defaults to empty children array
                            ? React.Children.only(children)
                            : null
                    : null;
        })}
      </SwipeableViews>
    );
  }
}

export default SwipeableRoutes;
