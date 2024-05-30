import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp, SinglePage, WhishList } from "@pages";
import MainLayout from "@layout";

export default function Router() {
  const root = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainLayout />} />
        <Route path="/:id" element={<SinglePage />} />
        <Route path="/wishlist" element={<WhishList />} />
      </Route>
    )
  );

  return <RouterProvider router={root} />;
}
