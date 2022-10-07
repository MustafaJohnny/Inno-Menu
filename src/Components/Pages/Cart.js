import React from "react";
import Navigation from "../UI-Components/Navigation";
import LangNavigation from "../UI-Components/LangNavigation";
import SideNavigation from "../UI-Components/SideNavigation";
import OrderComponent from "../UI-Components/OrderComponent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { controlActions } from "../Redux/ReduxStore";

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

  const mainStyle = useSelector((state) => state.controlerStyles.pages_style);
  const arrowBack = useSelector((state) => state.controlerStyles.arrow_back);
  const basketImg = useSelector((state) => state.controlerStyles.basket_img);
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

  const backToMainMenu = () => {
    navigate(`/menu/${params.domain}/${params.NumOfTable}/${params.lang}`, {
      replace: true,
    });
  };

  return (
    <React.Fragment>
      {showSideNav && <SideNavigation />}
      {showLangNav && <LangNavigation />}
      <section className={mainStyle.firstSection}>
        <Navigation />
        <div className={mainStyle.theMealsHeading}>
          {arrowState && (
            <img
              onClick={navigateStepBack}
              alt="icon"
              src={arrowBack}
              className={mainStyle.arrowIcon}
            />
          )}
          <span className={mainStyle.foodSecHeading}>ваш заказ</span>
        </div>
      </section>

      {cart_items.length === 0 ? (
        <div className={mainStyle.emptyArea}>
          <img
            src={basketImg}
            className={mainStyle.basketEmptyImg}
            alt="basket"
          />
          <span className={mainStyle.emptyHeading}>ваша корзина пустая!</span>
          <button
            className={`${mainStyle.cartBackBtn} ${mainStyle.addCartBtn}`}
            onClick={backToMainMenu}
            type="button"
          >
            Смотреть меню
          </button>
        </div>
      ) : (
        <section
          className={
            showOrder ? mainStyle.secondSection : mainStyle.secondSection2
          }
        >
          <div
            className={
              showOrder ? mainStyle.itemsContainer : mainStyle.itemsContainer2
            }
          >
            {cart_items.map((ele) => (
              <div key={ele.id} className={mainStyle.wholeItemCart}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(
                    0deg,
                    #00000016 16.31%,
                    rgba(217, 217, 217, 0) 117.2%
                  ), url("${URL}/${ele.image}")`,
                  }}
                  className={mainStyle.cartImgArea}
                ></div>
                <div className={mainStyle.cartInfoArea}>
                  <div className={mainStyle.cartNameSize}>
                    <span className={mainStyle.cartName}>{ele.name}</span>
                    <span className={mainStyle.cartSize}>
                      {ele.modifex[0].datamodifex[0].name}
                    </span>
                  </div>
                  <span className={mainStyle.cartPrice}>
                    {`${ele.price * ele.cartQuantity} ${menuCurrency}`}
                  </span>
                </div>
                <div className={mainStyle.CartButtonsArea}>
                  <button
                    onClick={() => handleDecreaseCart(ele)}
                    className={mainStyle.minusBtn}
                    type="button"
                  >
                    -
                  </button>
                  <span className={mainStyle.itemQTA}>{ele.cartQuantity}</span>
                  <button
                    onClick={() => handleIncreaseCart(ele)}
                    className={mainStyle.plusBtn}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(ele)}
                  className={mainStyle.btnCloseModal}
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
