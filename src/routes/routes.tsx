import HomePage from "../pages/HomePage";

interface routesType {
  index?: boolean;
  path?: string;
  element: JSX.Element;
}

export const routes: routesType[] = [
  {
    index: true,
    element: <HomePage />,
  },
];
