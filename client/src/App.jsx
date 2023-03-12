import { EthProvider } from "./contexts/EthContext";


import Router from "./components/Layout/Router";
import "bootstrap/dist/css/bootstrap.min.css";



function App() {

  return (
    <EthProvider>
      <Router/>
    </EthProvider>
  );
}

export default App;
