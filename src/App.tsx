import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { General, Profile, Password, Address } from "./pages/pengaturanProfile/index";
import { DashboardAdmin, ProductAdmin, UsersAdmin } from "./pages/dashboard/index";
import { useSocketPayment, useSocketCart, useSocketWishlist } from "./hookSockets/index";
import { useGetProduct, useSaveLastPage, useAuthUsers, } from "./hook/index";
import { AllPurchase, PendingPurchase, PackagedPurchase, CancelledPurchase, SendPurchase, SuccessPurchase } from "./pages/purchase/index";
import { CollectProduct, Products } from "./pages/collections/index";
import { BasketComponent } from "./features/basket/index";
import { Carts, Shipment, AlertCart } from "./pages/cart/index";
import { DetailTransaction } from "./pages/payment/index";
import { Home } from "./pages/home/Home";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { NotFound } from "./pages/NotFound";
import { useAppSelector } from "./app/hooks";
import { Wishlist } from "./pages/wishlist/index";

function App() {
  // useAppSelector
  const { isLoadingAuth, dataLoginUsers } = useAppSelector(state => state.apiUsers);
  const { dataProductApi } = useAppSelector(state => state.apiProduct)
  const { activeCart } = useAppSelector(state => state.apiCart);
  // Custome Hook
  const { requestUserApi } = useAuthUsers();
  const { handleGetProduct } = useGetProduct();
  useSaveLastPage();
  // Socket
  useSocketCart();
  useSocketPayment();
  useSocketWishlist();

  useEffect(() => {
    requestUserApi();
    if (dataProductApi.length === 0) return handleGetProduct();
  }, [dataProductApi.length, handleGetProduct, requestUserApi])

  return (
    <>
      {isLoadingAuth === false && (
        <Router>
          <div>
            {/* Alert Cart */}
            <AlertCart />

            {activeCart && (<BasketComponent />)}

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

              {/* Cart */}
              <Route
                path="cart"
                element={<PrivateRoutes data={dataLoginUsers} />}
              >
                <Route index element={<Carts />} />
                <Route path="shipment" element={<Shipment />} />
              </Route>

              {/* Dashboard Admin */}
              <Route
                path="dashboard"
                element={<PrivateRoutes data={dataLoginUsers?.role === "admin"} />}
              >
                <Route index element={<DashboardAdmin />} />
                <Route path="product" element={<ProductAdmin />} />
                <Route path="user" element={<UsersAdmin />} />
              </Route>

              {/* Collections */}
              <Route path="collections">
                <Route index element={<Products />} />
                <Route path="category/*" element={<Products />} />
                <Route path="sayur-buah/products/:nameProduct" element={<CollectProduct />} />
              </Route>

              {/* Status Order */}
              <Route
                path="order-status/busar/:id"
                element={<PrivateRoutes data={dataLoginUsers} />}
              >
                <Route index element={<DetailTransaction />} />
              </Route>

              {/* Purchase */}
              <Route
                path="user/purchase"
                element={<PrivateRoutes data={dataLoginUsers} />}
              >
                <Route index element={<AllPurchase />} />
                <Route path="pedding" element={<PendingPurchase />} />
                <Route path="packaged" element={<PackagedPurchase />} />
                <Route path="send" element={<SendPurchase />} />
                <Route path="finished" element={<SuccessPurchase />} />
                <Route path="cancelled" element={<CancelledPurchase />} />
              </Route>

              {/* Wishlist */}
              <Route path="wishlist" element={<Wishlist />} />

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