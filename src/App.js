import React, { useRef, useEffect, useState } from "react";
import { Row } from "reactstrap";
import Example1 from "./Examples/Example1";
import Example2 from "./Examples/Example2";
import Header from "./Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Row>
          <Header />
          <Switch>
            <Route path="/example1">
              <Example1 />
            </Route>
            <Route path="/example2">
              <Example2 />
            </Route>

            <Route path="/">
              <Example1 />
            </Route>
            <Route path="/example2">
              <Example2 />
            </Route>
          </Switch>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
