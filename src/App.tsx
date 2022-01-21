import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import P404 from "./pages/404";
import P500 from "./pages/500";
import DefaultLayout from "./components/DefaultLayout";
import { filterByRoles } from "./menu";
import { useState } from "react";
import { UserContext, User } from "./UserContext";
import React from "react";
import SignInOIDC from "./pages/SignInOIDC";
import SignOutOIDC from "./pages/SignOutOIDC";

import Authorize from "./components/Authorize";

const App: React.FC = () => {
  const [menu, setMenu] = useState([] as any[]);
  User.signinCallback = User.id
    ? null
    : () => {
        const roles = User.roles;
        debugger;
        setMenu(filterByRoles(roles));
      };

  return (
    <UserContext.Provider value={User}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={
                <Authorize>
                  <DefaultLayout menu={menu}></DefaultLayout>
                </Authorize>
              }
            ></Route>
            <Route path="500" element={<P500></P500>} />
            <Route path="404" element={<P404></P404>} />
            <Route path="signin-oidc" element={<SignInOIDC></SignInOIDC>} />
            <Route
              path="signout-callback-oidc"
              element={<SignOutOIDC></SignOutOIDC>}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
};

export default App;
