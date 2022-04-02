import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import IndexPage from "./pages/Index";
import LoginPage from "./pages/Login";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const AppRoutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <IndexPage />,
    },
    { path: "login", element: <LoginPage /> },
  ]);

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
