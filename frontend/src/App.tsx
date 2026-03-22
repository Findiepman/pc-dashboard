import "./App.css";
import { Overview } from "./pages/overview";
import { Services } from "./pages/services";
import { Logs } from "./pages/logs";

function App() {
  return (
    <div className="app">
      <Overview />
      <Services />
      <Logs />
    </div>
  );
}

export default App;