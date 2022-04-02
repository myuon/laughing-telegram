import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import IndexPage from "./pages/Index";
import LoginPage from "./pages/Login";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
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
    <Providers>
      <AppRoutes />
    </Providers>
  );
};

export default App;
