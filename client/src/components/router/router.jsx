import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Proposal from "../Vote/Proposal";
import RegisterVote from "../Vote/RegisterVote";
import Voting from "../Vote/Voting";
import TallyVote from "../Vote/TallyVote"



function Router() {

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
    <Router>
  
    </Router>
  );
}

export default Router;
