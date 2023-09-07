import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div style={{ height: "100rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;