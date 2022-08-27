import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation/Index";
function App() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
