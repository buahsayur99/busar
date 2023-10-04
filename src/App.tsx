import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { General, Profile, Password, Address } from "./pages/pengaturanProfile/index";
import { useSaveLastPage } from "./hook/useSaveLastPage";
import { useAuthUsers } from "./hook/useAuthUsers";
import { NotFound } from "./pages/NotFound";

function App() {
  useAuthUsers();
  const { infoHalaman } = useSaveLastPage();

  return (
    <>
      {infoHalaman.is_authenticated && (
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="account"
                element={<PrivateRoutes />}
              >
                <Route index element={<General />} />
                <Route path="password" element={<Password />} />
                <Route path="profile" element={<Profile />} />
                <Route path="address" element={<Address />} />
              </Route>

              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;