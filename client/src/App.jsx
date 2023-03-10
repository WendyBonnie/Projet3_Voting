import { EthProvider } from "./contexts/EthContext";
import RegisterVote from "./components/Vote/RegisterVote";
import Footer from "./components/Footer";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div>
          <h1>My new voting Dapp</h1>
          <RegisterVote />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
