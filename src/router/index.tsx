import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import {Product, SignIn, SignUp, SinglePage} from "@pages"
import MainLayout from "@layout"


export default function Router() {
  const root = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
          <Route index element={<SignIn/>}/>
          {/* <Route path="/signup" element={<SignUp/>}/> */}
          {/* <Route path="/main/*" element={<MainLayout/>}> */}
            {/* <Route path="product" element={<Product/>}/> */}
            {/* <Route path="product/:id" element={<SinglePage/>}/> */}
          {/* </Route> */}
      </Route>
    )
  );

  return <RouterProvider router={root} />;
}
