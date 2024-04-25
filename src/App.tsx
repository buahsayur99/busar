import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { General, Profile, Password, Address } from "./pages/pengaturanProfile/index";
import { useSaveLastPage } from "./hook/useSaveLastPage";
import { useAuthUsers } from "./hook/useAuthUsers";
import { NotFound } from "./pages/NotFound";
import { useAppSelector } from "./app/hooks";
import { DashboardAdmin } from "./pages/dashboard/DashboardAdmin";
import { ProductAdmin } from "./pages/dashboard/ProductAdmin";
import { UsersAdmin } from "./pages/dashboard/UsersAdmin";
import React, { useEffect, useState } from "react";
import { CollectProduct } from "./pages/collections/CollectProduct";
import { BasketComponent } from "./features/basket/BasketComponent";
import { Carts } from "./pages/cart/Carts";
import { useGetApiCart, useGetProduct } from "./hook";
import { AlertCart } from "./pages/cart/components/AlertCart";
import { Shipment } from "./pages/cart/Shipment";
import { DetailTransaction } from "./pages/payment/DetailTransaction";
import { AllPurchase } from "./pages/purchase/AllPurchase";
import { PendingPurchase } from "./pages/purchase/PendingPurchase";
import { PackagedPurchase } from "./pages/purchase/PackagedPurchase";
import { CancelledPurchase } from "./pages/purchase/CancelledPurchase";
import { SendPurchase } from "./pages/purchase/SendPurchase";
import { SuccessPurchase } from "./pages/purchase/SuccessPurchase";
import { useSocketCart } from "./hookSockets/useSocketCart";

function App() {
  // State
  const [activeAlert, setActiveAlert] = useState({ alertCart: { status: false, text: "" } });
  // useAppSelector
  const { isLoadingAuth, dataLoginUsers } = useAppSelector(state => state.apiUsers);
  const { dataProductApi } = useAppSelector(state => state.apiProduct)
  const { activeCart, isMessageCart } = useAppSelector(state => state.apiCart);
  // Custome Hook
  const { requestUserApi } = useAuthUsers();
  const { handleGetProduct } = useGetProduct();
  const { handleGetCart } = useGetApiCart();
  useSaveLastPage();
  // Socket
  useSocketCart();

  // Update function activeAlert
  const updateActiveAlert = (event: any) => {
    setActiveAlert((prev) => {
      return { ...prev, ...event }
    })
  }

  useEffect(() => {
    requestUserApi();
    if (dataProductApi.length === 0) return handleGetProduct();
  }, [dataProductApi.length, handleGetProduct, requestUserApi])

  // Get Cart if update cart and add cart success
  useEffect(() => {
    // if (isMessageCart === "success add cart") {
    //   updateActiveAlert({ alertCart: { status: true, text: "the product successfully inserted into the shopping cart" } })
    //   return handleGetCart()
    // }
    if (isMessageCart === "delete cart success") {
      updateActiveAlert({ alertCart: { status: true, text: "product telah di hapus" } })
      return handleGetCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMessageCart, dataLoginUsers])

  return (
    <>
      {isLoadingAuth === false && (
        <Router>
          <div>
            {/* Alert Cart */}
            {activeAlert.alertCart.status === true && (
              <AlertCart activeAlert={activeAlert.alertCart} faVisibleAlert={() => updateActiveAlert({ alertCart: { status: false, text: "" } })} />
            )}

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
              <Route path="collections/sayur-buah/products/:nameProduct" element={<CollectProduct />} />

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