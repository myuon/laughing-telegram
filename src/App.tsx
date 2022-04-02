import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthProvider, initializeUseAuth } from "./helpers/useAuth";
import IndexPage from "./pages/Index";
import LoginPage from "./pages/Login";

const Providers = ({ children }: { children: React.ReactNode }) => {
  // initializeUseAuth depends on BrowserRouter
  return <AuthProvider value={initializeUseAuth()}>{children}</AuthProvider>;
};

const routes = [
  {
    path: "/",
    element: <IndexPage />,
  },
  { path: "login", element: <LoginPage /> },
];

const AppRoutes = () => {
  const element = useRoutes(routes);

  return element;
};

const App = () => {
  return (
    <BrowserRouter>
      <Providers>
        <AppRoutes />
      </Providers>
    </BrowserRouter>
  );
};

export default App;
