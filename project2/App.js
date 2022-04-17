import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Home from "./components/Home.js";
import Movie from "./components/Movie.js";

const nav = createStackNavigator({
  Home: {
    screen: Home,
  },
  Movie: {
    screen: Movie,
  },
});

const AppNavigator = createAppContainer(nav);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
