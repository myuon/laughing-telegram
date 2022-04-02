import React from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Router } from "./components/Router";
import { AuthProvider, useAuth, useInitializeUseAuth } from "./helpers/useAuth";
import IndexPage from "./pages/Index";
import LoginPage from "./pages/Login";

const Providers = ({ children }: { children: React.ReactNode }) => {
  // This depends on BrowserRouter
  const value = useInitializeUseAuth();

  return <AuthProvider value={value}>{children}</AuthProvider>;
};

const authRoutes = [
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

const noAuthRoutes = [
  { path: "login", element: <LoginPage /> },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
];

const AppRoutes = () => {
  const { authenticated, logout, loading } = useAuth();

  return loading ? null : authenticated ? (
    <>
      <header>
        <button onClick={logout}>LOGOUT</button>
      </header>
      <main>
        <Router routes={authRoutes} />
      </main>
    </>
  ) : (
    <main>
      <Router routes={noAuthRoutes} />
    </main>
  );
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
