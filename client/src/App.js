import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation/Index";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navigation />
    </>
  );
}

export default App;
