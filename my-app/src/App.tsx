import React from "react";
import Dashboard from "./Main/Dashboard";
import { Routes, Route } from "react-router-dom";
import Users from "./Main/Users";
import { JWTProvider as AuthProvider } from "./context/JWTContext";
import RequireAuth from "./route-guard/RequireAuth";
import UnAuthorized from "./Main/Components/UnAuthorized";
import NoFound from "./Main/Components/NotFound";
import SignIn from "./Auth/SignIn";
import Charts from "./Main/Charts";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Routes>
            <Route element={<RequireAuth allowedRoles={[1234, 4567, 7890]} />}>
              <Route path="/" element={<Dashboard />}>
                <Route index element={<Users />} />
                <Route path="charts" element={<Charts />} />
              </Route>
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="unauthorized" element={<UnAuthorized />} />
            <Route path="*" element={<NoFound />} />
          </Routes>
        </AuthProvider>
      </ApolloProvider>
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
