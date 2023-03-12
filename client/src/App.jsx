import { EthProvider } from "./contexts/EthContext";

import Footer from "./components/Footer";
import Proposal from "./components/Vote/Proposal";
import RegisterVote from "./components/Vote/RegisterVote";
import Voting from "./components/Vote/Voting";
import TallyVote from "./components/Vote/TallyVote";
import Home from "./components/Vote/Home";
import NavBar from "../src/components/Layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/proposal",
      element: <Proposal />,
    },
    {
      path: "/register-vote",
      element: <RegisterVote />,
    },
    {
      path: "/voting",
      element: <Voting />,
    },
    {
      path: "/tally-vote",
      element: <TallyVote />,
    },
  ]);

  return (
    <EthProvider>
      <NavBar />
      <RouterProvider router={router} />;
    </EthProvider>
  );
}

export default App;
