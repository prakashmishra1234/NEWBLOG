import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation/Index";
import toast, { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
