import { EthProvider } from "./contexts/EthContext";

import Footer from "./components/Footer";
import Proposal from "./components/Vote/Proposal";
import RegisterVote from "./components/Vote/RegisterVote";
import Voting from "./components/Vote/Voting";
import TallyVote from "./components/Vote/TallyVote";
import Home from "./components/Vote/Home";
import NavBar from "../src/components/Layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <EthProvider>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proposal" element={<Proposal />} />
            <Route path="/registerVote" element={<RegisterVote />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/tallyVote" element={<TallyVote />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </EthProvider>
  );
}

export default App;
