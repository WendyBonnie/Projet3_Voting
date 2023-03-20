import Footer from "../Footer";

import Voting from "../Vote/Voting";
import TallyVote from "../Vote/TallyVote";
import Home from "../Vote/Home";
import Admin from "../Vote/Admin";
import NavBar from "../Layout/Navbar";
import utils from "../utils/utils";
import useEth from "../../contexts/EthContext/useEth";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

function Navigation() {
  const [voter, setVoter] = useState();
  const [status, setStatus] = useState(0);
  const [owner, setOwner] = useState(0);
  const {
    state: { contract, accounts },
  } = useEth();

  function getStatus() {
    utils.getStatus(contract, accounts).then((result, err) => {
      if (err) {
        console.log(err);
      } else {
        setStatus(result);
      }
    });
  }
  function getOwner() {
    utils.getOwner(contract, accounts).then((result, err) => {
      if (err) {
        console.log(err);
      } else {
        setOwner(result);
      }
    });
  }

  useEffect(() => {
    // getVoter();
    getStatus();
    getOwner();
  }, [accounts, status]);

  useEffect(() => { console.log("sss", status); }, [status])



  return (
    <Router>
      <NavBar owner={owner} accounts={accounts} status={status} />
      <div>
        <Routes>
          <Route path="/" exact element={<Home getStatus={getStatus} />} />
          <Route path="/admin" element={<Admin getStatus={getStatus} />} />
          <Route path="/voting" element={<Voting getStatus={getStatus} />} />
          <Route path="/tallyVote" element={<TallyVote getStatus={getStatus} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default Navigation;
