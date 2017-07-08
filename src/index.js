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
    const { router: { history } } = this.context;
    const paths = React.Children.map(
      this.props.children,
      element => element.props.path
    );
    history.push(paths[index]);
  };

  render() {
    const { children, ...rest } = this.props;
    const { history, route, staticContext } = this.context.router;
    const location = this.props.location || route.location;
    const props = { location, history, staticContext };

    let matchedIndex = 0; // If there's no match, render the first route
    React.Children.forEach(children, (element, index) => {
      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;

      if (matchPath(location.pathname, { path, exact, strict })) {
        matchedIndex = index;
      }
    });

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
