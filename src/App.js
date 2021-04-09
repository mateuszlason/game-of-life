import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import GameOfLife from "./components/GameOfLife";
import WelcomeScreen from "./components/WelcomeScreen";
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/game-of-life" exact component={WelcomeScreen} />
        <Route path="/game-of-life/play" component={GameOfLife} />
        <Redirect exact to="/game-of-life" />
      </Switch>
    </>
  );
};

export default App;
