import React from "react";
import classes from "./HomePage.module.css";
import LangNavigation from "../UI-Components/LangNavigation";
import SideNavigation from "../UI-Components/SideNavigation";
import OrderComponent from "../UI-Components/OrderComponent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";
import Navigation from "../UI-Components/Navigation";
import ArrowL from "../Icons/ArrowL.svg";

const Cart = () => {
  const cart_items = useSelector((state) => state.controler.cart_items);

  useEffect(() => {
    dispatch(controlActions.toggleShowLayout(false));
    dispatch(controlActions.getTotal());
  }, [cart_items]);

  // Only when the page first render.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const arrowState = useSelector((state) => state.controler.remove_arrow);
  const showOrder = useSelector((state) => state.controler.show_order_com);
  const showLangNav = useSelector((state) => state.controler.show_lang_nav);
  const menuCurrency = useSelector((state) => state.controler.menu_currency);
  const showSideNav = useSelector((state) => state.controler.show_side_nav);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  ///////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const URL = `http://${serverAPI}:8000/api/v1/client/fileimage/${params.domain}`;

  const navigateStepBack = () => {
    dispatch(controlActions.toggleShowLayout(true));
    navigate(-1);
  };

  const handleRemoveFromCart = (mealItem) => {
    dispatch(controlActions.removeFromCart(mealItem));
  };

  const handleDecreaseCart = (mealItem) => {
    dispatch(controlActions.decreaseMealQuantity(mealItem));
  };

  const handleIncreaseCart = (mealItem) => {
    dispatch(controlActions.addToCart(mealItem));
  };

  return (
    <React.Fragment>
      {showSideNav && <SideNavigation />}
      {showLangNav && <LangNavigation />}
      <section className={classes.firstSection}>
        <Navigation />
        <div className={classes.theMealsHeading}>
          {arrowState && (
            <img
              onClick={navigateStepBack}
              alt="icon"
              src={ArrowL}
              className={classes.arrowIcon}
            />
          )}
          <span className={classes.foodSecHeading}>ваш заказ</span>
        </div>
      </section>

      {cart_items.length === 0 ? (
        <div className={classes.emptyArea}>
          <span className={classes.emptyHeading}>ваша корзина пустая!</span>
        </div>
      ) : (
        <section
          className={showOrder ? classes.secondSection : classes.secondSection2}
        >
          <div
            className={
              showOrder ? classes.itemsContainer : classes.itemsContainer2
            }
          >
            {cart_items.map((ele) => (
              <div key={ele.id} className={classes.wholeItemCart}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(
                    0deg,
                    #00000016 16.31%,
                    rgba(217, 217, 217, 0) 117.2%
                  ), url("${URL}/${ele.image}")`,
                  }}
                  className={classes.cartImgArea}
                ></div>
                <div className={classes.cartInfoArea}>
                  <div className={classes.cartNameSize}>
                    <span className={classes.cartName}>{ele.name}</span>
                    <span className={classes.cartSize}>
                      {ele.modifex[0].datamodifex[0].name}
                    </span>
                  </div>
                  <span className={classes.cartPrice}>
                    {`${ele.price * ele.cartQuantity} ${menuCurrency}`}
                  </span>
                </div>
                <div className={classes.itemAddArea}>
                  <button
                    onClick={() => handleDecreaseCart(ele)}
                    className={classes.minusBtn}
                    type="button"
                  >
                    -
                  </button>
                  <span className={classes.itemQTA}>{ele.cartQuantity}</span>
                  <button
                    onClick={() => handleIncreaseCart(ele)}
                    className={classes.plusBtn}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(ele)}
                  className={classes.btnCloseModal}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <OrderComponent />
        </section>
      )}
    </React.Fragment>
  );
};

export default Cart;
