import { RouteObject, useRoutes } from "react-router-dom";

export const Router = ({ routes }: { routes: RouteObject[] }) => {
  return useRoutes(routes);
};
