import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { CalendarPage } from "./pages/CalendarPage";
import { GroupSettings } from "./components/GroupSettings";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/settings" component={GroupSettings} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
