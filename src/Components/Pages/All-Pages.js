import React from "react";
import LoadingSpinner from "../UI-Components/LoadingSpinner";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { controlActions } from "../Redux/ReduxStore";
import { useEffect } from "react";
import BellComponent from "../UI-Components/BellComponent";
import classes from "./All-Pages.module.css";

const Clock_modal = React.lazy(() => import("../PopUp-Components/ClockModal"));

const Categories_page = React.lazy(() => import("./CategoriesPage"));

const Items_page = React.lazy(() => import("./ItemsPage"));

const Home_page = React.lazy(() => import("./HomePage"));

const Cart_page = React.lazy(() => import("./Cart"));

const Waiter_modal = React.lazy(() =>
  import("../PopUp-Components/WaiterModal")
);

const All_Pages = () => {
  const dispatch = useDispatch();

  const clearLocalStorge = () => {
    window.localStorage.clear();
    window.localStorage.removeItem("persist:root");
    dispatch(controlActions.setInitialSlide(0));
    dispatch(controlActions.getServiceItems([]));
    dispatch(controlActions.hideNavLang());
  };

  useEffect(() => {
    clearLocalStorge();
  }, []);

  document.getElementsByTagName("META")[3].content = "";

  const screenWidth = window.screen.width;

  const screenMSG =
    screenWidth < 900
      ? "Пожалуйста, поверните ваш телефон"
      : "Пожалуйста воспользуйтесь мобильным устройством";

  const showWaiter = useSelector((state) => state.controler.show_waiter);
  const waiterSoon = useSelector((state) => state.controler.waiter_soon);
  const showBell = useSelector((state) => state.controler.show_bell);

  return (
    <React.Fragment>
      <div className={classes.areaMsg}>
        <h1 className={classes.breakpointMsg}>{screenMSG}</h1>
      </div>
      <div className={classes.mainContainer}>
        <Suspense fallback={<LoadingSpinner />}>
          {showWaiter && <Waiter_modal />}
          {waiterSoon && <Clock_modal />}
          {showBell && <BellComponent />}
          <Routes>
            <Route
              path="/menu/:domain/:NumOfTable/:lang"
              element={<Home_page />}
            />

            <Route
              path="/menu/:domain/:NumOfTable/:lang/categories"
              element={<Categories_page />}
            />

            <Route
              path="/menu/:domain/:NumOfTable/:lang/items"
              element={<Items_page />}
            />

            <Route
              path="/menu/:domain/:NumOfTable/:lang/cart"
              element={<Cart_page />}
            />
          </Routes>
        </Suspense>
      </div>
    </React.Fragment>
  );
};

export default All_Pages;
