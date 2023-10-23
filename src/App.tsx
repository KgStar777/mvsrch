import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { Start } from "./components/Start";
import { Film } from "./components/Film";

import "./index.css";
import "./App.css";

const router = createBrowserRouter([
    {
    path: "*",
    element: <>NotFound 404</>
  },
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/film/:id",
    element: <Film />,
  }
]);

function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={(
        <ThreeDots
          height="80" 
          width="80" 
          radius="9"
          color="rgba(78,167,249,1)"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      )} />
  )
}

export default App;
