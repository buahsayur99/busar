import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { General, Profile, Password, Address } from "./pages/pengaturanProfile/index";
import { useSaveLastPage } from "./hook/useSaveLastPage";
import { useAuthUsers } from "./hook/useAuthUsers";
import { NotFound } from "./pages/NotFound";
import { useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { DashboardAdmin } from "./features/navbar/DashboardAdmin";

function App() {
  const { isLoadingAuth } = useAppSelector(state => state.apiUsers);
  // Custome Hook
  const { requestUserApi } = useAuthUsers();
  useSaveLastPage();

  useEffect(() => {
    requestUserApi();
  }, [requestUserApi])

  return (
    <>
      {isLoadingAuth === false && (
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Account */}
              <Route
                path="account"
                element={<PrivateRoutes />}
              >
                <Route index element={<General />} />
                <Route path="password" element={<Password />} />
                <Route path="profile" element={<Profile />} />
                <Route path="address" element={<Address />} />
              </Route>
              {/* Dashboard */}
              <Route
                path="dashboard"
                element={<PrivateRoutes />}
              >
                <Route index element={<DashboardAdmin />} />
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