import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { General, Profile, Password } from "./pages/pengaturanProfile/index";

function App() {
  return (
    <>
      <div style={{ height: "100rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="account" element={<PrivateRoutes />}>
            <Route index element={<General />} />
            <Route path="password" element={<Password />} />
            <Route path=":section" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;