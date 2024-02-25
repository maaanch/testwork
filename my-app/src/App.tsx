import React from "react";
import Dashboard from "./Main/Dashboard";
import { Routes, Route } from "react-router-dom";
import Users from "./Main/Users";
import { JWTProvider as AuthProvider } from "./context/JWTContext";
import RequireAuth from "./route-guard/RequireAuth";
import UnAuthorized from "./Main/Components/UnAuthorized";
import NoFound from "./Main/Components/NotFound";
import SignIn from "./Auth/SignIn";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<RequireAuth allowedRoles={[1234, 4567, 7890]} />}>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Users />} />
              <Route path="charts" element={<h1>Charts</h1>} />
            </Route>
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="unauthorized" element={<UnAuthorized />} />
          <Route path="*" element={<NoFound />} />
        </Routes>
      </AuthProvider>

      {/* <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="tasks" element={<></>} />
        </Route>
      </Routes> */}
    </>
  );
}

export default App;
