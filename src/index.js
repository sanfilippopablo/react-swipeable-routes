import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import { Route, matchPath } from "react-router";
import PropTypes from "prop-types";
import generatePath from "./generatePath";

class SwipeableRoutes extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired
    }).isRequired
  };

  state = {
    urls: {}
  };

  // Trigger the location change to the route path
  handleIndexChange = (index, type) => {
    const { router: { history } } = this.context;
    const { props: { path, defaultParams } } = React.Children.toArray(
      this.props.children
    )[index];

    let url;
    if (path.includes(":")) {
      if (path in this.state.urls) {
        url = this.state.urls[path];
      } else {
        // Build url with defaults
        url = generatePath(path, defaultParams);
        this.setState(state => ({ urls: { ...state.urls, [path]: url } }));
      }
    } else {
      url = path;
    }
    history.push(url);

    // Call the onChangeIndex if it's set
    if (typeof this.props.onChangeIndex === "function") {
      this.props.onChangeIndex(index, type);
    }
  };

  triggerOnChangeIndex = location => {
    const { children } = this.props;
    React.Children.forEach(children, (element, index) => {
      const { path: pathProp, exact, strict, from } = element.props;
      const path = pathProp || from;
      if (matchPath(location.pathname, { path, exact, strict })) {
        if (typeof this.props.onChangeIndex === "function") {
          this.props.onChangeIndex(index);
        }
        this.setState(state => ({
          urls: { ...state.urls, [path]: location.pathname }
        }));
      }
    });
  };

  componentDidMount() {
    const { router: { history } } = this.context;
    this.triggerOnChangeIndex(history.location);
    this.unlistenHistory = history.listen(location => {
      // When the location changes, call onChangeIndex with the route index
      this.triggerOnChangeIndex(location);
    });
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  componentDidUpdate(prevProps) {
    const { router: { history } } = this.context;

    // If index prop changed, change the location to the path of that route
    if (prevProps.index !== this.props.index) {
      const paths = React.Children.map(
        this.props.children,
        element => element.props.path
      );
      history.push(paths[this.props.index]);
    }
  }

  render() {
    const { children, index, ...rest } = this.props;
    const { history, route, staticContext } = this.context.router;
    const location = this.props.location || route.location;

    // If there's no match, render the first route with no params
    let matchedIndex = 0;
    let match;
    if (index) {
      matchedIndex = index;
      const routes = React.Children.toArray(children);
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (!route.props.path.includes(":")) {
          match = matchPath(firstRoute.props.path, {
            path: firstRoute.props.path
          });
          break;
        }
      }
      if (!match) {
        throw Error("There must be at least one route without parameters");
      }
    } else {
      React.Children.forEach(children, (element, index) => {
        const { path: pathProp, exact, strict, from } = element.props;
        const path = pathProp || from;

        match = matchPath(location.pathname, { path, exact, strict });
        if (match) {
          matchedIndex = index;
        }
      });
    }

    const renderableRoutes = React.Children.toArray(children).filter(
      (element, index) =>
        !element.props.path.includes(":") ||
        Boolean(element.props.defaultParams) ||
        element.props.path in this.state.urls
    );

    console.log(`renderableRoutes: ${renderableRoutes.length}. children: ${React.Children.count(children)}`)

    return (
      <SwipeableViews
        {...rest}
        index={matchedIndex}
        onChangeIndex={this.handleIndexChange}
      >
        {renderableRoutes.map((element, index) => {
          const { path, component, render, children } = element.props;
          const props = { location, history, staticContext };

          let match = matchPath(location.pathname, element.props);
          if (match) {
            match.type = "full";
          } else if (path in this.state.urls) {
            match = matchPath(this.state.urls[path], element.props);
            match.type = "outOfView";
          } else {
            console.log(element.props.defaultParams);
            match = matchPath(
              generatePath(path, element.props.defaultParams),
              element.props
            );
            match.type = "none";
          }
          props.match = match;

          console.log(match);

          // A lot of this code is borrowed from the render method of
          // Route. Why can't I just render the Route then?
          // Because Route only renders the component|render|children
          // if there's a match with the location, while here I render
          // regardless of the location.
          return component
            ? React.createElement(component, props)
            : render
              ? render(props)
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
