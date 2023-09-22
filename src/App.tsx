import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { General, Profile, Password } from "./pages/pengaturanProfile/index";
import { useSaveLastPage } from "./hook/useSaveLastPage";
import { useAuthUsers } from "./hook/useAuthUsers";

function App() {
  useAuthUsers();
  const { infoHalaman } = useSaveLastPage();

  return (
    <>
      {!infoHalaman.is_authenticated ? (
        <h1>Loading</h1>
      ) : (
        <Router>
          <div style={{ height: "100rem" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="account"
                element={<PrivateRoutes />}
              >
                <Route index element={<General />} />
                <Route path="password" element={<Password />} />
                <Route path=":section" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;