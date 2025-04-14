import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Delivery from "./components/Delivery";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deliveries" element={<Delivery />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
