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
  useEffect(() => {
    dispatch(controlActions.toggleShowLayout(false));
    window.scrollTo(0, 0);
  }, []);

  const arrowState = useSelector((state) => state.controler.remove_arrow);
  const showOrder = useSelector((state) => state.controler.show_order_com);
  const showLangNav = useSelector((state) => state.controler.show_lang_nav);
  const showSideNav = useSelector((state) => state.controler.show_side_nav);
  const serverAPI = useSelector((state) => state.controler.serverAPI);
  ///////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const URL = `http://${serverAPI}:8000/api/v1/client/fileimage/${params.domain}`;
  const selectedItems = useSelector((state) => state.controler.selected_items);
  const cart_items = useSelector((state) => state.controler.cart_items);
  console.log(cart_items);

  const navigateStepBack = () => {
    dispatch(controlActions.toggleShowLayout(true));
    navigate(-1);
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
      <section
        className={showOrder ? classes.secondSection : classes.secondSection2}
      >
        <div
          className={
            showOrder ? classes.itemsContainer : classes.itemsContainer2
          }
        >
          {selectedItems.map((ele) => (
            <div key={ele.id} className={classes.wholeItem}>
              <div
                style={{
                  backgroundImage: `linear-gradient(
                    0deg,
                    #00000016 16.31%,
                    rgba(217, 217, 217, 0) 117.2%
                  ), url("${URL}/${ele.image}")`,
                }}
                className={classes.itemImgArea}
              ></div>
              <div className={classes.itemInfoArea}>
                <div className={classes.itemNameSize}>
                  <span className={classes.itemName}>{ele.name}</span>
                  <span className={classes.itemSize}>
                    {ele.modifex[0].datamodifex[0].name}
                  </span>
                  <span className={classes.itemDescription}>
                    {ele.description}
                  </span>
                </div>
                <span className={classes.itemPrice}>{ele.price} RUB</span>
              </div>
              <div className={classes.itemAddArea}>
                <button className={classes.minusBtn} type="button">
                  -
                </button>
                <span className={classes.itemQTA}>1</span>
                <button className={classes.plusBtn} type="button">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <OrderComponent />
      </section>
    </React.Fragment>
  );
};

export default Cart;
