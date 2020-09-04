import React from "react";
import "./css/app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./userList.js";
import UserActivity from "./userActivity.js";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="appBody">
          <Switch>
            <Route path="/" exact component={UserList} />
            <Route path="/activity/:id" exact component={UserActivity} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
