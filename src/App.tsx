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
import { DashboardAdmin } from "./pages/dashboard/DashboardAdmin";
import { ProductAdmin } from "./pages/dashboard/ProductAdmin";
import { UsersAdmin } from "./pages/dashboard/UsersAdmin";

function App() {
  const { isLoadingAuth } = useAppSelector(state => state.apiUsers);
  const { dataLoginUsers } = useAppSelector(state => state.apiUsers);
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
                element={<PrivateRoutes data={dataLoginUsers} />}
              >
                <Route index element={<General />} />
                <Route path="password" element={<Password />} />
                <Route path="profile" element={<Profile />} />
                <Route path="address" element={<Address />} />
              </Route>
              {/* Dashboard */}
              <Route
                path="dashboard"
                element={<PrivateRoutes data={dataLoginUsers?.role === "admin"} />}
              >
                <Route index element={<DashboardAdmin />} />
                <Route path="product" element={<ProductAdmin />} />
                <Route path="user" element={<UsersAdmin />} />
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