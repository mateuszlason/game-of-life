import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import GameOfLife from "./components/GameOfLife";
import WelcomeScreen from "./components/WelcomeScreen";
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={WelcomeScreen} />
        <Route path="/game" component={GameOfLife} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
