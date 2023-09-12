import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Account } from "./pages/Account";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <>
      <div style={{ height: "100rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="account">
            <Route index element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;